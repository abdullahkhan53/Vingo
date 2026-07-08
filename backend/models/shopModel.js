import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shopSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true  
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    items:{
        type: mongoose.Schema.Types.objectId,
        red: "Item"
    }
});

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;