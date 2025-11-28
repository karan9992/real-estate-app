import { useEffect } from 'react'
import './App.css'
import Routing from './Routing'
import { setName, setPropertiesInterested, setId, setRole, clearUser } from "./redux/features/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCurrentProperty, setPropertyList } from './redux/features/propertySlice';


function App() {
  const dispatch = useDispatch()
  const { currentProperty, propertyList } = useSelector((state) => state.properties);


  useEffect(() => {
    //console.log("Cookie:", document.cookie)
    if (document.cookie) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify`, { withCredentials: true })
        .then(res => {
         // console.log(res);
          dispatch(setName(res.data.user.name));
          dispatch(setRole(res.data.user.role));
          dispatch(setId(res.data.user._id));

        })
        .catch(() => {
          dispatch(clearUser());
        });
    }
    else {
      axios.post(`${import.meta.env.VITE_API_URL}/api/client/properties`,{}, { withCredentials: true })
        .then(res => {
          //console.log(res);
          dispatch(setPropertyList(res.data))
         
        })
        .catch((err) => {
         console.log(err);
        });
    }
  }, [])

  return (
    <>
      <div>
        <Routing />
      </div>
    </>
  )
}

export default App
