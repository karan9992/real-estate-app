import React, { useEffect, useState } from "react";
import "./EditPropertyModal.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCurrentProperty } from "../../redux/features/propertySlice";

const EditPropertyModal = ({ isOpen, onClose, initialData, onSave, title, isEdit }) => {

  //Redux
  const { currentProperty, propertyList } = useSelector((state) => state.properties);
  const dispatch = useDispatch()
  const id = useSelector((state) => state.user.id)
  // const tempId = "692084ffab932748e20466cc";


  //State
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    dispatch(setCurrentProperty({
      ...currentProperty,
      [e.target.name]: e.target.value,
    }));

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);

    const { name, location, price, size, bedrooms, details } = currentProperty;

    const updatedData = {
      name,
      location,
      price,
      size,
      bedrooms,
      details,
      listedBy: id     //  get current agents id
    };

    if (isEdit) {
      console.log("current-edit ", currentProperty);

      //api to edit properties

      axios.put(`${import.meta.env.REACT_APP_API_URL}/api/agent/properties/${currentProperty._id}`, updatedData, {
                withCredentials: true
            })
        .then((res) => {
          console.log(res);

        })
        .catch((err) => console.error(err))

    } else {
      console.log("current-add ", currentProperty, updatedData);

      //api to add new property
      axios.post(`${import.meta.env.REACT_APP_API_URL}/api/agent/add`, updatedData, {
                withCredentials: true
            })
        .then((res) => {
          console.log(res);

        })
        .catch((err) => console.error(err))



    }

    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);


  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input type="text" name="name" value={currentProperty?.name || ""} onChange={handleChange} placeholder="Property Name" required />

          <textarea name="details" value={currentProperty?.details || ""} onChange={handleChange} placeholder="Property Details" required></textarea>

          <input type="text" name="location" value={currentProperty?.location || ""} onChange={handleChange} placeholder="Location" required />

          <input type="number" name="price" value={currentProperty?.price || ""} onChange={handleChange} placeholder="Price" required />

          <input type="text" name="size" value={currentProperty?.size || ""} onChange={handleChange} placeholder="Size (sqft)" required />

          <input type="number" name="bedrooms" value={currentProperty?.bedrooms || ""} onChange={handleChange} placeholder="Bedrooms" required />

          <div className="modal-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPropertyModal;
