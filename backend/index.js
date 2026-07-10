import express from "express";
import "dotenv/config";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import Authrouter from "./routes/authRoutes.js";
import Userrouter from "./routes/userRoutes.js";
import Shoprouter from "./routes/shopRoutes.js";
import Itemrouter from "./routes/itemRoutes.js";
import cors from "cors";
import User from "./models/userModel.js";

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
app.use("/api/auth", Authrouter);
app.use("/api/user", Userrouter);
app.use("/api/shop", Shoprouter);
app.use("/api/item", Itemrouter);



// Listening Port and Connecting Database -------
app.listen(port, () => {
    connectDb()
    console.log(`App is listening on port: ${port}`)
})

