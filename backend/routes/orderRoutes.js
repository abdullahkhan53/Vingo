import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { placeOrder, getMyOrders, updateOrderStatus, getDeliveryBoyAssignments, acceptOrder, getCurrentOrder, getOrderById, sendDeliveryOtp, verifyDeliveryOtp } from "../controller/orderController.js";
const orderRouter = express.Router();

orderRouter.post("/place-order",isAuth, placeOrder);
orderRouter.get("/my-orders", isAuth, getMyOrders)
orderRouter.get("/get-assignments", isAuth, getDeliveryBoyAssignments)
orderRouter.post("/send-delivery-otp", isAuth, sendDeliveryOtp)
orderRouter.post("/verify-delivery-otp", isAuth, verifyDeliveryOtp)
orderRouter.get("/get-current-order", isAuth, getCurrentOrder)
orderRouter.get("/get-order-by-id/:orderId", isAuth, getOrderById)
orderRouter.post("/accept-order/:assignmentId", isAuth, acceptOrder)
orderRouter.post("/update-status/:orderId/:shopId", isAuth, updateOrderStatus)

export default orderRouter;