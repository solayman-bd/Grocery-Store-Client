import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Order from "./components/Order/Order";
import Admin from "./components/Admin/Admin";
import Deals from "./components/Deals/Deals";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/order">
          <Order></Order>
        </Route>
        <Route path="/admin">
          <Admin></Admin>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route path="/deals">
          <Deals></Deals>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
