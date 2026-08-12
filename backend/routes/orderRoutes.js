import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { placeOrder, getMyOrders } from "../controller/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/place-order",isAuth, placeOrder);
orderRouter.get("/my-orders", isAuth, getMyOrders)

export default orderRouter;