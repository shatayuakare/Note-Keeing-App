import express from "express";
// import jwt from "jsonwebtoken";/
// import bcrypt from "bcryptjs"
// import User from "../models/user.schema.js";
import { login, signup } from "../controller/auth.controller.js";

const authRoute = express.Router();

// authRoute.get("/verify", verifyToken);
authRoute.get("/", (req, res) => {
    res.status(200).send("Working Properly on port 4001")
})

authRoute.post("/signup", signup)
authRoute.post("/login", login)

export default authRoute