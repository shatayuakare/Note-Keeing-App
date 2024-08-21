import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import router from "./routes/auth_router.js";
import routerNote from "./routes/note_router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { isLoggedIn } from "./controller/auth.controller.js";

const server = express();
dotenv.config();

server.use(express.json())
server.use(cors())
server.use(cookieParser());

const PORT = process.env.PORT || 4000;
const MongoDB = process.env.MONGODB_URI;

server.listen(PORT, async () => {
    try {
        await mongoose.connect(MongoDB)
        console.log("Database connected Successfully");
    } catch (error) {
        console.log(error);
    }

    console.log(`Server Working on port : ${PORT}`);
});

server.use("/auth", router);
server.use("/notes", isLoggedIn, routerNote);

server.get("/", (req, res) => {
    res.send(`Server Working on port ${PORT}`)
})
