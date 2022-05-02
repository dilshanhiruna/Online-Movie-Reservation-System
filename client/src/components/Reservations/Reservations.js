import React, { useState } from "react";
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
  const [movie, setMovie] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [seats, setSeats] = React.useState("");
  const [ticketCount, setticketCount] = useState(1);
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
                    value={ticketCount}
                    label="Count"
                    onChange={(event) => {
                      setticketCount(event.target.value);
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
                    defaultValue="2017-05-24"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
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
                    value={ticketCount}
                    label="timeslot"
                    onChange={(event) => {
                      setticketCount(event.target.value);
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
                    value={ticketCount}
                    label="theater"
                    onChange={(event) => {
                      setticketCount(event.target.value);
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
                    value={ticketCount}
                    label="payment"
                    onChange={(event) => {
                      setticketCount(event.target.value);
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
