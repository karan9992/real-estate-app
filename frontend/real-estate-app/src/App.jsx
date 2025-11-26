import { useEffect } from 'react'
import './App.css'
import Routing from './Routing'
import { setName,  setPropertiesInterested, setId, setRole,clearUser} from "./redux/features/userSlice";
import { useDispatch } from 'react-redux';
import axios from 'axios';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`${import.meta.env.REACT_APP_API_URL}/api/auth/verify`, { withCredentials: true })
      .then(res => {
        console.log(res);
        dispatch(setName(res.data.user.name));
        dispatch(setRole(res.data.user.role));
        dispatch(setId(res.data.user._id));
       
      })
      .catch(() => {
        dispatch(clearUser());
      });
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
