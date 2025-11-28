import React, { useState } from "react";


const NavbarFilter = () => {
  const [minPrice, setMinPrice]= useState(0)
  const [maxPrice, setMaxPrice]= useState(0)
  const [bedrooms, setBedrooms]= useState(0)

  return (
    <div className="filterbox">
  {/* Price Filter */}
  <div className="filter-item">
    <label>Price</label>

    <div className="price-inputs">
      <input
        type="number"
        className="price-input"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        className="price-input"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
    </div>


    <span className="price-display">₹{minPrice} - ₹{maxPrice}</span>
  </div>

  {/* Bedroom Filter */}
  <div className="filter-item">
    <label>Bedrooms</label>
    <input
      type="range"
      className="slider"
      min="1"
      max="5"
      value={bedrooms}
      onChange={(e) => setBedrooms(e.target.value)}
    />
    <span>{bedrooms}</span>
  </div>

  <button className="filter-btn">Apply Filters</button>
</div>

  );
};

export default NavbarFilter;
