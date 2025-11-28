import axios from "axios";
import bedroomImg from "../../assets/images/blog-28.png"
import './PropertyCard.css'
import { setCurrentProperty, setPropertyList } from '../../redux/features/propertySlice';
import { useDispatch } from "react-redux";
import { toast,Slide, ToastContainer } from "react-toastify";



const PropertyCard = ({ name, details, location, price, bedrooms, _id, btnName, btnFunction, btnDelete, deleteFunction }) => {

    const dispatch = useDispatch()


    const delFunct = () => {
        console.log("delete:", name, _id);
        axios.delete(`${import.meta.env.VITE_API_URL}/api/agent/properties/${_id}`, { withCredentials: true })
            .then((res) => {
                // console.log(res);
                toast.success("Property deleted Successfully")
                dispatch(setPropertyList(res.data.properties))

            }
            )
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

                <div className="btn-section-prop">
                    <button className="interest-btn" onClick={btnFunction}>{btnName}</button>

                    {btnDelete && (
                        <button className="delete-btn" onClick={delFunct}>
                            Delete
                        </button>
                    )}
                </div>
            </div>
          
        </div>
        
    )
}

export default PropertyCard