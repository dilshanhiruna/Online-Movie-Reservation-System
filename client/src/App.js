import "./App.css";
import { Route, Routes, Navigate } from 'react-router-dom';
import Customer from './components/Customer';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const user = localStorage.getItem("token");
  
  return (
    <div className="App">
      <h1>Research Project Management Tool</h1>
      <h3>node v16.14.2</h3>

    <Routes>
      {user && <Route path="/" exact element={<Customer />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>

    </div>
  );
}

export default App;
