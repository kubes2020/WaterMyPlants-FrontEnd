import React, { useState, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { PlantContext } from "./contexts/PlantContext";

//styled components
const MainContainer = styled.div`
  padding-bottom: 20px;
`;

const MainCardContainer = styled.div`
  width: 70%;
  height: 70%;
  text-align: center;
  margin: 2% auto;
  font-family: Raleway;
  padding: 0.5% 0 2% 0;
  border-radius: 10px;
  font-size: 2.7rem;
  background-color: rgb(233, 240, 233);
  box-shadow: 1px 1px 4px;
  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;
const CardImageDiv = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  width: 80%;
  height: 50%;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  box-shadow: 2px 2px 2px black;
`;
const DivText = styled.div`
  font-size: 1.7rem;
  font-family: Raleway;
  padding: 4% 1%;
  color: rgb(0, 0, 0, 0.9);
  background: rgb(2, 0, 36);
  background: linear-gradient(
    0deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(29, 120, 244, 0.938813025210084) 0%,
    rgba(136, 205, 240, 1) 45%
  );
  text-shadow: 1px 1px 1px;
`;
const Button = styled.button`
  font-size: 1.5rem;
  color: #be1f1f;
  border: none;
  padding: 0.5%;
  border-radius: 8px;
  margin: 30px 0;
  &:hover {
    background-color: #be1f1f;
    color: white;
    transition: 0.2s ease-in-out;
  }
`;
const EditButton = styled.button`
  font-size: 1.5rem;
  color: white;
  border-radius: 10px;
  background: #81a99d;
  border: none;
  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;
const OoopsButton = styled.button`
  font-size: 1.5rem;
  font-family: Raleway;
  color: white;
  border-radius: 10px;
  background: #95dc12;
  border: none;
  margin-top: 15px;
  padding: 8px 12px;
  &:hover {
    background: yellow;
    color: green;
  }
  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

export default function PlantCard(props) {
  const { plantId, setPlantId } = useContext(PlantContext);
  const history = useHistory();
  const [noPlantAvail, setNoPlantAvail] = useState(false);
  const [fetchedPlants, setFetchedPlants] = useState([]);

  const fetchPlants = () => {
    console.log("fetchPlants activated get");
    setFetchedPlants([]);
    const userId = localStorage.getItem("id");
    axiosWithAuth()
      .get(`/plants/user/${userId}`)
      .then((res) => {
        console.log("res from fetchPlants", res.data);
        setFetchedPlants(res.data);
        if (res.data.length < 1) {
          console.log("empty");
          setNoPlantAvail(true);
        } else {
          console.log("full");
        }
      })
      .catch((err) => {
        console.log("error from fetchPlants", err);
      });
  };

  const handleEdit = (props) => {
    console.log("handleEdit props.id", props.id);
    setPlantId(props.id);
    history.push("/editplant");
  };

  return (
    <>
      <MainContainer>
        <DivText>Click Below To See Your Family Of Plants </DivText>
        <Button onClick={() => fetchPlants()}>Click Me!</Button> <br />
        {noPlantAvail ? (
          <Link to="/addplants">
            <OoopsButton>Ooops, click here to add a plant</OoopsButton>
          </Link>
        ) : null}
        {fetchedPlants.map((plant) => (
          <MainCardContainer className="plant-card" key={plant.id}>
            <h4>Nickname: {plant.nickname}</h4>
            <h4>Species: {plant.species}</h4>
            <h4>Water Per Month: {plant.h2o_frequency} time(s)</h4>
            <CardImageDiv className="plant-card-img">
              <Image src={plant.image_url} alt={plant.nickname}></Image>
            </CardImageDiv>
            <EditButton onClick={() => handleEdit(plant)}>Edit</EditButton>
          </MainCardContainer>
        ))}
      </MainContainer>
    </>
  );
}
