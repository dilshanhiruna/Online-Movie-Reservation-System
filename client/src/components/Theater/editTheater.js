import React, { useState } from "react";
import Axios from "axios";
import "./Theater.css";
import { Button, FormControl, TextField } from "@mui/material";

export const EditTheater = () => {
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
};
