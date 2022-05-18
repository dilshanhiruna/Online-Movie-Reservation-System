import { Button, FormControl, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Payment.css";
import Swal from "sweetalert2";
import Axios from "axios";

export default function MobilePay(props) {
  const API = process.env.REACT_APP_MOBILEPAYMENT_API;

  // get all the props from the parent component
  const {
    DoReservation,
    totalPrice,
    mobileNumber,
    setmobileNumber,
    mobilePin,
    setmobilePin,
    handleClose,
  } = props;

  // function to handle the payment
  const PayNow = () => {
    // validate details
    if (mobileNumber.length === 9 && mobilePin.length === 6) {
      // close the payment modal
      handleClose();

      //add country code to the mobile number
      const phoneNumber = `+94${mobileNumber}`;

      const data = {
        phoneNumber,
        mobilePin,
        totalPrice,
      };

      Axios.post(`${API}mobilepayment`, { data }).then((res) => {
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
    }
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
              value={mobileNumber}
              onChange={(e) => setmobileNumber(e.target.value)}
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
              value={mobilePin}
              onChange={(e) => setmobilePin(e.target.value)}
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
