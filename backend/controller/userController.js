import User from "../models/userModel.js"

export const getCurrUser = async(req, res) => {
    try {
        const user = req.userId
        if(!user) {
            res.status(500).json({message: "user not found"})
        }
        const currUser = await User.findById(user)
        console.log(currUser);
        res.status(200).json({message: "User Logged In"})
    } catch (error) {
        res.status(400).json({message: "Error in getCurrUser", error})
    }
}