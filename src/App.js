
import React, { useState } from 'react';
import { Home } from "./components/Home";
import { Route, Link, useHistory } from 'react-router-dom';
import AddPlants from "./components/AddPlants";
import { PrivateRoute } from "./components/PrivateRoute";
import Login from "./components/Login";
import PlantCard from "./components/PlantCard";
import SignUp from './components/SignUp';
import EditPlant from "./components/EditPlant";
import {PlantContext} from "./components/contexts/PlantContext";
import Settings from "./components/Settings";
import styled from "styled-components";
import './App.css';



const MainNav = styled.nav`
  text-align: right;
  @media (max-width: 400px){
    text-align: center;
  }
`
const NavLink = styled(Link)`
  text-decoration: none;
  padding: .4% 0;
  color: #F8E30C;
  background: #81A99D;
  
  min-width: 150px;
  margin: .2%;
  font-size: 1.2rem;
  justify-content: center;
  border-radius: 5px;
  display: inline-flex;
  font-family: Raleway;
  &:hover {
    color: white;
    background-color: darkgreen;
    transition: all 0.5s ease-in-out;
  }
  @media (max-width: 400px){
    font-size: 1rem;
    flex-direction: column;
  }
  
`

function App() {
  const history = useHistory()
  const [plantId, setPlantId] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogOut = () =>{
    localStorage.clear()
    setIsLoggedIn(false)
    history.push("/")
  }

  return (
    <div className="App">

      <MainNav>      
        <NavLink to="/">Home</NavLink>     
        {isLoggedIn ? <NavLink to="/settings">User Settings</NavLink> : null}
        {isLoggedIn ? <NavLink to="/plantcard">View My Plants</NavLink> : null}
        {isLoggedIn ? <NavLink to="/addplants">Add Plants</NavLink> : null}
        {isLoggedIn ? null : <NavLink to="/login">Login</NavLink>}
        {isLoggedIn ? <NavLink to="/" onClick={ handleLogOut }>Logout</NavLink> : null}  
      </MainNav>
      <PlantContext.Provider value={{plantId, setPlantId}}>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/login" render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn}/>}></Route>
        <Route exact path="/signup" render={(props) => <SignUp {...props} setIsLoggedIn={setIsLoggedIn}/>}></Route>
        <PrivateRoute exact path="/addplants" component={AddPlants}/>
        <PrivateRoute exact path="/plantcard" component={PlantCard}/>
        <PrivateRoute exact path="/editplant" component={EditPlant}/>
        <PrivateRoute exact path="/settings" component={Settings}/>  
      </PlantContext.Provider>
    </div>
  );
}

export default App;
