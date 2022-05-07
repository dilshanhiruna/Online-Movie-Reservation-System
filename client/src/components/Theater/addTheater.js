import React, { useState } from "react";
import Axios from "axios";
import "./Theater.css";
import { Button, Box, FormControl, InputLabel, TextField } from "@mui/material";

export const AddTheater = () => {
  const [theaterName, settheatername] = useState("");
  const [location, setlocation] = useState("");
  const [seatPrice, setseatprice] = useState("");

  const API = process.env.REACT_APP_API;

  //using axios send theater details to api
  const sendTheaterToAPI = () => {
    Axios.post(`${API}api/v1/theater`, {
      theaterName,
      location,
      seatPrice,
    }).then((res) => {
      console.log("succesful");
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
};
