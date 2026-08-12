import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shopOrderItemSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: "Item"
    },
    quantity: Number,
    subTotal: Number,
    name: String,
})

const shopOrderSchema = new Schema({
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    subTotal: Number,
    shopOrderItems: [shopOrderItemSchema],
    status: {
        type: String,
        enum: ["preparing", "pending", "out of delivery", "delivered"],
        default : "pending"
    }
})

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "online"]
    },
    deliveryAddress: {
        text: String,
        longitude: Number,
        latitude: Number
    },
    totalAmount:{
        type: Number
    },
    shopOrders: [shopOrderSchema],
},{timestamps: true});

const Order = mongoose.model("Order", orderSchema);
export default Order;