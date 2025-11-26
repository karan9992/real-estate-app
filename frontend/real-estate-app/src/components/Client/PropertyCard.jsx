import axios from "axios";
import bedroomImg from "../../assets/images/blog-28.png"
import './PropertyCard.css'
const PropertyCard = ({ name, details, location, price, bedrooms, _id, btnName, btnFunction, btnDelete, deleteFunction }) => {

    const delFunct = () => {
        console.log("delete:", name,_id);
        axios.delete(`${import.meta.env.REACT_APP_API_URL}/api/agent/properties/${_id}`, { withCredentials: true })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
    return (
        <div className="client-card">
            <div className="left-section">
                <img
                    src={bedroomImg}
                    alt="property"
                    className="property-img"
                />
            </div>

            <div className="middle-section">
                <div className="title-row">

                    <h2 className="title">{name}</h2>
                    <span className="location">{location?.toUpperCase()}</span>
                </div>

                <p>Bedrooms - {bedrooms}</p>
                <p>Price - {price}</p>
                <button className="interest-btn" onClick={btnFunction}>{btnName}</button>

                {btnDelete && (
                    <button className="delete-btn" onClick={delFunct}>
                        Delete
                    </button>
                )}
            </div>

        </div>
    )
}

export default PropertyCard