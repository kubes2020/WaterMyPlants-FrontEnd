import React, { useState } from "react";
import { Home } from "./components/Home";
import { Route, Link, useHistory } from "react-router-dom";
import AddPlants from "./components/AddPlants";
import { PrivateRoute } from "./components/PrivateRoute";
import Login from "./components/Login";
import PlantCard from "./components/PlantCard";
import SignUp from "./components/SignUp";
import EditPlant from "./components/EditPlant";
import { PlantContext } from "./components/contexts/PlantContext";
import Settings from "./components/Settings";
import styled from "styled-components";
import "./App.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

const NavLink = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.9);
  margin: 0.3% 2%;
  font-size: 1rem;
  border-radius: 6px;
  justify-content: center;
  display: inline-flex;
  font-family: Raleway;
  &:hover {
    color: white;
    background-color: rgb(25, 132, 25);
    transition: all 0.4s ease-in-out;
  }
  @media (max-width: 550px) {
    font-size: 1.8rem;
    display: block;
  }
`;

function App() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const history = useHistory();
  const [plantId, setPlantId] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogOut = () => {
    setNavbarOpen(false);
    localStorage.clear();
    setIsLoggedIn(false);
    history.push("/");
  };

  const handleToggle = (e) => {
    e.preventDefault();
    setNavbarOpen(!navbarOpen);
  };

  const closeMenu = (e) => {
    setNavbarOpen(false);
  };

  let loginLinks;

  if (isLoggedIn) {
    loginLinks = (
      <span>
        <NavLink to="/settings" onClick={closeMenu}>
          User Settings
        </NavLink>
        <NavLink to="/plantcard" onClick={closeMenu}>
          View My Plants
        </NavLink>
        <NavLink to="/addplants" onClick={closeMenu}>
          Add Plants
        </NavLink>
        <NavLink to="/" onClick={handleLogOut}>
          Logout
        </NavLink>
      </span>
    );
  } else {
    loginLinks = (
      <NavLink to="/login" onClick={closeMenu}>
        Login
      </NavLink>
    );
  }

  return (
    <div className="App">
      <div className="menu-button">
        <button onClick={handleToggle}>
          {navbarOpen ? (
            <GrClose size="2rem" />
          ) : (
            <GiHamburgerMenu size="2rem" />
          )}
        </button>
      </div>
      <div className={`main-nav ${navbarOpen ? " showMenu" : ""}`}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        {loginLinks}
      </div>
      <PlantContext.Provider value={{ plantId, setPlantId }}>
        <Route exact path="/" component={Home}></Route>
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
        <Route
          exact
          path="/signup"
          render={(props) => (
            <SignUp {...props} setIsLoggedIn={setIsLoggedIn} />
          )}
        ></Route>
        <PrivateRoute exact path="/addplants" component={AddPlants} />
        <PrivateRoute exact path="/plantcard" component={PlantCard} />
        <PrivateRoute exact path="/editplant" component={EditPlant} />
        <PrivateRoute exact path="/settings" component={Settings} />
      </PlantContext.Provider>
    </div>
  );
}

export default App;
