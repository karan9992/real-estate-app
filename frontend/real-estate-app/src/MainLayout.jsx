import React from 'react'
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Client/Footer';

const MainLayout = ({ children }) => {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      boxSizing: "border-box",
      backgroundColor: "white"
    }}>
      <div style={{
        position: "fixed",
        top: 0,
        zIndex: 1
      }}>
        <Navbar />
      </div>

      <div style={{
          flex: 1,
          marginTop: "8vh",  
         
                }}>
        {children}
      </div>

     
    </div>
  );
};

export default MainLayout;
