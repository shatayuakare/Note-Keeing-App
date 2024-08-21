import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const EditForm = ({ data }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")

    const [error, setError] = useState(null)
    useEffect(() => {
        console.log(data)
        if (data !== null) {
            setTitle(data.title)
            setContent(data.content)
        }
    }, [data])
    const saveChange = async (event) => {
        event.preventDefault();
        if (data !== null) return;
        if (!title) {
            setError("Please enter title");
            return;
        }
        if (!content) {
            setError("Please enter message");
            return;
        }
        const updateData = {
            title, content
        }
        await axios.post(`http://localhost:4001/notes/update/${data._id}`, updateData).then(() => {
            toast.success("Changes Successfully")
            window.location.reload()
        }).catch((err) => toast.error(err.response.data))
    }
    return (
        <dialog id="edit-form" className="modal">
            <div className="modal-box bg-purple-500">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h4 className='sm:text-2xl md:text-3xl my-3 font-bold text-white text-center'>
                    Edit Note
                </h4>
                <form action="" className='gap-6 grid' onSubmit={saveChange}>

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
                    <button type='submit' className='btn btn-ghost bg-purple-700 w-2/5 hover:bg-purple-800 text-white font-bold btn-md mx-auto block'>
                        Save Changes
                    </button>
                </form>
            </div>
        </dialog>
    )
}

export default EditForm