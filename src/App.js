import React from 'react';
import { Home } from "./components/Home";
import { Route, Link } from 'react-router-dom';
import { AddPlants } from "./components/AddPlants";
import { PrivateRoute } from "./components/PrivateRoute";

import styled from 'styled-components';

import SignUp from './components/SignUp';
// import Login from './components/Login';
// import Plants from './components/Plants';
import './App.css';



function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link><br/>
        <Link to="/signup">Signup</Link><br/>
        <Link to="/login">Login</Link>
        </nav>
      <Route exact path="/" component={Home}></Route>
      {/* <Route path="/login" component="Login"></Route> */}
      <Route exact path="/signup" component={SignUp}></Route>
      <PrivateRoute exact path="/addplants" component={AddPlants}/>
    </div>
  );
}

export default App;
