import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Theater.css";
import "./addTheater"
import "./editTheater"
import {
  Button,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  styled,

} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  export default function Theater() {
    const API = process.env.REACT_APP_API;
    const [theaters, settheaters]= useState([]);
    
    //get theaters from the database
    useEffect(() => {
        Axios.get(`${API}api/v1/theater`).then((res) => {
        console.log(res.data.data);
        settheaters([res.data.data]);
        });
    }, []);
    //console.log(API);

    return (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell><b>Theater ID</b></StyledTableCell>
                    <StyledTableCell align="left">Theater Name</StyledTableCell>
                    <StyledTableCell align="left">Location</StyledTableCell>
                    <StyledTableCell align="left">Price per seat&nbsp;(LK)</StyledTableCell>
                    <StyledTableCell align="left">Edit</StyledTableCell>
                    <StyledTableCell align="left">Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {theaters.map((theater,index) => (
                        <StyledTableRow key={theater.theaterID}>
                          <StyledTableCell component="th" scope="row">{theater.theaterID}</StyledTableCell>
                          <StyledTableCell align="left">{theater.theaterName}</StyledTableCell>
                          <StyledTableCell align="left">{theater.Array[index].seatPrice}</StyledTableCell>
                          <StyledTableCell align="left">{theater.Array[index].location}</StyledTableCell>
                          <StyledTableCell align="left"><Button variant="contained" style={{ width: "100px", height: "35px" }}>Edit</Button></StyledTableCell>
                          <StyledTableCell align="left"><Button variant="contained" colostyle={{ width: "100px", height: "35px" }}>Delete</Button></StyledTableCell>
                        </StyledTableRow>
                        
                    ))}
                </TableBody>    
            </Table>
        </TableContainer>
    );
  }