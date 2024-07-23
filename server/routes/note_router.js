import express from "express";
import { addNote, getNotes } from "../controller/auth_controller.js";
import User from "../models/user_model.js";
// import User from "../models/user_model.js";

const router = express.Router();
router.use(express.json())

router.get("/", getNotes);
router.post("/add", addNote);

router.get('/:id', async (req, res) => {

    try {
        const user = await User.findOne();
        if (!user) return res.status(404).json("User not logged in")

        const _id = req.params.id;

        const note = user.find(_id)
        res.status(200).json(note)

    } catch (error) {
        res.status(404).json({ message: (error.message) });
    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    Note.findByIdAndUpdate(id, { title, content }, (err) => {
        if (err) {
            res.status(400).send({ message: 'Error updating note' });
        } else {
            res.send({ message: 'Note updated successfully' });
        }
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Note.findByIdAndRemove(id, (err) => {
        if (err) {
            res.status(404).send({ message: 'Note not found' });
        } else {
            res.send({ message: 'Note deleted successfully' });
        }
    });
});

export default router