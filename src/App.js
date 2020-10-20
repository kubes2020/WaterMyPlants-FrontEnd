
import React, { useState } from 'react';
import { Home } from "./components/Home";
import { Route, Link } from 'react-router-dom';
import AddPlants from "./components/AddPlants";
import { PrivateRoute } from "./components/PrivateRoute";
import Login from "./components/Login";
import { PlantCard } from "./components/PlantCard";
import SignUp from './components/SignUp';
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogOut = () =>{
    localStorage.clear()
    setIsLoggedIn(false)
  }

  return (
    <div className="App">

      <nav>
        <Link to="/">Home</Link><br/>
        {isLoggedIn ? <Link to="/plantcard">View My Plants</Link> : null}<br/>
        {isLoggedIn ? <Link to="/addplants">Add Plants</Link> : null}<br/>
        {isLoggedIn ? null : <Link to="/signup">Signup</Link>}<br/>
        {isLoggedIn ? null : <Link to="/login">Login</Link>}<br/>
        <Link to="/" onClick={ handleLogOut }>Logout</Link>
      </nav>

      <Route exact path="/" component={Home}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" render={(props) => <SignUp {...props} setIsLoggedIn={setIsLoggedIn}/>}></Route>
      <PrivateRoute exact path="/addplants" component={AddPlants}/>
      <PrivateRoute exact path="/plantcard" component={PlantCard}/>

    </div>
  );
}

export default App;
