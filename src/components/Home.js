import React from "react";
import "../style/home.css";
import { Link } from "react-router-dom";
import plantPic from "../assets/fullPlants.jpeg";

export const Home = () => {
  return (
    <>
      <div className="top-header">
        <h1 className="homeheader">
          Water My <span className="rain">Plants</span>
        </h1>
      </div>
      <div className="main-home-container">
        <div className="home-image">
          <img src={plantPic} alt="plants"></img>
        </div>
        <div className="left-half">
          <h3>Every plant has a unique thirst</h3>
        </div>

        <div className="right-half">
          <p className="get-started">
            <Link to="/signup">
              <b>Get Started</b>
            </Link>
          </p>
        </div>
      </div>
      <div className="lower-home-container">
        <h2 className="app-description">
          Keep track of - species name, nickname, watering frequency
        </h2>
      </div>
    </>
  );
};
