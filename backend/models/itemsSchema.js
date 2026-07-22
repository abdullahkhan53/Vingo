import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema({
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
        ]
    },
    price:{
        type: String,
        required: true
    },
    foodType:{
        type: String,
        enum: ["veg", "non-veg"],
        required: true  
    }

})

const Item = mongoose.model("Item", itemSchema);
export default Item;