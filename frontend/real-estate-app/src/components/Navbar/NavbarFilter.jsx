import React from "react";


const NavbarFilter = () => {
  return (
    <div className="filterbox">
      <div className="filter-item">
        <label>price</label>
        <input type="range" className="slider" />
      </div>

      <div className="filter-item">
        <label>bedroom</label>
        <input type="range" className="slider" />
      </div>

      <button className="filter-btn">Button</button>
    </div>
  );
};

export default NavbarFilter;
