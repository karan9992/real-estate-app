import React from 'react'
import './AgentSidebar.css'
import { useSelector, useDispatch } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate, useNavigation } from 'react-router-dom';
import { clearUser, setLocation } from "../../redux/features/userSlice";

import axios from 'axios';


const AgentSidebar = () => {
  const name = useSelector((state) => state.user.name);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  

  const handleLogout = () => {
    console.log("Logged out");
    axios.post(`${import.meta.env.REACT_APP_API_URL}/api/auth/logout`, {}, { withCredentials: true })
      .then((res) => {
        console.log(res)
        dispatch(clearUser());

        navigate("/");
      })
      .finally((err) => console.log(err))
  }

  return (
    <div>
      <div className="side-container">

        <div className="icon"> <FaRegUserCircle className='icon' />  </div>
        <div className="user-name"> {name ? name : "user"}</div>

        <button onClick={() => navigate("/agent")}>My Properties</button>
        <button onClick={() => navigate("/agent/add")}>Add Property </button>
        <button onClick={() => navigate("/agent/interested")} >Interested </button>
        <button onClick={handleLogout} >Logout </button>


      </div>
    </div>
  )
}

export default AgentSidebar