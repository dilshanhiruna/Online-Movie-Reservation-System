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
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import Payment from "./Payment";
import { useHistory, useLocation } from "react-router";
import MobilePay from "./MobilePay";
import Swal from "sweetalert2";

export default function Reservations({ userID }) {
  // component to book tickets
  let history = useHistory();
  const location = useLocation();
  const API = process.env.REACT_APP_API;
  const QRCODE_API = process.env.REACT_APP_QRCODE_API;
  const [customerID, setcustomerID] = useState("TUG6786GK65476KJHF");
  const [theaterName, settheaterName] = useState("");
  const [noOfTickets, setnoOfTickets] = useState(1);
  const [date, setdate] = useState("2022-06-01");
  const [timeSlot, settimeSlot] = useState(1);
  const [paymentType, setpaymentType] = useState(1); // 1 = visa, 2 = mobile
  const [totalPrice, settotalPrice] = useState(100);
  const [status, setstatus] = useState("Reserved");

  //states to hold card details
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardexpiry] = useState("");
  const [cardCvc, setCardcvc] = useState("");
  const [cardName, setCardname] = useState("");

  const [mobileNumber, setmobileNumber] = useState("");
  const [mobilePin, setmobilePin] = useState("");

  const [Movie, setMovie] = useState([]);
  const [Theaters, setTheaters] = useState([]);
  const [ticketPrice, setticketPrice] = useState(0);

  const [open, setOpen] = useState(false);
  const [movieID, setMovieID] = useState(location.id);

  //get theaters from the database
  useEffect(() => {
    if (!movieID) {
      history.push("/customer/movies");
      return;
    }

    //get the movie details
    Axios.get(`${API}api/v1/movies/${movieID}`)
      .then((res) => {
        setMovie(res.data.data);
        console.log(res.data.data);
        console.log(res.data.data.theaters[0]);
        // setTheaters(res.data.data.theaters);
        // settheaterName(res.data.data.theaters[0]);
        if (res.data.data.theaters.length > 0) {
          //map theater array and fetch all theaters and save them in the theater state
          Axios.get(`${API}api/v1/theater/${res.data.data.theaters[0]}`).then(
            (res) => {
              settheaterName(res.data.data.theaterName);
            }
          );

          res.data.data.theaters.map((theater) => {
            Axios.get(`${API}api/v1/theater/${theater}`).then((res) => {
              setTheaters((prev) => [...prev, res.data.data]);
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

  useEffect(() => {
    //set the ticket price according to the theater seatPrice
    let theaters = Theaters.find(
      (theater) => theater.theaterName === theaterName
    );
    if (theaters) {
      const price = theaters.seatPrice;
      setticketPrice(price);
      settotalPrice(price * noOfTickets);
    }
  }, [Theaters, theaterName, noOfTickets]);

  // open/close the payment modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // function to handle the reservation
  const DoReservation = () => {
    //validate card details
    // if visa card payment is selected
    if (paymentType === 1) {
      if (
        cardNumber.length !== 16 &&
        cardExpiry.length !== 4 &&
        cardCvc.length !== 3 &&
        !cardName.length > 0
      ) {
        Swal.fire({
          title: "Invalid Input",
          text: "Your transaction was failed",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
      // if mobile payment is selected
    } else if (paymentType === 2) {
      if (mobileNumber.length !== 10 && !mobilePin.length > 0) {
        Swal.fire({
          title: "Invalid Input",
          text: "Your transaction was failed",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }
    }
    //create a json object to make the QR CODE
    const payload = {
      customerID: customerID,
      movieID: movieID,
      theaterName: theaterName,
      noOfTickets: noOfTickets,
      date: date,
      timeSlot: timeSlot,
      paymentType: paymentType,
      totalPrice: totalPrice,
    };
    //create a QR code
    Axios.post(`${QRCODE_API}api/v1/ticket`, { payload })
      .then((res) => {
        let tickets = [];
        // create tickets with the QR code
        for (let i = 0; i < noOfTickets; i++) {
          tickets.push({
            qr: res.data.data,
            seatNumber: `AB${i + 1}`,
            price: ticketPrice,
          });
        }

        //create a reservation json object
        const reservation = {
          customerID: customerID,
          movieID: movieID,
          movieName: Movie.name,
          theaterName: theaterName,
          noOfTickets: noOfTickets,
          date: date,
          timeSlot: timeSlot,
          paymentType: paymentType,
          totalPrice: totalPrice,
          status: status,
          tickets: tickets, //add all tickets as a array
        };

        // create a reservation in the database
        Axios.post(`${API}api/v1/reservations`, reservation)
          .then((res) => {
            if (res.data.id) {
              //navigate to next page
              history.push(`/customer/reservation/tickets/${res.data.id}`);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="res_component">
        <div className="res_movie__poster">
          <MediaCard
            title={Movie.name}
            description={Movie.description}
            image={Movie.banner}
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
                    label="Date"
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
                      settheaterName(event.target.value);
                    }}
                    style={{ width: "200px" }}
                  >
                    {Theaters.map((theater, key) => (
                      <MenuItem value={theater.theaterName} key={key}>
                        {theater.theaterName}
                      </MenuItem>
                    ))}
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
                    label={`LKR ${ticketPrice}`}
                    style={{ width: "200px", height: "40px" }}
                  />
                </FormControl>
              </div>
              <div className="res_details__input">
                <p>Total Price</p>
                <FormControl fullWidth>
                  <Chip
                    label={`LKR ${ticketPrice * noOfTickets}`}
                    style={{ width: "200px", height: "40px" }}
                  />
                </FormControl>
              </div>
              <div className="res_details__input">
                <FormControl fullWidth>
                  <Button
                    variant="contained"
                    style={{ width: "400px", height: "40px" }}
                    onClick={handleOpen}
                  >
                    Confirm
                  </Button>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        disableEnforceFocus
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 400,
            bgcolor: "white",
            border: "2px solid white",
            borderRadius: "20px",
            boxShadow: 24,
            p: 4,
          }}
        >
          {paymentType === 1 ? (
            <Payment
              handleClose={handleClose}
              cardNumber={cardNumber}
              cardName={cardName}
              cardExpiry={cardExpiry}
              cardCvc={cardCvc}
              setCardNumber={setCardNumber}
              setCardName={setCardname}
              setCardExpiry={setCardexpiry}
              setCardCvc={setCardcvc}
              DoReservation={DoReservation}
              totalPrice={totalPrice}
            />
          ) : (
            <MobilePay
              handleClose={handleClose}
              DoReservation={DoReservation}
              totalPrice={totalPrice}
              mobileNumber={mobileNumber}
              setmobileNumber={setmobileNumber}
              mobilePin={mobilePin}
              setmobilePin={setmobilePin}
            />
          )}
        </Box>
      </Modal>
    </>
  );
}
