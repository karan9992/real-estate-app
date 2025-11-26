import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Client from './Pages/Clients/Client'
import MainLayout from './MainLayout'
import Landing from './Pages/Landing/Landing'
import Register from './Pages/Register/Register'
import Agent from './Pages/Agent/Agent'
import AgentAddProp from './components/Agent/AgentAddProp'
import AgentMyProp from './components/Agent/AgentMyProp'
import AgentInterested from './components/Agent/AgentInterested'

const Routing = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={
                    <MainLayout>
                        <Landing />
                    </MainLayout>
                } />

                <Route path='/client' element={
                    <MainLayout>
                        <Client />
                    </MainLayout>
                } />

                <Route path='/register' element={

                    <Register />

                } />
                <Route path='/agent' element={
                    <MainLayout>
                        <Agent child={<AgentMyProp/>} />                            
                       
                    </MainLayout>
                } />
                <Route path='/agent/add' element={
                    <MainLayout>
                        <Agent child={<AgentAddProp/>} />                            
                       
                    </MainLayout>
                } />
                <Route path='/agent/interested' element={
                    <MainLayout>
                        <Agent child={<AgentInterested/>} />                            
                       
                    </MainLayout>
                } />



            </Routes>
        </>
    )
}

export default Routing