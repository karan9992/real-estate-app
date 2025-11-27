import React, { useEffect } from "react";
import "./NewlyAdded.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentProperty, setPropertyList } from "../../redux/features/propertySlice";
import bedroomImg from "../../assets/images/bldg1.webp"




const NewlyAdded = () => {
    const dispatch = useDispatch()
    const { currentProperty, propertyList } = useSelector((state) => state.properties);
    const baseUrl = import.meta.env.VITE_API_URL

    useEffect(() => {
        if (propertyList.length === 0) {
            console.log(import.meta.env.VITE_API_URL);
            if (document.cookie) {
                axios.post(`${import.meta.env.VITE_API_URL}/api/client/properties`, {}, { withCredentials: true }
                )
                    .then((res) => {
                        console.log(res.data);
                        dispatch(setPropertyList(res.data))
                        // setPropArray(res.data)
                    })
                    .catch((err) => console.error(err))
            }
        }

    }, [])

    const properties = [
        {
            name: "3 BHK Independent House",
            bhk: 3,
            location: "Freedom fighter enclave, Delhi",
            price: 65,
            image: "https://example.com/house1.jpg",
        },
        {
            name: "2 BHK Independent House",
            bhk: 2,
            location: "Saket, New Delhi",
            price: 40,
            image: "https://example.com/house2.jpg",
        }, {
            name: "3 BHK Independent House",
            bhk: 3,
            location: "Freedom fighter enclave, Delhi",
            price: 65,
            image: "https://example.com/house1.jpg",
        },
        {
            name: "2 BHK Independent House",
            bhk: 2,
            location: "Saket, New Delhi",
            price: 40,
            image: "https://example.com/house2.jpg",
        },
    ];


    return (
        <section className="newly-added">
            <h2>Newly-added properties</h2>
            <p>Fresh listings to check out</p>

            <div className="card-row">
                {propertyList.map((prop, index) => (
                    <div className="property-card" key={index}>
                        <img src={bedroomImg} alt={prop.name} />
                        <h3>{prop.name}</h3>
                        <p>{prop.bedrooms} BHK</p>
                        <p className="location">{prop.location}</p>
                        <p className="price">₹{prop.price} </p>
                        {/* <button className="contact-btn">Contact</button> */}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NewlyAdded;
