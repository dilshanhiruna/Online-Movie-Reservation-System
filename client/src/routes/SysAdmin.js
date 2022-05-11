import React from "react";
import Header from "../components/view/SysHeader";
import Footer from "../components/view/Footer";
import { Route, Switch, Redirect } from "react-router-dom";
import Reservations from "../components/Reservations/Reservations";
import Theater from "../components/Theater/Theater";
import AddTheater from "../components/Theater/AddTheater";
import EditTheater from "../components/Theater/EditTheater";

export default function SysAdmin() {
  return (
    <div className="sysadmin__view">
      <Header title={"Theaters"} user={"sysadmin"} />
      <Switch>
        {/* <Route exact path="/theaters/pabasara">
          <Comp user={"Pabasara"} />
        </Route> */}
        <Route exact path="/theaters">
          <Theater />
        </Route>
        <Route exact path="/theaters/add">
          <AddTheater />
        </Route>
        <Route exact path="/theaters/update/:id">
          <EditTheater />
        </Route>
        <Route exact path="/customer/reservation">
          <Reservations />
        </Route>
        <Redirect to="/theaters/404" />
      </Switch>
      <Footer />
    </div>
  );
}
