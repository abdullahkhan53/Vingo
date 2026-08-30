import express from "express";
import { createEditShop, getMyShop, getShopById, getShopsByCity } from "../controller/shopController.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
const shopRouter = express.Router();

shopRouter.post("/create-edit-shop",isAuth, upload.single("image"), createEditShop);
shopRouter.get("/get-my", isAuth, getMyShop);
shopRouter.get("/get-by-city/:city", isAuth, getShopsByCity);
shopRouter.get("/get-shop-by-id/:shopId", isAuth, getShopById);

export default shopRouter;