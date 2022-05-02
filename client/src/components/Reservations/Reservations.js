import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Reservations.css";
import MediaCard from "../Common/MediaCard";
import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function Reservations() {
  const API = process.env.REACT_APP_API;
  const [customerID, setcustomerID] = useState("TUG6786GK65476KJHF");
  const [movieID, setmovieID] = useState("5e7b9f8f8d8f5b1b8c8b4567");
  const [movieName, setmovieName] = useState("The Lion King");
  const [theaterID, settheaterID] = useState("5e7b9f8f8d8f5b1b8c8b4567");
  const [theaterName, settheaterName] = useState("Savoy");
  const [noOfTickets, setnoOfTickets] = useState(1);
  const [date, setdate] = useState("2020-06-01");
  const [timeSlot, settimeSlot] = useState(1);
  const [paymentType, setpaymentType] = useState(1); // 1 = visa, 2 = mobile
  const [totalPrice, settotalPrice] = useState(100);
  const [status, setstatus] = useState("Reserved");
  const [tickets, settickets] = useState([
    {
      seatNumber: "A1",
      price: 100,
    },
    {
      seatNumber: "A2",
      price: 100,
    },
    {
      seatNumber: "A3",
      price: 100,
    },
  ]);
  //get theaters from the database
  useEffect(() => {
    Axios.get(`${API}api/v1/theater`).then((res) => {
      console.log(res.data);
    });
  }, []);
  console.log(API);

  return (
    <>
      <div className="res_component">
        <div className="res_movie__poster">
          <MediaCard
            title="The Batman"
            description="When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement."
            image="https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_FMjpg_UX1000_.jpg"
          />
        </div>
        <div className="res_details">
          <div className="res_details__title">
            <h1>Ticket Reservation</h1>
            <div>
              <br />
              <div className="res_details__input">
                <p>Tickets</p>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Count</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={noOfTickets}
                    label="Count"
                    onChange={(event) => {
                      setnoOfTickets(event.target.value);
                    }}
                    style={{ width: "100px" }}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="res_details__input">
                <p>Date</p>
                <FormControl fullWidth>
                  <TextField
                    id="date"
                    label="Birthday"
                    type="date"
                    defaultValue={date}
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) => {
                      setdate(event.target.value);
                    }}
                  />
                </FormControl>
              </div>
              <div className="res_details__input">
                <p>Time</p>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Time Slot
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={timeSlot}
                    label="timeslot"
                    onChange={(event) => {
                      settimeSlot(event.target.value);
                    }}
                    style={{ width: "150px" }}
                  >
                    <MenuItem value={1}>09:00-11:00</MenuItem>
                    <MenuItem value={2}>12:00-14:00</MenuItem>
                    <MenuItem value={3}>15:00-17:00</MenuItem>
                    <MenuItem value={4}>18:00-20:00</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="res_details__input">
                <p>Theater</p>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Theater</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={theaterName}
                    label="theater"
                    onChange={(event) => {
                      settheaterID(event.target.value);
                    }}
                    style={{ width: "150px" }}
                  >
                    <MenuItem value={1}>Savoy</MenuItem>
                    <MenuItem value={2}>Regal</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="res_details__input">
                <p>Payment Method</p>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Method</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={paymentType}
                    label="payment"
                    onChange={(event) => {
                      setpaymentType(event.target.value);
                    }}
                    style={{ width: "150px" }}
                  >
                    <MenuItem value={1}>Visa</MenuItem>
                    <MenuItem value={2}>Mobile</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="res_details__input">
                <p>Ticket Price</p>
                <FormControl fullWidth>
                  <Chip
                    label="LKR 1500"
                    style={{ width: "200px", height: "40px" }}
                  />
                </FormControl>
              </div>
              <div className="res_details__input">
                <p>Total Price</p>
                <FormControl fullWidth>
                  <Chip
                    label="LKR 3000"
                    style={{ width: "200px", height: "40px" }}
                  />
                </FormControl>
              </div>
              <div className="res_details__input">
                <FormControl fullWidth>
                  <Button
                    variant="contained"
                    style={{ width: "400px", height: "40px" }}
                  >
                    Reserve
                  </Button>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
