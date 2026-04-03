import express from "express";
import "dotenv/config";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import Authrouter from "./routes/authRoutes.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8080;

// Prewritter Globally Middlewares --------
app.use(express.json());
app.use(cookieParser());

// Cors
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

// Routes ------
app.use("/api/auth", Authrouter);



// Listening Port and Connecting Database -------
app.listen(port, () => {
    connectDb()
    console.log(`App is listening on port: ${port}`)
})

