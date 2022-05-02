import "./App.css";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  Router,
} from "react-router-dom";
import { useState } from "react";
import Customer from "./routes/Customer";
import MovAdmin from "./routes/MovAdmin";
import SysAdmin from "./routes/SysAdmin";

function App() {
  const [userType, setUserType] = useState("customer");
  //TODO: Check the user and set user type
  return (
    <div className="App">
      <BrowserRouter>
        {userType === "SysAdmin" ? <SysAdmin /> : ""}
        {userType === "movAdmin" ? <MovAdmin /> : ""}
        {userType === "customer" ? <Customer /> : ""}
        <Redirect to="/404" />
      </BrowserRouter>
    </div>
  );
}

export default App;
