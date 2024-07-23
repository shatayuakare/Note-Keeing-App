import bcrypt from 'bcryptjs'
import User from '../models/user_model.js';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User Already Exist." });

        const hashPassword = await bcrypt.hash(password, 10);

        const createUser = new User({
            name, email, password: hashPassword
        });

        await createUser.save();
        res.status(201).json({
            message: "User Created Successfully",
            user: {
                name, email
            }
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

        (!isMatch || (email !== user.email)) ? res.status(400).json({ message: "Incorrect email or password" })
            : res.status(200).json({
                message: "Login Successfully",
                user: {
                    name: user.name,
                    email: user.email
                }
            });

    } catch (error) {
        res.status(201).json({ message: error.message })
    }

}


export const addNote = async (req, res) => {
    try {
        const { title, content, email } = req.body;
        const user = await User.findOne({ email })
        user.notes.push({ title: title, content: content });
        await user.save()

        res.status(201).json({ message: "Note added" })
    } catch (error) {
        res.status(400).json(error.message)
    }
}


export const getNotes = async (req, res) => {

    try {
        const user = await User.findOne();

        const notes = user.notes
        res.status(200).json(notes)

    } catch (error) {
        res.status(404).json({ message: (error.message) });
    }
}
