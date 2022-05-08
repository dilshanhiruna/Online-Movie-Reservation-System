import "./App.css";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  Router,
} from "react-router-dom";
import { useState, useEffect } from "react";
import jwt from 'jwt-decode'
import Customer from "./routes/Customer";
import MovAdmin from "./routes/MovAdmin";
import SysAdmin from "./routes/SysAdmin";
import LoginRouter from "./routes/LoginRouter";

//import Customer from "./components/Customer";
// import Signup from "./components/Signup";
// import Login from "./components/Login";

function App() {

  const token = localStorage.getItem("token");
  let role = "";

  if(token) {
    const payload = jwt(token);
    role = payload.role;
  }

  const [userType, setUserType] = useState(role);



  // useEffect(() => {
  //   if(token) {
  //     setUserType(payload.role);
  //   }
  // }, []);

  console.log("Inside app");

  //TODO: Check the user and set user type

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {userType === "" ? <LoginRouter /> : ""}
          {userType === "SysAdmin" ? <SysAdmin /> : ""}
          {userType === "movAdmin" ? <MovAdmin /> : ""}
          {userType === "customer" ? <Customer /> : ""}
        </Switch>

        {/* <Routes>
			    {user && <Route path="/" exact element={<Customer />} />}
			    <Route path="/signup" exact element={<Signup />} />
			    <Route path="/login" exact element={<Login />} />
			    <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes> */}
        
      </BrowserRouter>
    </div>
  );
}

export default App;
