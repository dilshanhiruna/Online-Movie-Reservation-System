import React from "react";
import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import { Route, Switch, Redirect } from "react-router-dom";
import Reservations from "../components/Reservations/Reservations";

export default function Customer() {
  return (
    <div className="customer__view">
      <Header title={"Movies"} user={"customer"} />
      <Switch>
        <Route exact path="/customer/movies"></Route>
        <Route exact path="/customer/reservation">
          <Reservations />
        </Route>
        <Redirect to="/customer/404" />
      </Switch>
      <Footer />
    </div>
  );
}
