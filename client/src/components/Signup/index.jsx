import { useState } from "react";
import Axios from "axios";
import { Link, BrowserRouter } from "react-router-dom";
import styles from "./styles.module.css";
const API = process.env.REACT_APP_API;

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    role: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    // 	const url = "http://localhost:5002/api/users";
    // 	const { data: res } = await axios.post(url, data);
    // 	navigate("/login");
    // 	console.log(res.message);
    // } catch (error) {
    // 	if (
    // 		error.response &&
    // 		error.response.status >= 400 &&
    // 		error.response.status <= 500
    // 	) {
    // 		setError(error.response.data.message);
    // 	}
    // }

    Axios.post(`${API}users/register`, data)
      .then((res) => {
        alert("Registered");
        localStorage.setItem("token", res.data.data);
        //history.push({ pathname: '/customer/reservation', id: movie._id });
        window.location = "/";
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome to the Online Movie Reservation System</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign In
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create User Account</h1>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Role"
              name="role"
              onChange={handleChange}
              value={data.role}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
