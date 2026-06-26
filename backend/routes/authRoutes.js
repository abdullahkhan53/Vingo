import express from "express";
import { signUp, signIn, logout, sendOtp, verifyOtp, setNewPassword, googleAuth } from "../controller/authController.js"

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logout);

// Auth Forget Password # steps Verification Routes
router.post("/send-mail", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/set-newPassword", setNewPassword);
router.post("/google-auth", googleAuth);



export default router;