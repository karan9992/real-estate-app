import React, { useEffect, useState } from 'react'
import PropertyCard from '../Client/PropertyCard'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import EditPropertyModal from './EditPropertyModal'
import { setCurrentProperty, setPropertyList } from '../../redux/features/propertySlice';
import './AgentMyProp.css'

const AgentMyProp = () => {

    const dispatch = useDispatch();
    const { currentProperty, propertyList } = useSelector((state) => state.properties);
    const id = useSelector((state) => state.user.id);

    // const [propArray, setPropArray] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [property, setProperty] = useState({
    //     name: "",
    //     details: "",
    //     location: "",
    //     price: 0,
    //     size: 0,
    //     bedrooms: 0,
    // });

    const handleSave = (updatedData) => {
        //setProperty(updatedData);
        console.log(updatedData);
    };
    const handleToggle = (prop) => {
        setIsModalOpen(prev => !prev)
        console.log(prop);

        dispatch(setCurrentProperty(prop))

    }

    useEffect(() => {

        if (propertyList.length < 1) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/agent/properties/${id}`, {
                withCredentials: true
            })
                .then((res) => {
                    console.log(res.data.properties);
                    //setPropArray(res.data.properties)
                    dispatch(setPropertyList(res.data.properties))
                })
                .catch((err) => console.error(err))
        }
    }, [])


    return (
        <div className='main-container'>
            <div className='card-container'>

                {propertyList.length > 0 ? (
                    propertyList.map((prop) => {
                        return <PropertyCard key={prop._id} btnName={"Edit"} btnFunction={() => handleToggle(prop)} btnDelete={true}  {...prop} />;
                    })
                ) : (
                    <p>Loading properties...</p>
                )}
            </div>
            <EditPropertyModal
                isOpen={isModalOpen}
                title={"Edit"}
                onClose={() => setIsModalOpen(false)}
                initialData={true}
                onSave={handleSave}
                isEdit={true} />

        </div>
    )
}

export default AgentMyProp