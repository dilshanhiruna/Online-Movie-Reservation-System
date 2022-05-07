import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function MyReservations() {
  const API = process.env.REACT_APP_API;
  const [Reservations, setReservations] = useState([]);

  useEffect(() => {
    //get all reservations
    Axios.get(`${API}api/v1/reservations`).then((res) => {
      setReservations(res.data.data);
    });
  }, []);

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
    <div style={{ display: "flex", justifyContent: "center" }}>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "90%", marginTop: "30px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Movie</TableCell>
              <TableCell align="right">Theater</TableCell>
              <TableCell align="right">Tickets</TableCell>
              <TableCell align="right">Movie Date</TableCell>
              <TableCell align="right">Movie Time</TableCell>
              <TableCell align="right">Payment Type</TableCell>
              <TableCell align="right">Price (LKR)</TableCell>
              <TableCell align="right">Reserved Date</TableCell>
              <TableCell align="right">View Tickets</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Reservations.reverse().map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.movieName}
                </TableCell>
                <TableCell align="right">{row.theaterName}</TableCell>
                <TableCell align="right">{row.noOfTickets}</TableCell>
                <TableCell align="right">
                  {new Date(row.date).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">{getTimeSlot(row.timeSlot)}</TableCell>
                <TableCell align="right">
                  {getPaymentType(row.paymentType)}
                </TableCell>
                <TableCell align="right">{row.totalPrice}</TableCell>
                <TableCell align="right">
                  {new Date(row.reservedDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained">
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "white",
                      }}
                      to={`/customer/reservation/tickets/${row._id}`}
                    >
                      View
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
