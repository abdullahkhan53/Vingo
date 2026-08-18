import mongoose from "mongoose";

const Schema = mongoose.Schema;

const  userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "owner", "deliveryBoy"],
    },
    mobile: {
        type: Number,
        required: true,
    },
    sendOtp:{
        type: Number,
    },
    isOtpVerified:{
        type: Boolean,
        default: false,
    },
    otpExpires:{
        type: Date,
    },
    location: {
        type: {type: String, enum: ['Point'], default: 'Point'},
        coordinates: {type: [Number], default: [0, 0]},
    }

});

userSchema.index({location: '2dsphere'});

const User = mongoose.model("User", userSchema);
export default User;