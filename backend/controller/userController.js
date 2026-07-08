import User from "../models/userModel.js"

export const getCurrUser = async(req, res) => {
    try {
        let user = req.userId
        if(!user) {
            return res.status(500).json({message: "user not found"})
        }
        let currUser = await User.findById(user)
        console.log(currUser);
        return res.status(200).json({message: "User Logged In"})
        
    } catch (error) {
        res.status(400).json({message: "Error in getCurrUser", error})
    }
}