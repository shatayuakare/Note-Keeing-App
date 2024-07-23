import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';

const Form = () => {

    const [authUser, setAuthUser] = useAuth();
    setAuthUser(authUser)


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const email = authUser.email;
    const [error, setError] = useState(null);

    // const editNote = async () => { }
    // const addNewNote = async () => { }
    const formData = {
        title, content, email
    }
    // console.log(email);
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

        await axios.post("https://note-keeing-app.onrender.com/notes/add", formData).then((res) => {
            console.log("response ", res)
            // console.log (res.data.message)
            toast.success("Note add Successfully")
        }).catch((err) => {
            setError(err.response.message)
            if (err.response) returntoast.error(err.response.message)
        })
        setError(null);

        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }


    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
            <div className="modal-box bg-purple-500 shadow-md">
                <form action="" className='gap-6 grid' onSubmit={addNoteHandler}>
                    <h4 className='sm:text-2xl md:text-3xl mt-2 font-bold text-white text-center'>
                        Add Notes with Agenda
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4">
                            ✕
                        </button>
                    </h4>
                    <hr />

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
                    <button className='btn btn-ghost bg-purple-700 w-2/5 hover:bg-purple-800 text-white font-bold btn-md  mx-auto block'>
                        Add Note
                    </button>
                </form>
            </div>
        </dialog>
    )
}

export default Form