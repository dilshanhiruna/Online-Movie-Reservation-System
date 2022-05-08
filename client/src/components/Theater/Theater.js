import React, { useEffect, useState } from "react";
//import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";

import "./Theater.css";
import "./AddTheater";
import "./EditTheater";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

//material design
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.2),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
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
  useEffect(() => {
    Axios.get(`${API}api/v1/theater`).then((res) => {
      console.log(res.data.data);
      settheaters(res.data.data);
    });
  }, []);

  //delete model confirmation
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //delete particular theater
  // const deleteTheater = (id) => {
  //   Axios.delete(`${API}api/v1/theater/${id}`).then((res) => {
  //     console.log("deleted");
  //   });
  // };
  //redirect to another route
  // const history = useHistory();

  // const routeChangetoInsert = () => {
  //   let path = `/theaters/add`;
  //   history.push(path);
  // };

  return (
    <div className="res_details__title">
      <div className="header__right">
        <Button
          variant="contained"
          color="success"
          sx={{ ml: "850px", display: "flex" }}
          // onClick={routeChangetoInsert}
          onClick={(event) => (window.location.href = "/theaters/add")}
        >
          Add Theater
        </Button>

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
      <br />
      <br />
      <div>
        <TableContainer component={Paper}>
          <Table
            sx={{ maxWidth: 900, mx: "280px" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Theater Name</StyledTableCell>
                <StyledTableCell align="left">Location</StyledTableCell>
                <StyledTableCell align="left">
                  Price per seat&nbsp;(LK)
                </StyledTableCell>
                <StyledTableCell align="left">Edit</StyledTableCell>
                <StyledTableCell align="left">Delete</StyledTableCell>
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
                .map((theater) => (
                  <StyledTableRow key={theater.theaterName}>
                    <StyledTableCell align="left">
                      {theater.theaterName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {theater.location}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {theater.seatPrice}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Button
                        variant="contained"
                        style={{ width: "100px", height: "35px" }}
                      >
                        <Link to="/theaters/update/{theater._id}">Edit</Link>
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Button
                        variant="contained"
                        color="error"
                        colostyle={{ width: "100px", height: "35px" }}
                        onClick={handleClickOpen}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" sx={{ m: 0, p: 2 }}>
              {"Delete Confirmation"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <img
                  src="https://www.pngplay.com/wp-content/uploads/5/Question-Mark-Symbol-PNG-Images-HD.png"
                  alt="question mark"
                  className="img_delete"
                />
                <br />
                Are you sure you want to delete the theater?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="success"
                colostyle={{ width: "100px", height: "35px" }}
                onClick={handleClose}
              >
                No
              </Button>
              <Button
                variant="contained"
                color="error"
                colostyle={{ width: "100px", height: "35px" }}
                // onClick={deleteTheater()}
                autoFocus
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
