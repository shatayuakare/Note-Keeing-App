import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from '../models/auth.schema.js';
import dotenv from "dotenv"

dotenv.config()

const secrateKey = process.env.SECRET_KEY

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User Already Exist" });

        const hashPassword = await bcrypt.hash(password, 10);

        const createUser = new User({
            name, email, password: hashPassword
        });

        // console.log("Token : ", token)
        await createUser.save();
        const token = jwt.sign({ createUser }, secrateKey);
        res.cookie("token", token);
        res.status(201).json({
            message: "User Created Successfully",
            user: {
                name, email
            },
            token
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });

        const isMatch = await bcrypt.compare(password, user.password);

        const token = jwt.sign({ user }, secrateKey);

        res.cookie("token", token);

        (!isMatch || (email !== user.email)) ? res.status(400).json({ message: "Incorrect email or password" })
            : res.status(200).json({
                message: "Login Successfully",
                user: {
                    name: user.name,
                    email: user.email
                },
                token
            }
            );

    } catch (error) {
        res.status(201).json({ message: error.message })
    }
}

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(403).json({ message: "You have no permission, Please Login" });

        // console.log(token)
        const decode = jwt.verify(token, secrateKey)
        const user = await User.findOne({ email: decode.email }).select("-password")

        req.user = user
        next()
    } catch (error) {
        res.status(404).json(error.message)
    }
}