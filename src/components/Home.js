import React from "react";
import "../style/home.css";
import { Link } from "react-router-dom";
import plantPic from "../assets/fullPlants.jpeg";
import rainforest from "../assets/rainforest.jpg";
import rexPlant from "../assets/rexBegonia.jpg";
import spiderPlant from "../assets/spiderPlant.jpeg";
import aglaonemaPlant from "../assets/aglaonema.jpeg";
import styled from "styled-components";

export const Home = () => {
    const handleSample = () => {
        alert("This is a sample, please log in.");
    };
    return (
        <>
            <div className="top-header">
                <h1 className="homeheader">
                    Water My <span className="rain">Plants</span>
                </h1>
            </div>
            <div className="main-home-container">
                <div className="home-image">
                    <img src={rainforest} alt="plants"></img>
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
                <h2 className="bullet-point">Keep track of:</h2>
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
            <div className="examples-main-container">
                <div className="examples-container">
                    <div className="lg-card-container">
                        <div className="card-container">
                            <div className="card-text">
                                <h4>Nickname: Spider Plant</h4>
                                <h4>Species: C. comosum</h4>
                                <h4>Water Per Month: 4</h4>
                            </div>
                            <div className="image-container">
                                <img src={spiderPlant} alt="Spider Plant"></img>
                            </div>
                            <button
                                className="edit-button"
                                onClick={handleSample}
                            >
                                Edit
                            </button>
                        </div>
                        <h5 className="sample">Sample</h5>
                    </div>
                    <div className="lg-card-container">
                        <div className="card-container">
                            <div className="card-text">
                                <h4>Nickname: Aglaonema</h4>
                                <h4>Species: Brevispathum</h4>
                                <h4>Water Per Month: 3</h4>
                            </div>
                            <div className="image-container">
                                <img
                                    src={aglaonemaPlant}
                                    alt="Spider Plant"
                                ></img>
                            </div>
                            <button
                                className="edit-button"
                                onClick={handleSample}
                            >
                                Edit
                            </button>
                        </div>
                        <h5 className="sample">Sample</h5>
                    </div>
                    <div className="lg-card-container">
                        <div className="card-container">
                            <div className="card-text">
                                <h4>Nickname: Rex Begonia</h4>
                                <h4>Species: B. rex</h4>
                                <h4>Water Per Month: 2</h4>
                            </div>
                            <div className="image-container">
                                <img
                                    src={rexPlant}
                                    alt="Rex Begonia Plant"
                                ></img>
                            </div>
                            <button
                                className="edit-button"
                                onClick={handleSample}
                            >
                                Edit
                            </button>
                        </div>
                        <h5 className="sample">Sample</h5>
                    </div>
                </div>
                <div className="sample-talk">
                    <h5>Keep your plants healthy and hydrated</h5>
                    <h5 className="get-started" id="bot-home-link">
                        Sign up <Link to="/signup">now</Link>
                    </h5>
                </div>
            </div>
        </>
    );
};
