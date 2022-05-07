import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import "./Tickets.css";

export default function Tickets() {
  //component to display the tickets

  // get the reservation id from the url
  let { id } = useParams();
  const API = process.env.REACT_APP_API;

  const [Reservation, setReservation] = useState([]);
  const [Tickets, setTickets] = useState([]);

  useEffect(() => {
    // get reservation details from database by param id
    Axios.get(`${API}api/v1/reservations/tickets/${id}`).then((res) => {
      // set the reservation details
      setReservation(res.data.data);
      // set the tickets details
      setTickets(res.data.data.tickets);
    });
  }, []);

  // function to get the time slot according to the numbering
  const getTimeSlot = (slot) => {
    if (slot === "1") {
      return "09:00-11:00";
    } else if (slot === "2") {
      return "12:00-14:00";
    } else if (slot === "3") {
      return "15:00-17:00";
    } else if (slot === "4") {
      return "18:00-20:00";
    } else {
      return "Not Available";
    }
  };
  // function to get the payment type according to the numbering
  const getPaymentType = (type) => {
    if (type === "1") {
      return "Visa";
    } else if (type === "2") {
      return "Mobile";
    } else {
      return "Not Available";
    }
  };

  return (
    <div className="tickets__component">
      <div>
        <div>
          <h2>Your Tickets</h2>
        </div>
        <div>
          <div className="tickets__details">
            <span>Movie: </span>
            <Chip sx={{ textAlign: "center" }} label={Reservation.movieName} />
          </div>

          <div className="tickets__details">
            <span>Theater: </span>
            <Chip
              sx={{ textAlign: "center" }}
              label={Reservation.theaterName}
            />
          </div>
          <div className="tickets__details">
            <span>Tickets: </span>
            <Chip
              sx={{ textAlign: "center" }}
              label={Reservation.noOfTickets}
            />
          </div>
          <div className="tickets__details">
            <span>Movie Date: </span>
            <Chip
              sx={{ textAlign: "center" }}
              label={new Date(Reservation.date).toLocaleDateString()}
            />
          </div>
          <div className="tickets__details">
            <span>Movie Time: </span>
            <Chip
              sx={{ textAlign: "center" }}
              label={getTimeSlot(Reservation.timeSlot)}
            />
          </div>
          <div className="tickets__details">
            <span>Payment Type: </span>
            <Chip
              sx={{ textAlign: "center" }}
              label={getPaymentType(Reservation.paymentType)}
            />
          </div>
          <div className="tickets__details">
            <span>Total Price: </span>
            <Chip
              label={`LKR ${Reservation.totalPrice}`}
              sx={{ textAlign: "center" }}
            />
          </div>
          <div className="tickets__details">
            <span>Reserved Date: </span>
            <Chip
              sx={{ textAlign: "center" }}
              label={new Date(Reservation.reservedDate).toLocaleDateString()}
            />
          </div>
        </div>
      </div>

      <div className="tickets__component__cards">
        {Tickets.map((ticket) => (
          <Card sx={{ maxWidth: 250, minWidth: 250, margin: "10px" }}>
            <CardMedia
              component="img"
              height="240"
              image={ticket.qr}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Seat: {ticket.seatNumber}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                Price: LKR {ticket.price}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
