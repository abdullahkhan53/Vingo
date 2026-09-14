import dotenv from "dotenv"
dotenv.config();

import DeliveryAssignment from "../models/deliveryAssignment.js";
import Order from "../models/orderSchema.js";
import Shop from "../models/shopModel.js";
import User from "../models/userModel.js";
import crypto from "crypto";
import { sendDeliveryOtpMail } from "../utils/mail.js";
import Safepay from '@sfpy/node-core'
import axios from "axios";

const safepay = new Safepay(process.env.SAFEPAY_API_SECRET, {
  authType: 'secret',
  host: 'https://sandbox.api.getsafepay.com'
});

// console.log(safepay)
// console.log(safepay.checkout.createCheckoutUrl.toString());

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
                shopOrders: shopOrder,
                payment: false,
                safepayOrderId: ""
            });

       if (paymentMethod === "online") {
        
        const sessionRes = await safepay.payments.session.setup({
        merchant_api_key: process.env.SAFEPAY_API_KEY, // your sec_... 
        intent: "CYBERSOURCE",
        mode: "payment",
        entry_mode: "raw",
        currency: "PKR",
        amount: Number(totalAmount) * 100,
        metadata: { order_id: newOrder._id.toString() }
        });

        const trackerToken = sessionRes.data.tracker.token;

          // Step 2: create auth token
        const authRes = await safepay.client.passport.create();
        const authToken = authRes.data;

        newOrder.safepayOrderId = trackerToken;
        await newOrder.save();

         // Step 3: generate checkout URL
        const checkoutUrl = safepay.checkout.createCheckoutUrl({
            tracker: trackerToken,
            tbt: authToken,
            env: "sandbox",
            source: "hosted",
            redirect_url: `http://localhost:5173/order-placed`,
            cancel_url: "http://localhost:5173/"
        });
        

       

        return res.status(201).json({
            success: true,
            isOnline: true,
            checkoutUrl,
            orderId: newOrder._id,
            tracker: trackerToken
        });

        }

        await newOrder.populate("shopOrders.shopOrderItems.item", "name price image.url");
        await newOrder.populate("shopOrders.shop", "name");
        await newOrder.populate("shopOrders.owner", "username socketId");
        await newOrder.populate("user", "username email mobile");

        // SOCKET NOTIFICATION TO SHOP OWNERS
        const io = req.app.get("io");
        if(io) {
            newOrder.shopOrders.forEach( shopOrderr => {
                const ownerSocketId = shopOrderr.owner.socketId;
                console.log("OWNER SOCKET ID: ", ownerSocketId)
                if(ownerSocketId) {
                    io.to(ownerSocketId).emit('newOrder', {
                    ...newOrder.toObject(),
                    shopOrders: shopOrderr,
                    payment: newOrder.payment
                })
                }
            })
        }
        // END SOCKET NOTIFICATION TO SHOP OWNERS

        return res.status(201).json({message: "Order Placed", newOrder});

    } catch (error) {
        return res.status(500).json({message: "Error in Place Order Controller",
             "error": error.message, stack: error.stack,
             "error response": error.response ? error.response.data : null,
             "error status":error.response ? error.response.status : null});        
    }
}

export const verifyPayment = async (req, res) => {
    try {
        const { tracker } = req.body;

        const response = await axios.get(
            `https://sandbox.api.getsafepay.com/reporter/api/v1/payments/${tracker}`,
             {
                headers: {
                    "X-SFPY-MERCHANT-SECRET": process.env.SAFEPAY_API_SECRET
                }
            }
        );

        const state = response.data?.data?.state;

        if (!state) {
            return res.status(400).json({ success: false, message: "Could not fetch payment status" });
        }

        // const state = response.data.tracker.state;

        if (state !== "TRACKER_ENDED") {
            return res.status(400).json({ success: false, message: "Payment not completed" });
        }
            
        const order = await Order.findOneAndUpdate(
            {safepayOrderId: tracker},
            {payment: true},
            {new: true}
        )
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found for this tracker" });
        }
        console.log("Order Verified")
        return res.status(200).json({ success: true, message: "Payment Verified Successfully" });
            
    } catch (error) {
        return res.status(500).json({ message: "Verification Error", error: error.message });
    }
};

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
                    shopOrders: filteredShopOrders,
                    payment: order.payment
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
            _id: assignment.order._id,
            shopOrder,
            deliveryBoyLocation,
            customerLocation,
            deliveryAddress: assignment.order.deliveryAddress,
            user: assignment.order.user,
            shopName: assignment.shop.name,
        });

    } catch(error) {
        console.log(error);
        return res.status(500).json({message: "Error in getCurrentOrder controller", error});
    }
}

export const getOrderById = async(req, res) => {
    try {
        const {orderId} = req.params;
        const order = await Order.findById(orderId)
        .populate([
            {
            path: "shopOrders.assignedDeliveryBoy",
            model: "User"
            },
            {
            path: "shopOrders.shopOrderItems.item",
            model: "Item"
            },
            {
            path: "shopOrders.shop",
            model: "Shop"
            }
        ]).lean()
        if(!order) {
            return res.status(404).json({message: "Order not found"});
        }
        return res.status(200).json(order)

    } catch (error) {
        return res.status(500).json({message: "Error in getOrderById controller", error});
    }
}

export const sendDeliveryOtp = async(req, res) => {
    try {
        const {orderId, shopOrderId} = req.body;
        const order = await Order.findById(orderId).populate("user");
        if(!order) {
            return res.status(404).json({message: "Unable to find Order"})
        }
        let shopOrder = order.shopOrders.id(shopOrderId)
        if(!shopOrder) {
            return res.status(404).json({message: "Unable to find Shop Order"})
        }
        

        const otp = crypto.randomInt(100000, 1000000);
        shopOrder.deliveryOtp = otp;
        shopOrder.otpExpires = Date.now() + 5 * 60 * 1000;
        await order.save();
        await sendDeliveryOtpMail(order.user, otp)
        
        return res.status(200).json({message: `Delivery OTP send to ${order.user.username}`});

    } catch(error) {
        return res.status(500).json({message: "Error in sendDeliveryOtp controller", error: error.message});
    }
};

export const verifyDeliveryOtp = async(req, res) => {
    try {
        const {orderId, shopOrderId, otp} = req.body;
        const order = await Order.findById(orderId).populate("user");
        let shopOrder = order.shopOrders.id(shopOrderId)

         if(!order || !shopOrder) {
            return res.status(404).json({message: "Unable to find Order/Shop Order"})
        }

        if(shopOrder.deliveryOtp != Number(otp) || !shopOrder.otpExpires || shopOrder.otpExpires < Date.now()) {
            return res.status(404).json({message: `Invalid / Expire OTP for this delivery, Kindly send again`});
        }

        shopOrder.status = "delivered";
        shopOrder.deliveredAt = Date.now();
        shopOrder.assignment.status = "delivered";

        await DeliveryAssignment.deleteOne({
            order: order._id,
            shopOrderId: shopOrder._id,
            assignedTo: shopOrder.assignedDeliveryBoy,
        })

        return res.status(200).json({message: "Delivery OTP verified, Order marked as delivered"});

    } catch (error) {
        return res.status(500).json({message: "Error in verifyDeliveryOtp controller", error});
    }
}