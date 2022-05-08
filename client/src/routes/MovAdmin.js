import React from "react";
import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import { Route, Switch, Redirect } from "react-router-dom";

export default function MovAdmin() {
  return (
    <div className="movadmin__view">
      <Header title={"My Movies"} user={"movadmin"} />
      <Switch>
        <Route exact path="/movies/"></Route>
        <Redirect to="/movies/404" />
      </Switch>
      <Footer />
    </div>
  );
}
