import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

const Form = () => {

    const [authUser, setAuthUser] = useAuth();
    setAuthUser(authUser)

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [error, setError] = useState(null);

    let email = null;
    let formData = {
        title, content
    }

    if (authUser) {
        email = authUser.email;
        formData = {
            title, content, email
        }
    }

    const addNoteHandler = async (event) => {
        event.preventDefault();

        if (!title) {
            setError("Please enter title");
            return;
        }
        if (!content) {
            setError("Please enter message");
            return;
        }

        await axios.post("http://localhost:4001/notes/add", formData).then(() => {
            toast.success("Note add Successfully")
            window.location.reload()
        }).catch((err) => {
            setError(err.response.message)
            if (err.response) return toast.error(err.response.message)
        })
        setError(null);
    }

    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-purple-500 shadow-md rounded-sm">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>

                <h4 className='sm:text-2xl md:text-3xl my-3 font-bold text-white text-center'>
                    Add Notes with Agenda
                </h4>
                <form action="" className='gap-6 grid' onSubmit={addNoteHandler}>
                    <input type="text" placeholder="Note Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full bg-white" />

                    <textarea className="textarea textarea-bordered bg-white w-full"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="✍️ Message..." rows={4}
                    ></textarea>
                    {
                        error && <p className='text-red-300'>{error}</p>
                    }
                    <hr />
                    <button type='submit' className='btn btn-ghost bg-purple-700 w-2/5 hover:bg-purple-800 text-white font-bold btn-md  mx-auto block'>
                        Add Note
                    </button>
                </form>
            </div>
        </dialog>
    )
}

export default Form