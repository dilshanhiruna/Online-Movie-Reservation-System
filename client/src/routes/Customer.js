import React from "react";
import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import { Route, Switch, Redirect } from "react-router-dom";

export default function Customer() {
  return (
    <div className="customer__view">
      <Header title={"Find Movies"} user={"customer"} />
      <Switch>
        <Route exact path="/customer/movies"></Route>
        <Redirect to="/customer/404" />
      </Switch>
      <Footer />
    </div>
  );
}
