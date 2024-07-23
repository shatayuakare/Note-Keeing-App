import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from "axios"
import { Link } from 'react-router-dom'
import { validateEmail } from "../helper"

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const [showPassword, setShowPassword] = useState(false)
    const [type, setType] = useState("password");


    const halderlogin = async (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            setError("PLease enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter valid password")
            return;
        }

        const userInfo = {
            email,
            password
        }
        // console.log(userInfo)

        await axios.post("https://note-keeing-app.onrender.com/auth/login", userInfo).then((res) => {
            // console.log (res.data.message)
            toast.success("Login Successfullly")

            localStorage.setItem("user", JSON.stringify(res.data.user));
        }).catch((err) => {
            setError(err.response.data.message)
            if (err.response) return toast.error(err.response.data.message)
        })

        setError("")
        setTimeout(() => {
            window.location.reload()
        }, 2000);
    }

    const passwordShowHandler = () => {
        if (type == "password") {
            setType("text");
            setShowPassword(true);
        } else {
            setShowPassword(false);
            setType("password");
        }
    }
    return (
        <section className='flex items-center justify-center'>
            <form action="" className='bg-purple-500 rounded-2xl p-4 
            md:w-2/5 md:gap-6 sm:gap-4 grid sm:mx-4 w-full'
                onSubmit={halderlogin}>
                <h3 className='text-center text-2xl font-bold underline text-white'>
                    Login
                </h3>
                <hr />
                <input type="text" placeholder="Email address..." className="input input-bordered w-full bg-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />

                <div>
                    <label className="w-full relative block">
                        <input type={type} placeholder="Password..." className="input input-bordered w-full bg-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type='button' className='btn btn-ghost p-0 my-auto text-purple-500 absolute top-0 right-1 bottom-0'
                            onClick={passwordShowHandler}>
                            {
                                showPassword ?
                                    <i className='bx bx-show-alt text-2xl p-2'></i>
                                    :
                                    <i className='bx bxs-hide text-2xl p-2' ></i>

                            }
                        </button>
                    </label>
                    {
                        error && <p className='text-red-300'>{error}</p>
                    }
                    <button className='btn btn-ghost btn-sm ps-0 text-purple-300'>
                        Forgot Password?
                    </button>
                </div>

                <div>
                    <button type='submit'
                        className='btn btn-ghost bg-purple-700  w-2/5 hover:bg-purple-800 text-white font-bold btn-md  mx-auto block'>
                        Login
                    </button>

                    <div className='text-center text-white'>
                        New user? &nbsp;
                        <Link className='text-purple-200' to={'/signup'}>
                            Create an Account
                        </Link>
                    </div>
                </div>
            </form>
        </section >
    )
}

export default Login