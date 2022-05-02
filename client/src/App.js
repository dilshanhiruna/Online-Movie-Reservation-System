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
  const Page404 = () => {
    return <h1>Page not found!</h1>;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {userType === "SysAdmin" ? <SysAdmin /> : ""}
          {userType === "movAdmin" ? <MovAdmin /> : ""}
          {userType === "customer" ? <Customer /> : ""}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
