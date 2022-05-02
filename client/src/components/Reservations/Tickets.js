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
  let { id } = useParams();
  const API = process.env.REACT_APP_API;

  const [Reservation, setReservation] = useState([]);
  const [Tickets, setTickets] = useState([]);

  useEffect(() => {
    // get reservation details from database by param id
    Axios.get(`${API}api/v1/reservations/tickets/${id}`).then((res) => {
      setReservation(res.data.data);
      setTickets(res.data.data.tickets);
    });
  }, []);

  return (
    <div className="tickets__component">
      <div>
        <div>
          <h2>Your Tickets</h2>
        </div>
        <div>
          <div className="tickets__details">
            <span>Movie: </span>
            <Chip label={Reservation.movieName} />
          </div>
          <div className="tickets__details">
            <span>Tickets: </span>
            <Chip label={Reservation.noOfTickets} />
          </div>
          <div className="tickets__details">
            <span>Theater: </span>
            <Chip label={Reservation.theaterName} />
          </div>
          <div className="tickets__details">
            <span>Total Price: </span>
            <Chip label={`LKR ${Reservation.totalPrice}`} />
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
