import express from "express";
import { login, signup } from "../controller/auth_controller.js"
import User from "../models/user_model.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const user = await User.findOne();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: "User not found" });
    }
})

router.post("/login", login)

router.post("/signup", signup)

export default router