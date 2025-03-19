import React from 'react';
import './footer.css';
import springBootBanner from './spring-boot-banner.png'; // Replace with the actual path to your banner image
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="https://github.com/tanmayMt/Student_Management_System_using_Spring_Boot">
         <img src={springBootBanner} alt="Spring Boot Banner" className="banner-image" />
        </Link>
      </div>
      <div>
        <p class="copyright-text">© 2025 <u>Tanmay Samanta</u>. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;