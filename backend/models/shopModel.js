import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shopSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        url:{
            type: String,
            required: true
        },
        fileName:{
            type: String,
        }  
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
    address:{
        type: String,
        required: true
    },
    items:{
        type: mongoose.Schema.Types.objectId,
        ref: "Item"
    }
});

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;