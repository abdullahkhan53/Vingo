import express from "express";
import "dotenv/config";
import http from "http";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import User from "./models/userModel.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import shopRouter from "./routes/shopRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { Server } from "socket.io";
import { socketHandler } from "./socket.js";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

// Prewritten Globally Middlewares --------
app.use(express.json());
app.use(cookieParser());


// Socket IO
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
        methods: ['GET', 'POST']
    }
})

app.set("io", io);

// Cors
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

socketHandler(io)

// Routes ------
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/shop", shopRouter);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

// socketHandler(io)

// Listening Port and Connecting Database -------
server.listen(port, () => {
    connectDb()
    console.log(`App is listening on port: ${port}`)
})

