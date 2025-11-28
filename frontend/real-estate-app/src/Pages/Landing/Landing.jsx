import React, { useState } from 'react'
import './Landing.css'
import bg from "../../assets/images/mumbai-skyline.jpg"
import PropertyCard from '../../components/Client/PropertyCard'
import Footer from '../../components/Client/Footer'
import { ToastContainer, toast, Slide } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { setName, setPropertiesInterested, setId, setRole } from "../../redux/features/userSlice";
import NewlyAdded from '../../components/Client/NewlyAdded'


const Landing = () => {
    // const user = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const [user, setUser] = useState({ email: "", password: "" })
    const navigate = useNavigate("/")

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.type]: e.target.value
        });
    }
    const handleLogin = (e) => {
        e.preventDefault()

        axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, user, { withCredentials: true })
            .then((res) => {
              //  console.log(res);
                toast.success(res.data.message)
                //redux store save values
                dispatch(setId({ id: res.data.user._id }))
                dispatch(setName({ name: res.data.user.name }))
                dispatch(setRole({ role: res.data.user.role }))
                dispatch(setPropertiesInterested({ propertiesInterested: res.data.user.propertiesInterested }))
                setTimeout(() => {
                    if (res.data.user.role == "client") {
                        navigate("/client")
                    } else if (res.data.user.role == "agent") {
                        navigate("/agent")

                    }
                }, 3000);

            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message)
            })

    }
    return (
        <div>
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

            <form onSubmit={handleLogin}>
                <div className='content'>
                    <div className='left'>FIND YOUR DREAM HOME</div>
                    <div className='right'>

                        <p className='title'>Login</p>

                        <input type="email" placeholder='email' autoComplete='off' onChange={handleChange} required />
                        <input type="password" placeholder='password' onChange={handleChange} required />

                        <button >Login</button>
                        <p>Dont have account <a href="/register">register</a></p>

                    </div>
                </div>
            </form>


            {/* house section */}

            <div className="building-card">
                <NewlyAdded />
            </div>


            <Footer />




        </div>
    )
}

export default Landing