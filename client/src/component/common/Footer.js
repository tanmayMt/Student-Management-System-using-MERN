import React, { useState, useEffect } from "react";
import "./footer.css";
import nodejsBanner from "./nodejs-banner.png"; // Replace with the actual path to your banner image
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  // State to manage date and time
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format date and time
  const formattedDate = currentTime.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="https://github.com/tanmayMt/Let-s_Learn_NodeJS_ExpressJS">
          <img src={nodejsBanner} alt="Node.js Banner" className="banner-image" />
        </Link>
        {/* Display current date and time */}
        <div className="datetime-container">
          <p className="date-text">
            📅 <span className="date-highlight">{formattedDate}</span>
          </p>
          <p className="time-text">
            ⏰ <span className="time-highlight">{formattedTime}</span>
          </p>
        </div>
      </div>
      <div>
        <p className="copyright-text">
          © {currentYear} <u>Tanmay Samanta</u>. All rights reserved.
        </p>
      </div>
      
    </footer>
  );
};

export default Footer;
