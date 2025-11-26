import React, { useEffect, useState } from 'react'
import EditPropertyModal from './EditPropertyModal';
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentProperty } from '../../redux/features/propertySlice';
import PropertyCard from '../Client/PropertyCard';
import './AgentAddProp.css'
const AgentAddProp = () => {

    //redux
    const dispatch = useDispatch();
    const { currentProperty, propertyList } = useSelector((state) => state.properties);
    const [latestProperty, setLatestProperty] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(true);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [property, setProperty] = useState({
        name: "",
        details: "",
        location: null,
        price: null,
        size: null,
        bedrooms: null,
    });


    const handleSave = (updatedData) => {
        setProperty(updatedData);
        console.log("updated data ", updatedData);
        if (currentProperty) {
            setLatestProperty(currentProperty); // 👈 overwrite existing data
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        dispatch(clearCurrentProperty())
        console.log("Current List ", propertyList);
    }, [])
    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Add New Properties</h2>
            {!isModalOpen && (
                <button className='add-btn' onClick={() => setIsModalOpen(true)}>➕ Add New Property </button>
            )}



            {isModalOpen && <EditPropertyModal
                title={"Add New Property"}
                isOpen={isModalOpen}
                onClose={closeModal}
                initialData={""}
                onSave={handleSave}
                isEdit={false}

            />}

            {latestProperty && (
                <div className="property-card">
                    <h3 className="property-title">{latestProperty.name}</h3>
                    <p className="property-info"><strong>Location:</strong> {latestProperty.location}</p>
                    <p className="property-info"><strong>Price:</strong> ₹{latestProperty.price}</p>
                    <p className="property-info"><strong>Bedrooms:</strong> {latestProperty.bedrooms}</p>
                    <p className="property-info"><strong>Size:</strong> {latestProperty.size} sq.ft</p>
                    <p className="property-info"><strong>Details:</strong> {latestProperty.details}</p>

                   
                </div>
            )}


        </div>
    )
}

export default AgentAddProp