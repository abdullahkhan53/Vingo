import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrUser } from "../controller/userController.js";


const userRouter = express.Router()

userRouter.get("/current", isAuth, getCurrUser );

export default userRouter;