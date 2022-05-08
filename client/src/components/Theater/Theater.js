import React, { useEffect, useState } from "react";
//import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

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

//search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.2),
  },

  width: "70%",
  // [theme.breakpoints.up("sm")]: {
  //   marginLeft: theme.spacing(1),
  //   width: "auto",
  // },
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
  const Delete = () => {
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
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
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
                .map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.theaterName}
                    </TableCell>
                    <TableCell align="left">{row.location}</TableCell>
                    <TableCell align="left">{row.seatPrice}</TableCell>
                    <TableCell align="left">
                      <Button variant="outlined">
                        <Link
                          to="/theaters/update/{theater._id}"
                          style={{ textDecoration: "none" }}
                        >
                          Edit
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          Delete();
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
      {/* <Dialog
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
      </Dialog> */}
    </div>
  );
}
