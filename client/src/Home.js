import React from 'react';
import './home.css';
import studentImge from './studentImge.png';
const Home = () => {
  return (
    <div className="title-container">
      <h1 className="home-title">
        <span className="animated-text">Your Campus, Your Community</span>
      </h1>
      <img src={studentImge} alt="Student Imge" className="image-after-title" />
    </div>
  );
};

export default Home;