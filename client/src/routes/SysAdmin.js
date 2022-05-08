import React from "react";
import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import { Route, Switch, Redirect } from "react-router-dom";

export default function SysAdmin() {
  return (
    <div className="sysadmin__view">
      <Header title={"My Theaters"} user={"sysadmin"} />
      <Switch>
        <Route exact path="/theaters/"></Route>
        <Redirect to="/theaters/404" />
      </Switch>
      <Footer />
    </div>
  );
}
