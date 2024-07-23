import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notes: [
        {
            title: {
                type: String,
                default: 'Hello guys'
            },
            content: {
                type: String,
                default: 'This is Persnal note Keeping application.'
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const User = mongoose.model("note_app_user", userSchema)

export default User