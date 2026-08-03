import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shopOrderItemSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: "Items"
    },
    quantity: Number,
    subTotal: Number,
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
    shopOrderItems: [shopOrderItemSchema],
})

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "ONLINE"]
    },
    deliveryAddress: {
        text: String,
        longitude: Number,
        latitude: Number
    },
    shopOrder: [shopOrderSchema],
},{timestamps: true});

const Order = mongoose.model("Order", orderSchema);
export default Order;