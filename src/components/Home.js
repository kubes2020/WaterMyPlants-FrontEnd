import React from "react";
import { Link } from "react-router-dom";
import "../style/home.css";
import logo from '../assets/plants1.jpg';


export const Home = () => {


    return(
        <>
        <div class="top-header">
        <h1 class="homeheader">Make It <span class="rain">Rain.</span></h1>
        </div>
        <div class="containerhome">
        <img src={logo} alt=""></img>
        <p class="homeheaderparagraph">
            <div class="paratitle">Reminding you to water, one flower at a time
            </div>With how easy it is to be distracted in this digitalized world, forgetting to water you plants is commonplace. Our features allow you to add all of your plants to the website including the plant species, nickname, and watering frequency. You can even add a picture of your plants to see your babies grow. We guarantee that you will not let another day pass without watering your plants! 
        </p>
        </div>
        
        </>
    )
}