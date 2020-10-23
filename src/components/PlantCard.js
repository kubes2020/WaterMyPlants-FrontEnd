import React, { useState, useContext } from 'react'
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, Link } from "react-router-dom";
import styled from 'styled-components'
import {PlantContext} from "./contexts/PlantContext";

//styled components
const MainCardContainer = styled.div`
    width: 70%;
    height: 70%;
    text-align: center;
    margin: 2% auto;
    font-family: Raleway;
    padding: .5% 0 2% 0;
    border-radius: 10px;
    font-size: 2.7rem;
    background: white;
    @media (max-width: 400px){
    font-size: 1.2rem;
  }
`
const CardImageDiv = styled.div`
    margin: 0 auto;
    box-sizing: border-box;
    width: 80%;
    height: 50%;
`
const Image = styled.img`
    width: 100%;
    height: auto;
    box-shadow: 2px 2px 2px black;

`
const DivText = styled.div`
    font-size: 2rem;
    font-family: "Source Sans Pro", Helvetica, sans-serif;
    padding: 2% 1%;
`
const Button = styled.button`
    font-size: 1.5rem;
    color: #BE1F1F;
    border: none;
    border-radius: 10px;
    margin: 30px 0;
`
const EditButton = styled.button`
    font-size: 1.5rem;
    color: white;
    border-radius: 10px;
    background: #81A99D;
    border: none;
    @media (max-width: 400px){
    font-size: 1rem;
  }
`
const OoopsButton = styled.button`
    font-size: 1.5rem;
    font-family: Raleway;
    color: white;
    border-radius: 10px;
    background: #95DC12;
    border: none;
    margin-top: 15px;
    padding: 8px 12px;
    &:hover {
        background: yellow;
        color: green;
    }
    @media (max-width: 400px){
    font-size: 1rem;
  }
`


export default function PlantCard(props) {
    const { plantId, setPlantId } = useContext(PlantContext)
    const history = useHistory()
    const [noPlantAvail, setNoPlantAvail] = useState(false)
    const [fetchedPlants, setFetchedPlants] = useState([])

    const fetchPlants = () => {
        console.log("fetchPlants activated get")
        setFetchedPlants([])
        const userId = localStorage.getItem('id')
        axiosWithAuth().get(`/plants/user/${userId}`)
        .then(res => {
            console.log('res from fetchPlants', res.data)
            setFetchedPlants(res.data)
            if(res.data.length < 1){
                console.log("empty")
                setNoPlantAvail(true)
            } else {
                console.log("full")
            }
        })
        .catch(err => {
            console.log("error from fetchPlants", err)
        })
    }

    const handleEdit = (props) => {
        console.log("handleEdit props.id", props.id)
        setPlantId(props.id)
        history.push("/editplant")
    }
    
    return(
        <>
        <DivText>Click Below To See Your Family Of Plants </DivText> 
            <Button onClick={()=> fetchPlants()}>Click Me!</Button> <br/>
            {noPlantAvail ? <Link to="/addplants"><OoopsButton>Ooops, click here to add a plant</OoopsButton></Link> : null}

        {fetchedPlants.map(plant => (
                <MainCardContainer className="plant-card" key={plant.id}>
                    <h4>Nickname: {plant.nickname}</h4>
                    <h4>Species: {plant.species}</h4>
                    <h4>Water Per Week: {plant.h2o_frequency} time(s)</h4> 
                    <CardImageDiv className="plant-card-img">
                        <Image src={plant.image_url} alt={plant.nickname}></Image>
                    </CardImageDiv>
                    <EditButton onClick={()=> handleEdit(plant)}>Edit</EditButton>
                </MainCardContainer>  
        ))}
        </>
    )
}











