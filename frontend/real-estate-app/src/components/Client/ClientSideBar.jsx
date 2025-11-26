import React, { useState } from "react";
import "./ClientSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearFilter } from "../../redux/features/userSlice";
import { setCurrentProperty, setPropertyList } from '../../redux/features/propertySlice';

import axios from "axios";


const ClientSidebar = ({ onFilter }) => {

    //redux
    const filter = useSelector((state) => state.user.filter)
    const location = useSelector((state) => state.user.location)
    const dispatch = useDispatch()



    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [selectedBedrooms, setSelectedBedrooms] = useState([]);

    const handleBedroomChange = (value) => {
        if (selectedBedrooms.includes(value)) {
            // remove if exists
            setSelectedBedrooms(selectedBedrooms.filter((item) => item !== value));
        } else {
            // add if not selected
            setSelectedBedrooms([...selectedBedrooms, value]);
        }
    };

    const handleFilter = () => {

        dispatch(setFilter({
            bedrooms: selectedBedrooms,
            minPrice,
            maxPrice
        }))


        console.log("search :",  location,maxPrice,minPrice,selectedBedrooms)
      

        axios.post(`${process.env.REACT_APP_API_URL}/api/client/properties`, { location,maxPrice,minPrice,bedrooms:selectedBedrooms },
        {withCredentials:true})
            .then((res) => {
                console.log(res.data);
                dispatch(setPropertyList(res.data))

            })
            .catch((err) => console.error(err))
    };

    const handleReset = () => {
        setSelectedBedrooms([]);
        setMinPrice("");
        setMaxPrice("");

        // dispatch(setFilter({
        //    bedrooms:[],
        //     minPrice: null,
        //     maxPrice: null
        // }))
        dispatch(clearFilter())

    };

    return (
        <div className="client-sidebar">

            <div className="user-side">User</div>
            <h3>Filter Properties</h3>

            {/* Bedrooms Filter */}
            <div className="filter-group">
                <label>Bedrooms</label>
                <div className="checkbox-group">
                    {["1", "2", "3", "4",'5'].map((item) => (
                        <label key={item} className="checkbox-label">
                            <input
                                type="checkbox"
                                value={item}
                                checked={selectedBedrooms.includes(item)}
                                onChange={() => handleBedroomChange(item)}
                            />
                            {item} BHK
                        </label>
                    ))}
                </div>
            </div>

            <div className="filter-group">
                <label>Min Price</label>
                <input
                    type="number"
                    placeholder="₹ Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
            </div>

            <div className="filter-group">
                <label>Max Price</label>
                <input
                    type="number"
                    placeholder="₹ Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
            </div>

            <div className="filter-buttons">
                <button onClick={handleFilter} className="apply-btn">Apply</button>
                <button onClick={handleReset} className="reset-btn">Reset</button>
            </div>
        </div>
    );
};

export default ClientSidebar;
