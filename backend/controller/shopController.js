import Shop from "../models/shopModel.js";
import {cloudinary} from "../config/cloudinary.js"

export const createShop = async(req, res) => {
    try{
        const {name, city, state, address} = req.body;
        let image = {};
        if(req.file){
            const result = await cloudinary.uploader.upload_stream(req.file.path)
        }
        image ={
            url: result.secure_url,
            fileName: result.public_id
        }
        const shop = await Shop.create({
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