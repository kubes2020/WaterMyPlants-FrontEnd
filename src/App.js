import React, { useState } from 'react';
import { Home } from "./components/Home";
import { Route, Link } from 'react-router-dom';
import { AddPlants } from "./components/AddPlants";
import { PrivateRoute } from "./components/PrivateRoute";
import { Login } from "./components/Login";
import { PlantCard } from "./components/PlantCard";
import styled from 'styled-components';

import SignUp from './components/SignUp';
import './App.css';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link><br/>
        
        <Link to="/plantcard">View My Plants</Link><br/>

        <Link to="/signup">Signup</Link><br/>
        <Link to="/login">Login</Link><br/>
        <Link to="/" onClick={()=> localStorage.clear()}>Logout</Link>
        </nav>
      <Route exact path="/" component={Home}></Route>
      <PrivateRoute exact path="/login" component={Login}/>
      <Route exact path="/signup" component={SignUp}></Route>
      <PrivateRoute exact path="/addplants" component={AddPlants}/>
      <PrivateRoute exact path="/plantcard" component={PlantCard}/>
    </div>
  );
}

export default App;
