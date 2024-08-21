import Notes from "../models/note.Schema.js"

export const getNotes = async (req, res) => {
    try {
        const notes = await Notes.find();

        if (!notes) return res.status(404).json({ message: "Notes not Found" })

        res.status(200).json(notes);
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const getNote = async (req, res) => {
    try {
        const note = await Notes.findOne({ _id: req.params.id })
        if (!note) return res.status(404).json({ message: "Note not Found" });
        res.status(200).json(note)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const addNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        const createNote = new Notes({
            title, content
        });

        createNote.save();
        res.status(201).json({ message: "Note Created", createNote });
    } catch (error) {
        res.status(400).json(error.message);
    }
}


export const markStar = async (req, res) => {
    try {
        const id = req.params.id;
        const note = await Notes.findOne({ _id: id })

        await Notes.findOneAndUpdate({ _id: id }, { star: !note.star })
        res.status(200).json({ message: "Star Marked" })
    } catch (error) {
        res.status(400).json(error.message)
    }
}
export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const id = req.params.id;
        await Notes.findOneAndUpdate({ _id: id }, { title, content })

        res.status(200).json({ message: "Data Updated" });
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const deleteNote = async (req, res) => {
    try {
        const id = req.params.id;

        const note = await Notes.findOne({ _id: id });
        if (!note) return res.status(404).json({ message: "Note not Found" })

        await Notes.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({ message: "Note Deleted", note })
    } catch (error) {
        res.status(400).json(error.message)
    }
}