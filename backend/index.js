import express from "express";
import "dotenv/config";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import User from "./models/userModel.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import shopRouter from "./routes/shopRoutes.js";
import itemRouter from "./routes/itemRoutes.js";

const app = express();
const port = process.env.PORT || 8080;

// Prewritten Globally Middlewares --------
app.use(express.json());
app.use(cookieParser());

// Cors
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

// Routes ------
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);



// Listening Port and Connecting Database -------
app.listen(port, () => {
    connectDb()
    console.log(`App is listening on port: ${port}`)
})

