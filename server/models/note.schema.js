import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        default: "Hello Guys"
    },
    content: {
        type: String,
        default: "THis is note field"
    },
    date: {
        type: Date,
        default: Date.now
    },
    star: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
})

const Notes = mongoose.model("notes", noteSchema);
export default Notes
