import DeliveryAssignment from "../models/deliveryAssignment.js";
import Order from "../models/orderSchema.js";
import Shop from "../models/shopModel.js";
import User from "../models/userModel.js";

export const placeOrder = async(req, res) => {
    try {
        const {cartItems, paymentMethod, deliveryAddress, totalAmount} = req.body;
        if(cartItems.length === 0 || !cartItems) {
            return res.status(400).json({message: "Cart is empty"});
        } 
         if(!deliveryAddress.text ||!deliveryAddress.latitude || !deliveryAddress.longitude) {
            return res.status(400).json({message: "Send complete address"});
        } 
        const groupItemsByShop = {};
        
        cartItems.forEach(item => {
            const shopId = item.shop;
            if(!shopId){
                return res.status(400).json({message: "Shop ID is missing for item: " + item.name});                
            }
            if(!groupItemsByShop[shopId]) {
                groupItemsByShop[shopId] = [];
            }
            groupItemsByShop[shopId].push(item)
            
        });

        const shopOrder = await Promise.all(Object.keys(groupItemsByShop).map( async(shopId) => {
            const shop = await Shop.findById(shopId).populate("owner");
            const items = groupItemsByShop[shopId]
            const subTotal = items.reduce((sum, i) => sum + Number(i.price)*Number(i.quantity) ,0);
            return{
                shop,
                owner: shop.owner._id,
                subTotal,
                shopOrderItems: items.map((item) => ({
                    item: item.id,
                    quantity: item.quantity,
                    subTotal,
                    name: item.name,
                }))
            }
        }));
        const newOrder = await Order.create({
            user: req.userId,
            paymentMethod,
            deliveryAddress:{
                text: deliveryAddress.text,
                longitude: deliveryAddress.longitude,
                latitude: deliveryAddress.latitude
            },
            totalAmount,
            shopOrders: shopOrder
        });
        await newOrder.populate("shopOrders.shopOrderItems.item", "name price image.url");
        return res.status(201).json({message: "Order Placed", newOrder});
    } catch (error) {
        return res.status(500).json({message: "Error in Place Order Controller", error});        
    }
}

export const getMyOrders = async(req, res) => {
    try {
        const user = await User.findById(req.userId);
        if(user){
        if(user.role == "user") {
            const orders = await Order.find({user: req.userId})
            .sort({createdAt: -1})
            .populate("shopOrders.shop", "name")
            .populate("shopOrders.shopOrderItems.item")
            return res.status(200).json(orders);
        } else if(user.role == "owner") {
            const orders = await Order.find({"shopOrders.owner": req.userId})
            .sort({createdAt: -1})
            .populate("user", "username email mobile")
            .populate("shopOrders.shopOrderItems.item")
            .populate("shopOrders")

            const filteredOrders = orders.map((order) => {
                const filteredShopOrders = order.shopOrders.filter((shopOrder) => shopOrder.owner.toString() === req.userId);
                return {
                    ...order.toObject(),
                    shopOrders: filteredShopOrders
                }
            })
            
            return res.status(200).json(filteredOrders);
            
        }}
        return res.status(400).json({message: "User not found"}); 
        } catch(error) {
            console.log("Error in Get Order Controller", error);
        return res.status(500).json({message: "Error in Get Order Controller", error});        
    }
}

export const updateOrderStatus = async(req, res) => {
    try {
        const {orderId, shopId} = req.params;
        const {status} = req.body;
        let order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        const lng = Number(order?.deliveryAddress?.longitude);
        const lat = Number(order?.deliveryAddress?.latitude);

        let newShopOrder = order.shopOrders.find((so) => (so.shop?._id || so.shop).toString() === shopId.toString())
        console.log(newShopOrder)

        if(!newShopOrder) {
            console.log("Shop Order not found for shopId:", shopId);
            return res.status(400).json({message: "Status not updated by user"})
        }
        newShopOrder.status = status;
        await order.save();
        let deliveryBoyPayload = [];
        // Find available delivery boys
        if(status == "preparing" || status == "pending") {
            return res.status(200).json({message: "Order status updated"});
        }

        
        if(status == "out of delivery" || !newShopOrder.assignment) {
            const nearByDeliveryBoys = await User.find({
                role: "deliveryBoy",
                location: {
                    $near: {
                    $geometry: {
                     type: 'Point',
                     coordinates: [lng, lat]
                    },
                    $maxDistance: 5000
                    }
                }
            })
            if(!nearByDeliveryBoys || nearByDeliveryBoys.length === 0) {
                await order.save();
                return res.json({message: "Order status updated but no delivery boys available"});
            }
            // --------------------------------------

            const nearByIds = nearByDeliveryBoys.map(b => b._id);
            const busyIds = await DeliveryAssignment.find({
                assignedTo: {$in: nearByIds},
                status: {$nin: ["broadcasted", "delivered"]},
            }).distinct("assignedTo");

            const busyIdSet = new Set(busyIds.map(id => String(id)));
            const availableDeliveryBoys = nearByDeliveryBoys.filter(b => !busyIdSet.has(String(b._id)));
           
            // --------------------------------------

            const deliveryAssignment = await DeliveryAssignment.create({
                order: order._id,
                shop: shopId,
                shopOrderId: newShopOrder._id,
                broadcastTo: availableDeliveryBoys.map(b => b._id),
                status: "broadcasted"
            });

            newShopOrder.assignment = deliveryAssignment._id;
            newShopOrder.assignedDeliveryBoy = deliveryAssignment.assignedTo;

            deliveryBoyPayload = availableDeliveryBoys.map(b => ({
                id: b._id,
                name: b.username,
                email: b.email,
                longitude: b.location.coordinates[0],
                latitude: b.location.coordinates[1],
                mobile: b.mobile
            }))
        }
        await order.save();
        const updatedShopOrder = order.shopOrders.find((so) => (so.shop?._id || so.shop).toString() === shopId.toString())
        
        await order.populate("shopOrders.shop", "name");
        await order.populate("shopOrders.assignedDeliveryBoy", "username email mobile");


        return res.status(200).json({
            shopOrder: updatedShopOrder,
            assignedDeliveryBoy: updatedShopOrder?.assignedDeliveryBoy || null,
            assignment: updatedShopOrder?.assignment._id || null,
            availableDeliveryBoys: deliveryBoyPayload
        });

    } catch (error) {
        return res.status(500).json({message: "something wrong in updateOrderStatus controller", error});
    }
}

export const getDeliveryBoyAssignments = async(req, res) => {
    try {
        let deliveryBoyId = req.userId;
        const assignments = await DeliveryAssignment.find({
            broadcastTo: deliveryBoyId,
            status: "broadcasted"
        })
        .populate("order").populate("shop");

        const formatted = assignments.map((a) => ({
            assignmentId: a._id,
            orderId: a.order._id,
            shopName: a.shop.name,
            deliveryAddress: a.order.deliveryAddress,
            items: a.order.shopOrders.find(so => so._id.equals(a.shopOrderId)).
            shopOrderItems || [],
            subTotal: a.order.shopOrders.find(so => so._id.equals(a.shopOrderId))?.subTotal,     
        }));

        return res.status(200).json(formatted);
        
    } catch (error) {
        return res.status(500).json({message: "Error in export getDeliveryBoyAssignment controller", error})
    }
}

export const acceptOrder = async(req, res) => {
    try {
        const {assignmentId} = req.params;
        const assignment = await DeliveryAssignment.findById(assignmentId);
        if(!assignment) {
            return res.status(404).json({message: "Assignment not found"});
        }
        if(assignment.status !== "broadcasted") {
            return res.status(404).json({message: "Assignment is expired"});
        }
        let isAssigned = await DeliveryAssignment.findOne({
            assignedTo: req.userId,
            status: {$nin: ["broadcasted", "delivered"]}
        })
        if(isAssigned) {
            return res.status(404).json({message: "Can't accept another order while delivering one"});
        }

        assignment.assignedTo = req.userId;
        assignment.status = "assigned";
        assignment.acceptedAt = new Date();

        const order = await Order.findById(assignment.order);
        const shopOrder = order.shopOrders.find( (so) => so._id.toString() === assignment.shopOrderId?.toString());
        if(!shopOrder) {
            return res.status(404).json({message: "Order not found"});
        }

        shopOrder.assignedDeliveryBoy = req.userId;
        await assignment.save();
        await order.save();

        res.status(200).json({message: "Order accepted successfully"});

    } catch(error) {
        console.log(error)
        return res.status(500).json({message: "Error in acceptOrder controller", error})
    }
}

export const getCurrentOrder = async(req, res) => {
    try{
        const assignment = await DeliveryAssignment.findOne({
            assignedTo: req.userId,
            status: "assigned"
        })
        .populate("order").populate("shop", "name").populate("assignedTo", "username email mobile location")
        .populate({
            path: "order",
            populate: {path: "user"}
        })

        if(!assignment) {
            return res.status(404).json({message: "Assignment not found"});
        }

        if(!assignment.order) {
            return res.status(404).json({message: "Order not found"});
        }

        let shopOrder = assignment.order.shopOrders.find( (so) => String(so._id) === String(assignment.shopOrderId));

        if(!shopOrder) {
            return res.status(404).json({message: "Shop Order not found"});
        }

       
            let deliveryBoyLocation = {lat: null, lon: null};
            if(assignment.assignedTo.location.coordinates.length == 2) {
                deliveryBoyLocation.lat = assignment.assignedTo.location?.coordinates[1]
                deliveryBoyLocation.lon = assignment.assignedTo.location?.coordinates[0]
            }
        
            let customerLocation = {lat: null, lon: null};
           if(assignment.order?.deliveryAddress) {
                customerLocation.lat = assignment.order.deliveryAddress.latitude;
                customerLocation.lon = assignment.order.deliveryAddress.longitude;
           }
      
        
        return res.status(200).json({
            _id: assignment._id,
            shopOrder,
            deliveryBoyLocation,
            customerLocation,
            deliveryAddress: assignment.order.deliveryAddress,
            user: assignment.order.user,
            shopName: assignment.shop.name
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Error in getCurrentOrder controller", error});
    }
}