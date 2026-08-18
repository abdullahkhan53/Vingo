import User from "../models/userModel.js"

export const getCurrUser = async(req, res) => {
    try {
        let user = req.userId
        if(!user) {
            return res.status(500).json({message: "user not found"})
        }
        user = await User.findById(user)
        console.log(user);
        return res.status(200).json({message: "User Logged In", user})
        
    } catch (error) {
        res.status(400).json({message: "Error in getCurrUser", error})
    }
}

export const getUserlocationCoords = async(req, res) => {
    try {
        const {lng, lat} = req.body;
        let user = await User.findByIdAndUpdate(req.userId, {
            location: {
                type: "Point",
                coordinates: [lng, lat]
            }
        });
        if(!user) {
            return res.status(500).json({message: "User not found"})
        }
        return res.status(200).json({message: "User Location Updated"})
    } catch (error) {
        res.status(500).json({message: "Error in getUserlocationCoords", error})
    }
}