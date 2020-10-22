import React, { useState, useContext } from 'react'
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import {PlantContext} from "./contexts/PlantContext";

const DivContainer = styled.div`
    
`

const MainCardContainer = styled.div`
    /* box-sizing: border-box; */
    /* border: 3px solid red; */
    width: 90%;
    height: 90%;
    text-align: center;
    margin: 2% auto;
    font-family: Raleway;
    padding: .5% 0 2% 0;
    border-radius: 10px;
    font-size: 3rem;
    background: white;
    line-height: 1px;
`
const CardImageDiv = styled.div`
    margin: 0 auto;
    box-sizing: border-box;
    width: 90%;
    height: 60%;
    /* border: 4px solid green; */
`
const Image = styled.img`
    width: 100%;
    height: auto;
    box-shadow: 2px 2px 2px black;

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
        <h2>Click Below To See Your Family Of Plants</h2>
            <button onClick={()=> fetchPlants()}>Click Me!</button> 

        {fetchedPlants.map(plant => (
            <DivContainer>
                <MainCardContainer className="plant-card">
                    <h4>Nickname: {plant.nickname}</h4>
                    <h4>Species: {plant.species}</h4>
                    <h4>Water Per Week: {plant.h2o_frequency} time(s)</h4>
                    <button onClick={()=> handleEdit(plant)}>Edit</button>
                    
                    <CardImageDiv className="plant-card-img">
                        <Image src={plant.image_url} alt={plant.nickname}></Image>
                    </CardImageDiv><br/>
                </MainCardContainer> 
            </DivContainer> 
        ))}
        </>
    )
}



// import React from 'react'
// import styled from 'styled-components'
// const Card = styled.div
// export default function PlantCard(props) {
//     return (
//       <Card>
//         <PlantName>{props.name}</PlantName>
//         <FlexContainer>
//           <Info>
//             <SpeciesName>{props.species}</SpeciesName>
//             <Species>Species</Species>
//           </Info>
//           <Info>
//             <ScheduleTiming>{props.schedule}</ScheduleTiming>
//             <Schedule>Watering schedule</Schedule>
//           </Info>
//           <Info>
//             <Button
//               value={props.value}
//               onClick={props.handleDelete}
//               className="da-trash"
//             ></Button>
//           </Info>
//         </FlexContainer>
//       </Card>
//     );
//   }










