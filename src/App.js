
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
import './App.css';


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

      <nav>
        <Link to="/">Home</Link><br/>
        {isLoggedIn ? <Link to="/settings">User Settings</Link> : null}<br/>
        {isLoggedIn ? <Link to="/plantcard">View My Plants</Link> : null}<br/>
        {isLoggedIn ? <Link to="/addplants">Add Plants</Link> : null}<br/>
        {isLoggedIn ? null : <Link to="/login">Login</Link>}<br/>
        {isLoggedIn ? <Link to="/" onClick={ handleLogOut }>Logout</Link> : null}  
      </nav>
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
