import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";

import "./App.css";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import DadJokes from "./components/DadJokes";

class App extends Component {
  render() {
    return (
      <>
        <header>
          <NavLink exact to="/">
            {" "}
            | SIGN IN{" "}
          </NavLink>
          <NavLink to="/signup">| SIGN UP |</NavLink>
          <NavLink to="/users"> DAD JOKES |</NavLink>
        </header>
        <>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/jokes" component={DadJokes} />
        </>
      </>
    );
  }
}

export default App;
