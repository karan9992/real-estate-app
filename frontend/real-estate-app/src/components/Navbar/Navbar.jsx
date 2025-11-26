import React, { useState } from 'react'
import "./Navbar.css"
import { IoHomeOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

import { FaChevronDown } from "react-icons/fa";
import NavbarFilter from './NavbarFilter';
import { FaChevronUp } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, setLocation } from "../../redux/features/userSlice";
import { setCurrentProperty, setPropertyList } from '../../redux/features/propertySlice';
import { setFilter } from "../../redux/features/userSlice";

import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, Slide, toast } from 'react-toastify';


const Navbar = () => {

  //redux
  const dispatch = useDispatch();
  const { currentProperty, propertyList } = useSelector((state) => state.properties);
  const user = useSelector((state) => state.user.filter);
  const name = useSelector((state) => state.user.name);

  // const [filter, setFilter] = useState(false);
  const [location, setULocation] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate()

  const handleLogout = () => {
    console.log("Logged out");
    axios.post(`${import.meta.env.REACT_APP_API_URL}/api/auth/logout`, {}, { withCredentials: true })
      .then((res) => {
        console.log(res)
        dispatch(clearUser());
        
        navigate("/");
      })
      .finally((err) => console.log(err))



  };

  const handleProfile = () => {
    console.log("Navigate to profile");
    // navigate("/profile")
  };

  const handleSearch = () => {
    console.log("search :", location, user)
    dispatch(setLocation({ location }))



    axios.post('http://localhost:3000/api/client/properties', { location: location, ...user },{withCredentials:true}
    )
      .then((res) => {
        console.log(res.data);
        dispatch(setPropertyList(res.data))

      })
      .catch((err) => console.error(err))

  }

  return (<>
   

    <div className='navbar'>
      <div className='logo flexbox'>
        <IoHomeOutline className='icon' /> <span className='logo-title'>KB Estates</span>
      </div>

      <div className='filter'>
        {/* <div className='search-filter'>
        <span onClick={() => setFilter(!filter)} className='flexbox filter-span'> Filter {!filter ? <FaChevronDown /> : <FaChevronUp />}</span>
        {filter && <NavbarFilter />}
      </div> */}
        <input
          className='search'
          onChange={(e) => { setULocation(e.target.value) }}
          placeholder='Search Location'
        />

        <button className='search-icon' onClick={handleSearch} ><FaSearch /></button>



      </div>

      <div className='user flexbox' onClick={() => setShowMenu(prev => !prev)}>
        <span className='logo-title'>{name ? "" : "User"}</span>
        <RiArrowDropDownLine className='icon down-icon' />

        {showMenu && (
          <div className="dropdown-menu">
            <p onClick={handleProfile}>My Profile</p>
            <p onClick={handleLogout}>Logout</p>
          </div>
        )}
      </div>



    </div>
  </>
  )
}

export default Navbar