import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { createItem } from "../controller/itemController.js";
const itemRouter = express.Router();

itemRouter.post("/create-item",isAuth, upload.single("image"), createItem);

export default itemRouter;