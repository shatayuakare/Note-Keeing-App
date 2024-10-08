import React, { useEffect, useState } from 'react'
import Form from '../components/Form'
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import EditForm from '../components/EditForm';


const Main = () => {
    const [notes, setNotes] = useState([]);
    const [authUser, setAuthUser] = useAuth();
    setAuthUser(authUser)


    const [editData, setEditData] = useState(null);
    const getNotes = async () => {
        const note = await axios.get("http://localhost:4001/notes/");
        setNotes(note.data)
    }

    const deleteNote = async (id) => {
        await axios.delete(`http://localhost:4001/notes/${id}`)
    }

    const starMark = async (id) => {
        await axios.put(`http://localhost:4001/notes/star/${id}`)
    }

    const editNote = async (elem) => {
        document.getElementById('edit-form').showModal()
        setEditData({
            id: elem.id,
            title: elem.title,
            content: elem.title
        })
    }
    useEffect(() => {
        getNotes()
    }, [{ starMark, deleteNote }])

    return (
        <section className='flex items-center justify-center'>

            <button className='btn btn-ghost w-16 shadow-xl h-16 bg-purple-500 hover:bg-purple-700 text-white font-bold fixed bottom-5 right-5 px-4'
                onClick={() => document.getElementById('my_modal_5').showModal()}>
                <i className='bx bx-plus text-3xl'></i>
            </button>
            <div className='container rounded-2xl p-2 sm:mx-2 sm:w-full md:w-10/12 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 sm:gap-4'>
                {

                    notes.map((elem) => {
                        return (
                            <div className="card shadow-xl border-2 border-purple-500 rounded-md" key={elem._id}>
                                <div className="card-body p-3">
                                    <h2 className="card-title text-purple-500">
                                        {elem.title}
                                        <button className='btn btn-sm ms-auto  p-0  btn-ghost text-purple-500'
                                            onClick={() => starMark(elem._id)}
                                        >
                                            {
                                                (!elem.star) ?
                                                    <i className='bx bx-star p-1 text-md'></i>
                                                    :
                                                    <i className='bx bxs-star p-1 text-md text-orange-400'></i>
                                            }
                                        </button>
                                    </h2>
                                    <div className='-mt-1'>
                                        <div className='text-sm -mb-1 text-gray-500'>
                                            {elem.date}
                                            <button className='btn btn-sm float-end p-0 btn-ghost text-purple-500'
                                                onClick={() => editNote(elem)}>
                                                <i className='bx bxs-pencil text-md p-1' ></i>
                                            </button>

                                        </div>
                                        {elem.content}
                                    </div>
                                    <button className='btn btn-sm ms-auto float-end p-0 btn-ghost text-red-500' onClick={() => deleteNote(elem._id)}>
                                        <i className='bx bxs-trash p-1 text-md'></i>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Form />
            <EditForm data={editData} />
        </section >
    )
}

export default Main