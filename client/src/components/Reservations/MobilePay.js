import { Button, FormControl, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Payment.css";
import Swal from "sweetalert2";
import Axios from "axios";

export default function MobilePay(props) {
  const API = process.env.REACT_APP_CARDPAYMENT_API;

  // get all the props from the parent component
  const {
    DoReservation,
    totalPrice,
    mobileNumber,
    setmobileNumber,
    mobilePin,
    setmobilePin,
  } = props;

  // function to handle the payment
  const PayNow = () => {
    //check payment
    Axios.post(`${API}api/v1/payment`, {}).then((res) => {
      if (res.data.success) {
        Swal.fire({
          title: "Payment Successful",
          text: "Your payment was successful",
          icon: "success",
          confirmButtonText: "OK",
        });
        // if payment is successful, call the DoReservation function in the parent component
        DoReservation();
      } else {
        Swal.fire({
          title: "Payment Failed",
          text: "Your payment was failed",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };

  return (
    <div>
      <div className="MobilePay__form">
        <div className="payment__form">
          <FormControl fullWidth>
            <TextField
              className="payment__form__input"
              id="outlined-basic"
              label="Mobile number"
              variant="outlined"
              sx={{ margin: "7px" }}
              inputProps={{
                maxLength: 9,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+94</InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              className="payment__form__input"
              id="outlined-basic"
              label="6 Digits Pin"
              variant="outlined"
              sx={{ margin: "7px" }}
              inputProps={{
                maxLength: 6,
              }}
            />
          </FormControl>
        </div>
      </div>
      <div className="PaymentForm_bottom">
        <h3>Payment Amount</h3>
        <span>LKR {totalPrice}</span>
        <Button variant="contained" onClick={PayNow}>
          Pay Now
        </Button>
      </div>
    </div>
  );
}
