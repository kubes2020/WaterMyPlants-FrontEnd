import React, { useState, useContext } from 'react'
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import {PlantContext} from "./contexts/PlantContext";

//styled components
const MainCardContainer = styled.div`
    width: 90%;
    height: 90%;
    text-align: center;
    margin: 2% auto;
    font-family: Raleway;
    padding: .5% 0 2% 0;
    border-radius: 10px;
    font-size: 2.7rem;
    background: white;
`
const CardImageDiv = styled.div`
    margin: 0 auto;
    box-sizing: border-box;
    width: 90%;
    height: 60%;
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

`


export default function PlantCard(props) {
    const { plantId, setPlantId } = useContext(PlantContext)
    const history = useHistory()
    const [fetchedPlants, setFetchedPlants] = useState([])

    const fetchPlants = () => {
        console.log("fetchPlants activated get")
        const userId = localStorage.getItem('id')
        axiosWithAuth().get(`/plants/user/${userId}`)
        .then(res => {
            console.log('res from fetchPlants', res.data)
            setFetchedPlants(res.data)
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
        
            <Button onClick={()=> fetchPlants()}>Click Me!</Button> 
       

        {fetchedPlants.map(plant => (
                <MainCardContainer className="plant-card">
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











