import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrUser } from "../controller/userController.js";


const router = express.Router()

router.get("/current", isAuth, getCurrUser );

export default router;