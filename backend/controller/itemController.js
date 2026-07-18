import Shop from "../models/shopModel.js";
import Item from "../models/itemsSchema.js"
// import {cloudinary} from "../config/cloudinary.js"
import {uploadToCloudinary} from "../utils/streamifier.js"

export const createItem = async(req, res) => {
    try{
        const shop = await Shop.findOne({owner: req.userId});
        const {name, category,  price, foodType} = req.body;
        let image = {};
        if(!shop){
            return res.status(400).json({message: "Shop not found"})
        }
        if(req.file){
            const result = await uploadToCloudinary(req.file.path)
        }
        image ={
            url: result.secure_url,
            fileName: result.public_id
        }
        const item = await Item.create({
            name, 
            image,
            category,
             price,
             foodType,
             shop: shop._id
        })
        console.log(item);
        res.status(201).json({message: "Item created successfully", item})
    }
    catch(err) {
        console.error(err);
        res.status(500).json({message: "Internal server error"})
    }
}

export const editItem = async(req,res) => {
    try{
        const {itemId} = req.params;
        const {name, category,  price, foodType} = req.body; 
        let image = {};
        if(req.file){
            const result = await cloudinary.uploader.upload_stream(req.file.path)
        }
        image ={
            url: result.secure_url,
            fileName: result.public_id
        }
        const item = await Item.findByIdAndUpdate(itemId, {
            name, category,  price, foodType, image,
        }, {new: true})
        res.status(200).json({message: "Item updated successfully", item})
    }
    catch(err) {
        console.error(err);
        res.status(500).json({message: "Internal server error in Item Controller"})
    }
}