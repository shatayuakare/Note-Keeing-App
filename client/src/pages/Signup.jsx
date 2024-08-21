import React, { useState } from 'react'
import toast from "react-hot-toast"
import axios from "axios"
import { Link } from 'react-router-dom'
import { validateEmail } from '../helper';

const Signup = () => {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const [showPassword, setShowPassword] = useState(false)
    const [type, setType] = useState("password");


    const halderSignup = async (event) => {
        event.preventDefault();
        setLoading(true)
        if (!name) {
            setError("Please enter name");
            return;
        }


        if (!validateEmail(email)) {
            setError("PLease enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter valid password")
            return;
        }



        const userInfo = {
            name,
            email,
            password
        }

        // console.log(userInfo)
        await axios.post("http://localhost:4001/auth/signup", userInfo).then((res) => {
            // console.log(res.data.message)
            setLoading(false)
            console.log(res)
            toast.success("Signup Successfully");
            // console.log(res)
            // localStorage.setItem("user", JSON.stringify(res.data.user));
            // window.location.reload();
        }).catch((err) => {
            setLoading(false)
            console.log("erro: ", err)
            toast.error(err.response.data.message)
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
            md:w-2/5 md:gap-6 w-full sm:gap-4 grid sm:mx-4' onSubmit={halderSignup}>
                <h3 className='text-center text-2xl font-bold underline text-white'>
                    Sign Up
                </h3>
                <hr />
                <input type="text" placeholder="Full Name..."
                    name='full-name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full bg-white"
                />

                <input type="email" placeholder="Email Address..."
                    name='email' value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full bg-white"
                />

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
                <hr />

                <div>
                    <button className='btn btn-ghost bg-purple-700 w-2/5  hover:bg-purple-800 text-white font-bold btn-md  mx-auto block'>
                        {
                            loading && <span className="loading loading-spinner"></span>
                        }
                        Sign up
                    </button>

                    <div className='text-center text-white'>
                        Aleardy existing User? &nbsp;
                        <Link className='text-purple-200' to={'/login'}>
                            Login
                        </Link>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default Signup