import React from "react";
import "../style/home.css";
import logo from '../assets/plants1.jpg';


export const Home = () => {


    return(
        <>
        <div className="top-header">
        <h1 className="homeheader">Make It <span className="rain">Rain.</span></h1>
        </div>
        <div className="main-home-container">
            <div className="home-left">
                <img src={logo} alt=""></img>
            </div>

            <div className="home-right">
                <p className="paratitle">Just like humans, every plant is unique</p>
                <p>Some plants require water daily, some weekly, and some every third day. How do you keep this schedule straight? This is where the Water My Plants App comes in. Our features allow you to add important details of your plants including species, nickname, pictures and watering frequency.</p> 
            </div>

        </div>
        <div className="closing-words">       
        Water My Plants App will not only save you time but it will keep you and your plants happy! 
        </div>
        </>
    )
}

