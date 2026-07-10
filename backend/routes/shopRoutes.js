import express from "express";
import { createShop } from "../controller/shopController";
import isAuth from "../middlewares/isAuth";
import upload from "../middlewares/multer.js";
const roter = express.Router();

router.post("/create-shop",isAuth, upload.single("image"), createShop);

export default router;