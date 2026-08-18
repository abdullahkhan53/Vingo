import mongoose from "mongoose";
const Schema =  mongoose.Schema;

const deliveryAssignmentSchema = new Schema({
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    shopOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    broadcastTo:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    status: {
        type: String,
        enum: ["broadcasted", "assigned", "delivered"],
        default: "broadcasted"
    },
    acceptedAt: Date,

}, {timestamps: true});

const DeliveryAssignment = mongoose.model("DeliveryAssignment", deliveryAssignmentSchema);
export default DeliveryAssignment;