import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js"
import { sendMail } from "../utils/mail.js";

// import {sendMail} from "../utils/mail.js"

export const signUp = async (req, res) => {
    try{
        let {username, email, password, role, mobile} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(401).json({message: "User with this email is already exist."});
        }
        if(password.length < 6){
            return res.status(401).json({message: "Pasword must be atleast of 6 characters."});
        }
        const hashPass = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            username,
            email,
            password: hashPass,
            role,
            mobile,
        })

        const token = await genToken(newUser._id)

        res.cookie("token", token, {
            secure: false,
            // sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        // console.log(token)
        return res.status(201).json(newUser);
    }
    catch(err){
        return res.status(500).json({message: "something went wrong in signup", err})      
    }
}

export const signIn = async (req, res) => {
    try{
        let {email, password} = req.body;
        let user = await User.findOne({email})

        if(!user){
           return res.status(401).json({message: "User does'nt exist, please sign in first"});
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
           return res.status(401).json({message: "Incorrect Password, Try again."})
        }

        const token = await genToken(user._id)
        res.cookie("token", token, {
            secure: false,
            // sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })
        console.log(token);
        // console.log("RESPONSE", res.cookie)
        // console.log("REQUEST", req.cookies)
        res.status(201).json(user);
    }
    catch(err){
        res.status(500).json({message: "something went wrong in signin"})
        console.log("Check signIn:", err)        
    }
}

export const logout = async(req, res) => {
    try{
        res.clearCookie("token", {
            secure: false,
            httpOnly: true
        });
        res.status(200).json({message: "You logged out"});
    } 
    catch(err) {
        res.status(500).json(`Error in Logout: ${err}`);
    }
}

export const sendOtp = async(req, res) => {
    
    try {
        const {email} = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000)
        let user = await User.findOne({email});

        if(!user){
            return res.status(401).json({message: "User does'nt exist, please sign in first"});
        }
        
        user.sendOtp = otp;
        user.otpExpires= Date.now() + 5 * 60 * 1000;
        await user.save();
        await sendMail(email, otp)       
        
        return res.status(201).json({message: "OTP sent to your Email account"});

    } catch (error) {
         return res.status(500).json({message: "something went wrong in send OTP", error})   
    }
}

export const  verifyOtp = async(req, res) => {
    try {
        const {email, otp} = req.body;
        let user = await User.findOne({email});

        if(!user || user.sendOtp != otp || user.otpExpires < Date.now()){
            return res.status(401).json({message: "Invalid/Expired OTP "});
        }
        
        user.isOtpVerified = true;
        user.sendOtp = undefined;
        user.otpExpires = undefined;
        await user.save();

        return res.status(201).json({message: "OTP verification has been successful"});
        
    } catch (error) {
        return res.status(500).json({message: "something went wrong in OTP verification", error})
    }
}

export const setNewPassword = async(req, res) => {
    try {
        const {email, newPassword} = req.body;
        let user = await User.findOne({email});

        if(!user || !user.isOtpVerified){
            return res.status(401).json({message: "OTP verification is required!"});
        }
        let hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.isOtpVerified = false;
        await user.save();

        return res.status(201).json({message: "Password reset successfuly"});

    } catch (error) {
        return res.status(500).json({message: "something went wrong in OTP reset password", error})
    }
}


export const googleAuth = async(req, res) => {
    try {
        let {username, email, role, mobile} = req.body;
        let user = await User.findOne({email});
        if(!user) {
            user = await User.create({
                username, email, role, mobile
            })
            console.log(user);
        }   
            const token = await genToken(user._id)
            res.cookie("token", token, {
                secure: false,
                // sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            console.log(user);
            return res.status(201).json({message: "User Logged in", user})

    } catch (error) {
        return res.status(500).json({message: `Error In Google Authentication: ${error}`})
    }
}