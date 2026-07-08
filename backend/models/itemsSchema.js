import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true  
    },
    shop:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
    },
    category:{
        type: String,
        enum: [
            "Snack",
            "Main Course",
            "Deserts",
            "Pizza",
            "Burgers",
            "Sandwiches",
            "South Pakistani",
            "North Pakistani",
            "Chinees",
            "Fast Food",
            "Others"
        ],
        prcie:{
            type: Number,
            required: true
        },
        foodType:{
            type: String,
            enum: ["Veg", "Non-Veg"],
            required: true  
        }
    },


})

const Item = mongoose.model("Item", itemSchema);
export default Item;