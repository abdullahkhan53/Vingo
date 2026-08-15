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
        let newShopOrder = order.shopOrders.find((shopOrder) => (shopOrder.shop || shopOrder.shop._id).toString() === shopId.toString())
        console.log(newShopOrder)
        if(!newShopOrder) {
            console.log("Shop Order not found for shopId:", shopId);
            return res.status(400).json({message: "Status not updated by user"})
        }
        newShopOrder.status = status;
        await order.save();
        return res.status(200).json(newShopOrder);
    } catch (error) {
        return res.status(500).json("something wrong in updateOrderStatus controller");
    }
}