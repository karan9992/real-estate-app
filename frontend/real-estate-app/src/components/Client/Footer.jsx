import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
                <div className="container">

                    <div className="footer-top">


                        <div className="footer-links">
                            <h3>Company</h3>
                            <a href="#">About Us</a>
                            <a href="#">Careers</a>
                            <a href="#">Agents</a>
                            <a href="#">Blog</a>
                        </div>



                        <div className="footer-links">
                            <h3>Support</h3>
                            <a href="#">Contact Us</a>
                            <a href="#">FAQs</a>
                            <a href="#">Terms & Conditions</a>
                            <a href="#">Privacy Policy</a>
                        </div>

                        <div className="footer-contact">
                            <h3>Contact Us</h3>
                            <p>📍 Bhumiraj, Navi Mumbai, MH</p>
                            <p>📞 +91 9699459665</p>
                            <p>📧 kbsestate@gmail.com</p>
                        </div>
                    </div>





                    <div className="footer-bottom">
                        © 2025 KB Estates. All Rights Reserved.
                    </div>

                </div>
            </footer>
  )
}

export default Footer