import React, { useEffect, useState } from "react";
import "./Clients.css";
import PropertyCard from "../../components/Client/PropertyCard";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/userSlice";
import Footer from "../../components/Client/Footer";
import axios from 'axios'
import AgentSidebar from "../../components/Agent/AgentSidebar";
import { setCurrentProperty, setPropertyList } from '../../redux/features/propertySlice';
import ClientSidebar from "../../components/Client/ClientSideBar";
import { toast, ToastContainer , Slide} from "react-toastify";

const Client = () => {

  //redux
  const { currentProperty, propertyList } = useSelector((state) => state.properties);
  const name = useSelector((state) => state.user.name);
  const id = useSelector((state) => state.user.id);
  const dispatch = useDispatch()
  const [propArray, setPropArray] = useState([])

  const funcInterest = (prop) => {
    console.log("Interestd :", prop);

    //api to add to interested
    axios.post(`${import.meta.env.REACT_APP_API_URL}/api/client/properties/interested`, {
      clientId: id,
      propertyId: prop._id }, 
      { withCredentials: true })
      .then((res) => {
        console.log(res);
        toast.success(`${prop.name} added to interested`)

      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
   if(propertyList.length === 0 ){
      axios.post(`${import.meta.env.REACT_APP_API_URL}/api/client/properties`, {}, { withCredentials: true }
    )
      .then((res) => {
        console.log(res.data);
        dispatch(setPropertyList(res.data))
        // setPropArray(res.data)
      })
      .catch((err) => console.error(err))
    }
   
  }, [])

  return (<>
    <div className="main-container">
      <div className="sidebar">
        <ClientSidebar />
      </div>


      <div className="main">
        <div className="card-container">

          {propertyList.length === 0 ? <p style={{fontSize:50}}>No Property found</p>   
                 :
            propertyList.map((property) => {
              return <PropertyCard key={property._id} btnName={"Interested"} btnFunction={() => funcInterest(property)} {...property} />
            }) 
            
          }

       


        </div>
      </div>
    </div>
     <Footer />
      <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Slide} />
  </>
  );
};

export default Client;
