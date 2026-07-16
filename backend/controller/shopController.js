import Shop from "../models/shopModel.js";
import {cloudinary} from "../config/cloudinary.js"

export const createEditShop = async(req, res) => {
    try{
        const {name, city, state, address} = req.body;
        let shop = await Shop.findOne({owner: req.userId})
        if(shop){
           let result = await shop.findOneAndUpdate({owner: req.userId}, {name, city, state, address, image}, {new: true});
           return res.status(200).json({message: "shop updated successfully", result})
        }
        let image = {};
        if(req.file){
            const result = await cloudinary.uploader.upload_stream(req.file.path)
        }
        image ={
            url: result.secure_url,
            fileName: result.public_id
        }
        shop = await Shop.create({
            name,
            image,
            state,
            city,
            address,
            owner: req.userId
        });
        return res.status(201).json({message: "shop Create Successfully", shop})
    } 
    catch(err) {
        return res.status(500).json({message: "something went wrong in createShop", err})
    }
}

export const getMyShop = async(req,res) => {
    try{
        const shop = await Shop.findOne({owner: req.userId}).populate("owner");
        if(!shop){
            res.status(404).json({message: "Shop not found"});
            return null;
        }
        return res.status(200).json({messag: "Shop found", shop})
    }
    catch(err) {
        res.status(500).json({message: "something went wrong in getMyShop", err})
    }

}