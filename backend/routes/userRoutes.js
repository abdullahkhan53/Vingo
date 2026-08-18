import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getCurrUser, getUserlocationCoords } from "../controller/userController.js";


const userRouter = express.Router()

userRouter.get("/current", isAuth, getCurrUser );
userRouter.post("/update-location", isAuth, getUserlocationCoords);

export default userRouter;