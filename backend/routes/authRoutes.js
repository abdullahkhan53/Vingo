import express from "express";
import { signUp, signIn, logout, sendOtp, verifyOtp, setNewPassword, googleAuth } from "../controller/authController.js"

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/logout", logout);

// Auth Forget Password # steps Verification Routes
authRouter.post("/send-mail", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/set-newPassword", setNewPassword);
authRouter.post("/google-auth", googleAuth);



export default authRouter;