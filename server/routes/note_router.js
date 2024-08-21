import express from "express"
import { addNote, deleteNote, getNote, getNotes, markStar, updateNote } from "../controller/note.controller.js";
import Users from "../models/auth.schema.js";


const noteRoute = express.Router();


// noteRoute.get("/", getNotes);

noteRoute.get("/", async (req, res) => {
    try {
        // const { token } = req.header;
        res.send(req.headers.cookie)
    } catch (error) {
        res.status(400).json(error.message)
    }
})
noteRoute.get("/:id", getNote);

noteRoute.put("/star/:id", markStar)
noteRoute.post("/add", addNote)
noteRoute.post("/update/:id", updateNote);

noteRoute.delete("/:id", deleteNote);

export default noteRoute