import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const genToken = async(userId) => {
    try{
        const user = await User.findById(userId);
        const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});
        return token;
    }
    catch(err){
        conosole.log("something went wrong in JWT tokens, please check")
    }
}

export default genToken;

// react-router-dom
// react-icons
// 