import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";

const Login = () => {
  const API = process.env.REACT_APP_API;

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const location = useHistory();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    console.log("Inside handle submit");
    e.preventDefault();
    // try {
    // 	const url = "http://localhost:5002/api/auth";
    // 	const { data: res } = await axios.post(url, data);
    // 	localStorage.setItem("token", res.data);
    // 	window.location = "/";
    // } catch (error) {
    // 	if (
    // 		error.response &&
    // 		error.response.status >= 400 &&
    // 		error.response.status <= 500
    // 	) {
    // 		setError(error.response.data.message);
    // 	}
    // }

    Axios.post(`${API}users/login`, data)
      .then((res) => {
        alert("Logged In");
        //   window.location.reload();
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
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
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
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>Don't Have an Account?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
