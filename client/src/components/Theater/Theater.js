import React, { useEffect, useState } from "react";
//import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

import "./Theater.css";

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
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

//search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.2),
  },

  width: "70%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Theater() {
  const API = process.env.REACT_APP_API;

  const [theaters, settheaters] = useState([]);
  const [searchedValue, setSearchedValue] = useState("");
  const [open, setOpen] = useState(false);

  //get all theaters from the database
  const getAllTheaters = () => {
    Axios.get(`${API}api/v1/theater`).then((res) => {
      settheaters(res.data.data);
    });
  };

  useEffect(() => {
    getAllTheaters();
  }, []);

  // //delete model confirmation
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const Delete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`${API}api/v1/theater/${id}`).then((res) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          getAllTheaters();
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        });
      }
    });
  };

  return (
    <div className="res_details__title">
      <div className="header__right"></div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => setSearchedValue(e.target.value)}
          />
        </Search>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <TableContainer
          component={Paper}
          sx={{ maxWidth: "70%", marginTop: "30px" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Theater Name</TableCell>
                <TableCell align="left">Location</TableCell>
                <TableCell align="left"> Seat Price&nbsp;(LK)</TableCell>
                <TableCell align="left">Edit</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {theaters
                .filter(
                  (row) =>
                    // note that I've incorporated the searchedVal length check here
                    !searchedValue.length ||
                    row.theaterName
                      .toString()
                      .toLowerCase()
                      .includes(searchedValue.toString().toLowerCase())
                )
                .reverse()
                .map((row, key) => (
                  <TableRow
                    key={key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.theaterName}
                    </TableCell>
                    <TableCell align="left">{row.location}</TableCell>
                    <TableCell align="left">{row.seatPrice}</TableCell>
                    <TableCell align="left">
                      <Link
                        to={`/theaters/update/${row._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button variant="outlined"> Edit</Button>
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          Delete(row._id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
