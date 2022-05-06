import { Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "./Payment.css";
import Swal from "sweetalert2";
import Axios from "axios";

export default function Payment(props) {
  const API = process.env.REACT_APP_API;
  const {
    handleClose,
    cardNumber,
    cardName,
    cardExpiry,
    cardCvc,
    setCardNumber,
    setCardName,
    setCardExpiry,
    setCardCvc,
    totalPrice,
    DoReservation,
  } = props;

  const PayNow = () => {
    if (
      cardNumber.length !== 0 ||
      cardExpiry.length !== 0 ||
      cardCvc.length !== 0 ||
      cardName.length !== 0
    ) {
      handleClose();

      const data = {
        cardNumber,
        cardName,
        cardExpiry,
        cardCvc,
      };

      //check payment
      Axios.post(`${API}api/v1/payment`, data).then((res) => {
        if (res.data.success) {
          Swal.fire({
            title: "Payment Successful",
            text: "Your payment was successful",
            icon: "success",
            confirmButtonText: "OK",
          });
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
      <div className="PaymentForm">
        <div>
          <Cards
            cvc={cardCvc}
            expiry={cardExpiry}
            name={cardName}
            number={cardNumber}
          />
        </div>
        <div className="payment__form">
          <FormControl fullWidth>
            <TextField
              className="payment__form__input"
              id="outlined-basic"
              label="Card Number"
              value={cardNumber}
              variant="outlined"
              sx={{ margin: "7px" }}
              onChange={(event) => {
                setCardNumber(event.target.value);
              }}
              inputProps={{
                maxLength: 16,
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              className="payment__form__input"
              id="outlined-basic"
              value={cardName}
              label="Name"
              variant="outlined"
              sx={{ margin: "7px" }}
              onChange={(event) => {
                setCardName(event.target.value);
              }}
              inputProps={{
                maxLength: 30,
              }}
            />
          </FormControl>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <FormControl fullWidth>
                <TextField
                  className="payment__form__input"
                  id="date"
                  value={cardExpiry}
                  label="Valid Thru"
                  sx={{ width: "220px", margin: "7px" }}
                  onChange={(event) => {
                    setCardExpiry(event.target.value);
                  }}
                  inputProps={{
                    maxLength: 4,
                  }}
                />
              </FormControl>
            </div>
            <div>
              <FormControl fullWidth>
                <TextField
                  className="payment__form__input"
                  id="outlined-basic"
                  label="CVC"
                  value={cardCvc}
                  variant="outlined"
                  sx={{ width: "110px", margin: "7px" }}
                  onChange={(event) => {
                    setCardCvc(event.target.value);
                  }}
                  inputProps={{
                    maxLength: 3,
                  }}
                />
              </FormControl>
            </div>
          </div>
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
