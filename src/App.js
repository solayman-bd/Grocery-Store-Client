import logo from "./logo.svg";
import "./App.css";
import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Order from "./components/Order/Order";
import Admin from "./components/Admin/Admin";
import Deals from "./components/Deals/Deals";
import Login from "./components/Login/Login";
import CheckOut from "./components/CheckOut/CheckOut";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NoMatch from "./components/NoMatch/NoMatch";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <PrivateRoute path="/order">
            <Order></Order>
          </PrivateRoute>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/checkOut/:id">
            <CheckOut></CheckOut>
          </PrivateRoute>

          <Route path="/deals">
            <Deals></Deals>
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
