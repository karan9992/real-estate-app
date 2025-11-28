import React from 'react'
import './Agent.css'
import Footer from '../../components/Client/Footer'
import AgentSidebar from '../../components/Agent/AgentSidebar'
import { ToastContainer, Slide } from 'react-toastify'


const Agent = ({ child }) => {
    return (
        <div className="page-container">
            <div className='top-Acontainer'>
                <div className="sidebar">
                    <AgentSidebar />
                </div>
                <div className='main'>

                    {child}
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
                </div>

            </div>


        </div>
    )
}

export default Agent