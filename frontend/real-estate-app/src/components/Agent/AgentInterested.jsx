import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './AgentInterested.css'
import { useSelector } from 'react-redux'



const AgentInterested = () => {
    const [data, setData] = useState()
    const id = useSelector((state) => state.user.id);



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/agent/interested/${id}`, {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data);
                setData(res.data)


            })
            .catch((err) => console.error(err))
    }, [])
    return (
        <div>
            <div>
                <div className='card-container'>

                    {data?.properties?.map((property) => (
                        <div key={property._id} className="property-group">
                            <h3>Name - {property.name}</h3>
                            <p>Location - {property.location}</p>
                            <p>Price - ₹{property.price}</p>

                            <h4>Interested Clients:</h4>
                            {property.clients.length > 0 ? (
                                <ul className="client-list">
                                    {property.clients.map((client) => (
                                        <li key={client._id} className="client-item">
                                            <strong>{client.name.toUpperCase()}</strong> — {client.email}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No interested clients yet.</p>
                            )}
                        </div>
                    ))}



                </div>

            </div>
        </div>
    )
}

export default AgentInterested