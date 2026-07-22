import express from "express";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";
import { createItem, deleteItem, editItem } from "../controller/itemController.js";
const itemRouter = express.Router();

itemRouter.post("/add-item",isAuth, upload.single("image"), createItem);
itemRouter.post("/edit-item/:itemId",isAuth, upload.single("image"), editItem);
itemRouter.post("/delete-item/:itemId",isAuth,  deleteItem);

export default itemRouter;