import './App.css';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  Router,
} from 'react-router-dom';
import { useState } from 'react';
import Customer from './routes/Customer';
import MovAdmin from './routes/MovAdmin';
import SysAdmin from './routes/SysAdmin';

function App() {
  const [userType, setUserType] = useState('movAdmin');
  //TODO: Check the user and set user type

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {userType === 'SysAdmin' ? <SysAdmin /> : ''}
          {userType === 'movAdmin' ? <MovAdmin /> : ''}
          {userType === 'customer' ? <Customer /> : ''}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
