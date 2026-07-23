import Shop from "../models/shopModel.js";
import Item from "../models/itemsSchema.js"
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
                const result = await uploadToCloudinary(req.file.buffer)
                image ={
                url: result.secure_url,
                fileName: result.public_id
            }
        }
        
        const item = await Item.create({
            name, 
            image,
            category,
            price,
            foodType,
            shop: shop._id
        })

        await shop.items.push(item._id);
        await shop.save();
        await shop.populate("items owner");

        console.log(shop);
        res.status(201).json({message: "Item created successfully", shop})
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
            image ={
                url: result.secure_url,
                fileName: result.public_id
            }
        }
        const item = await Item.findByIdAndUpdate(itemId, {
            name, category,  price, foodType, image,
        }, {new: true})
        if(!item) {
            return res.status(404).json({message: "Item not found"});
        }
        return res.status(200).json({message: "Item updated successfully", item})
    }
    catch(err) {
        console.error(err);
        return res.status(500).json({message: "Internal server error in Item Controller", err})
    }
}

export const deleteItem = async(req, res) => {
    try {
        let {itemId} = req.params;
        if(!itemId){
            return res.status(400).json({message: "Item ID is required"})
        }
        const item = await Item.findByIdAndDelete(itemId);
        res.status(200).json({message: "Item deleted successfully", item})
    } catch (error) {
        return res.status(401).json({message: "something went wrong in deleting item", error})
    }
}

export const getItemById = async(req, res) => {
    try {
        let {itemId} = req.params;
        if(!itemId){
            return res.status(400).json({message: "Item ID is required"})
        }
        const item = await Item.findById(itemId);
        return res.status(200).json({message: "Item Fetched Successfully", item});
    } catch(err) {
        return res.status(500).json({message: "Internal server error in fetching item", err})
    }
}