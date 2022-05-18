import React, { useState } from "react";
import Axios from "axios";
import "./Theater.css";
import { Button, FormControl, TextField } from "@mui/material";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

export default function AddTheater() {
  const history = useHistory();
  const [theaterName, settheatername] = useState("");
  const [location, setlocation] = useState("");
  const [seatPrice, setseatprice] = useState("");

  const API = process.env.REACT_APP_API;

  //using axios send theater details to api
  const sendTheaterToAPI = () => {
    Axios.post(`${API}theaters/add`, {
      theaterName,
      location,
      seatPrice,
    }).then((res) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/theaters");
    });
  };
  return (
    // data form

    <div className="res_component">
      <div className="Theater_details">
        <div className="Theater_details__title">
          <h1>Theater Registration</h1>
          <div>
            <br />
            {/* <div className="Theater_details__input">
            <p>ID</p>

            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </FormControl>
          </div> */}

            <div className="Theater_details__input">
              <p>Theater Name</p>

              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  className="Theater_txt"
                  label="Theater Name"
                  variant="outlined"
                  onChange={(e) => settheatername(e.target.value)}
                />
              </FormControl>
            </div>

            {/* <div className="Theater_details__input">
              <p>Location</p>

              <Box
                component="form"
                // sx={{
                //   "& .MuiTextField-root": { m: 1, width: "45ch" },
                // }}
                noValidate
                autoComplete="off"
              >
                <FormControl fullWidth>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Location"
                    multiline
                    className="Theater_txt"
                    maxRows={4}
                    value={value}
                    onChange={handleChange}
                  />
                </FormControl>
              </Box>
            </div> */}

            <div className="Theater_details__input">
              <p>Location</p>

              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  className="Theater_txt"
                  label="Location"
                  variant="outlined"
                  onChange={(e) => setlocation(e.target.value)}
                />
              </FormControl>
            </div>

            <div className="Theater_details__input">
              <p>Seat price (LK)</p>

              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  className="Theater_txt"
                  label="Price"
                  variant="outlined"
                  onChange={(e) => setseatprice(e.target.value)}
                />
              </FormControl>
            </div>

            <div className="res_details__input">
              <FormControl fullWidth>
                <Button
                  variant="contained"
                  style={{
                    width: "500px",
                    height: "50px",
                    margin: "20px 0px 0px 100px",
                  }}
                  onClick={sendTheaterToAPI}
                >
                  Register
                </Button>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
