import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const Header = () => {
    const [authUser, setAuthUser] = useAuth();
    setAuthUser(authUser)

    return (
        <header className="navbar bg-gray-100 text-black shadow-purple-300 shadow-xl md:px-24">
            <div className="navbar-start">
                <Link to={'/'} className="btn btn-ghost text-black font-bold text-xl">
                    <i className='bx bxs-pen text-purple-800 text-3xl'></i>
                    Agenda
                </Link>
            </div>
            <div className="navbar-center w-1/3 hidden xl:flex">
                <label className="input input-bordered bg-transparent shadow-lg shadow-purple-300 rounded-full flex items-center gap-2 w-full">
                    <input type="text" className="grow " placeholder="Search" />
                    <button className='btn btn-ghost btn-sm p-0 text-purple-500'>
                        <i className='bx bx-search-alt text-2xl font-bold'></i>
                    </button>
                </label>
            </div>
            <div className="navbar-end">
                {
                    !authUser ?

                        <Link to={'/login'} className="btn btn-ghost bg-purple-700  hover:bg-purple-800 text-white font-bold btn-md">
                            Login
                        </Link>
                        :
                        <Link to={'/login'} className="btn btn-ghost bg-purple-700  hover:bg-purple-800 text-white font-bold btn-md">
                            Logout
                        </Link>
                }
            </div>
        </header>
    )
}

export default Header