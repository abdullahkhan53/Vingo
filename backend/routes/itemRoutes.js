import express from "express";
import { createShop } from "../controller/shopController";
import isAuth from "../middlewares/isAuth";
import upload from "../middlewares/multer.js";
import { createItem } from "../controller/itemController.js";
const router = express.Router();

router.post("/create-item",isAuth, upload.single("image"), createItem);

export default router;