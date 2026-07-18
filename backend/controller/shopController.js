import Shop from "../models/shopModel.js";
// import {cloudinary} from "../config/cloudinary.js";
import  {uploadToCloudinary}  from "../utils/streamifier.js"

export const createEditShop = async(req, res) => {
    try{
        let {name, city, state, address} = req.body;
        let shop = await Shop.findOne({owner: req.userId})
        let image;
        if(req.file){
            const cloudinaryResult = await uploadToCloudinary(req.file.buffer)
            console.log("REQ FILE BUFFER ***")
            console.log(cloudinaryResult)
            image = {
            url: cloudinaryResult.secure_url,
            fileName: cloudinaryResult.public_id
        }

        }
        let updateFields = {
            name, 
            city,
            state,
            address,
        }
        if(req.file) {
            updateFields.image = image;
        }

        if(shop){
            let updatedShop = await Shop.findOneAndUpdate({owner: req.userId}, updateFields, {new: true});
            return res.status(201).json({message: "shop updated successfully", updatedShop})
        }     
        
        if(!req.file){
            return res.status(400).json({message: "Image is required"})
        }

        shop = await Shop.create({
            name,
            image,
            state,
            city,
            address,
            owner: req.userId
        });
        return res.status(200).json({message: "shop Created Successfully", shop})
    } 
    catch(err) {
        return res.status(500).json({message: "something went wrong in createShop", err})
    }
}

export const getMyShop = async(req,res) => {
    try{
        const shop = await Shop.findOne({owner: req.userId}).populate("owner");
        if(!shop){
           return res.status(404).json({message: "Shop not found"});
        }
        return res.status(201).json({messag: "Shop found", shop})
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({message: "something went wrong in getMyShop", err})
    }

}