import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./Header.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

export default function CusHeader({ title }) {
  const history = useHistory();
  return (
    <>
      <header>
        <div className="header__component">
          <div className="header__left">
            <div>
              <p>Online Ticket Reservation</p>
              <p>{title}</p>
            </div>
            <div className="header__buttonGroup">
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => history.goBack()}
                startIcon={<ArrowBackRoundedIcon />}
              >
                Back
              </Button>
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => history.push("/customer/movies")}
              >
                Movies
              </Button>
              <Button
                variant="outlined"
                className="header__button"
                onClick={() => history.push("/customer/theaters")}
              >
                Theaters
              </Button>
            </div>
          </div>
          <div className="header__right">
            <Button
              variant="contained"
              style={{
                borderRadius: "20px",
                width: "170px",
                backgroundColor: "rgb(60, 60, 60)",
              }}
              className="header__button"
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to={`/customer/myreservations`}
              >
                My Reservations
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
