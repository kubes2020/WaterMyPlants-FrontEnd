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
          <div className="bottom-right-abs">
            <p className="get-started">
              <Link to="/signup">
                <b>Get Started</b>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="lower-home-container">
        <h2 className="bullet-point">Keep track of</h2>
        <div className="three-things-container">
          <h2 className="three-things">
            <span className="circle-num">1</span> Species Name
          </h2>
          <h2 className="three-things">
            <span className="circle-num">2</span> Nickname
          </h2>
          <h2 className="three-things">
            <span className="circle-num">3</span> Watering Frequency
          </h2>
        </div>
      </div>
    </>
  );
};
