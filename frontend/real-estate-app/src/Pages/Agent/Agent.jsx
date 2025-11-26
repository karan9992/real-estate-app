import React from 'react'
import './Agent.css'
import Footer from '../../components/Client/Footer'
import AgentSidebar from '../../components/Agent/AgentSidebar'

const Agent = ({ child }) => {
    return (
        <div className="page-container">
            <div className='top-Acontainer'>
                <div className="sidebar">
                    <AgentSidebar />
                </div>
                <div className='main'>
                    {child}
                </div>
            </div>
            
           
        </div>
    )
}

export default Agent