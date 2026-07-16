import express from "express";
import { createEditShop, getMyShop } from "../controller/shopController.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
const shopRouter = express.Router();

shopRouter.post("/create-shop",isAuth, upload.single("image"), createEditShop);
shopRouter.get("/get-my", isAuth, getMyShop);

export default shopRouter;