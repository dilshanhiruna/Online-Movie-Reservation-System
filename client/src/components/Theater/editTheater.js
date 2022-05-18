import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Theater.css";
import { Button, FormControl, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

export default function EditTheater() {
  const [theaterName, settheatername] = useState("");
  const [location, setlocation] = useState("");
  const [seatPrice, setseatprice] = useState("");
  const history = useHistory();
  const API = process.env.REACT_APP_API;
  const { id } = useParams();

  //get all theaters from the database
  useEffect(() => {
    Axios.get(`${API}theaters/get/${id}`).then((res) => {
      settheatername(res.data.data.theaterName);
      setlocation(res.data.data.location);
      setseatprice(res.data.data.seatPrice);
    });
  }, []);

  const updateTheater = () => {
    const data = {
      theaterName,
      location,
      seatPrice,
    };
    Axios.put(`${API}theaters/update/${id}`, data).then((res) => {
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
    <div className="res_component">
      <div className="Theater_details">
        <div className="Theater_details__title">
          <h1>Theater Details Update</h1>
          <div>
            <br />

            <div className="Theater_details__input">
              <p>Theater Name</p>

              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  className="Theater_txt"
                  label="Theater Name"
                  variant="outlined"
                  value={theaterName}
                  onChange={(e) => {
                    settheatername(e.target.value);
                  }}
                />
              </FormControl>
            </div>

            <div className="Theater_details__input">
              <p>Location</p>

              <FormControl fullWidth>
                <TextField
                  id="outlined-basic"
                  className="Theater_txt"
                  label="Location"
                  variant="outlined"
                  value={location}
                  onChange={(e) => {
                    setlocation(e.target.value);
                  }}
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
                  value={seatPrice}
                  onChange={(e) => {
                    setseatprice(e.target.value);
                  }}
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
                  onClick={updateTheater}
                >
                  Update
                </Button>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
