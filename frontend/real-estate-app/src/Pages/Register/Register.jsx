import React, { useState } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import './Register.css'
import axios from 'axios';
const Register = () => {
    const [user, setUser] = useState({ name: "", email: "", password: "", role: "" })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
    const handleRegister = (e) => {
        e.preventDefault()
        if (!user.role) return toast.error("Please select role")
        if (!user.name) return toast.error("Please enter name")
        if (!user.email) return toast.error("Please enter email")
        if (!user.password) return toast.error("Please enter password")

        console.log(user);
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, user)
            .then((res) => {
                console.log(res);
                toast.success(res.data.message)
            }
            )
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message)
            })
    }
    return (
        <>
            <div className="top-container">
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide} />

            <form onSubmit={handleRegister}>
                <div className='content'>



                    <div className='right' >

                        <p className='title'>Register</p>

                        <select name="role" id="role" onChange={handleChange} required>
                            <option value="">Select User Type</option>
                            <option value="agent">Agent</option>
                            <option value="client">Client</option>
                        </select>

                        <input type="text" placeholder='name' name='name' onChange={handleChange} required />
                        <input type="email" placeholder='email' name='email' onChange={handleChange} required />
                        <input type="password" placeholder='password' name='password' onChange={handleChange} required />

                        <button >Register</button>

                        <p>Already have account <a href="/">login</a></p>

                    </div>



                </div>
            </form>
        </>

    )
}

export default Register