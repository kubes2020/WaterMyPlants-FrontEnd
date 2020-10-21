import React, { useState, useContext } from 'react'
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Link, useHistory } from "react-router-dom";
import EditPlant from "./EditPlant";
import { PrivateRoute } from "./PrivateRoute";
import styled from 'styled-components'
import {PlantContext} from "./contexts/PlantContext";



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
        // console.log("plantId from App state", plantId)

    }
    

    return(
        <>
        {/* <PrivateRoute exact path="/editplant" component={EditPlant}></PrivateRoute> */}

        <h2>Click Below To See Your Family Of Plants</h2>
            <button onClick={()=> fetchPlants()}>Click Me!</button> 

        {fetchedPlants.map(plant => (
            <div className="plant-card">
                <h3>Nickname: {plant.nickname}</h3>
                <h3>Species: {plant.species}</h3>
                <h3>Water Per Week {plant.h2o_frequency} time(s)</h3>
                <button onClick={()=> handleEdit(plant)}>Edit</button>
                {/* <PrivateRoute exact path="/editplant" render={(props) => <EditPlant {...props} plant={plant} />} /> */}
                
                <div className="plant-card-img">
                    <img src={plant.image_url} alt={plant.nickname}></img>
                </div><br/>
            </div>  
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










