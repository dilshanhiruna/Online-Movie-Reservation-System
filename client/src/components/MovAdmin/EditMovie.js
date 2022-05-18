import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory, useLocation } from "react-router";

const API = process.env.REACT_APP_API;

export default function EditMovie() {
  const location = useLocation();
  console.log(location.movie.name);
  const [id, setId] = useState(location.movie._id);
  const [name, setName] = useState(location.movie.name);
  const [description, setDescription] = useState(location.movie.description);
  const [cast, setCast] = useState(location.movie.cast);
  const [theatersDB, setTheatersDB] = useState([{}]);
  const [theatersSelected, setTheatersSelected] = useState([]);
  const [showTime, setShowTime] = useState(location.movie.showTime);
  const history = useHistory();

  //get theater list form db
  useEffect(() => {
    Axios.get(`${API}theaters/getall`)
      .then((res) => {
        setTheatersDB(res.data.data);
        console.log(theatersDB);
        theatersDB.map((theater) => {
          console.log(theater.theaterName);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  async function onSubmit(e) {
    e.preventDefault();
    console.log(theatersSelected);
    const movieInfo = {
      name,
      description,
      cast,
      theaters: theatersSelected,
      showTime,
    };
    console.log(movieInfo);

    Axios.put(`${API}movies/update/${id}`, movieInfo)
      .then((res) => {
        alert("Updated");
        history.push({ pathname: "/movadmin/movies" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getSelectedTheaters = (value, isChecked) => {
    // console.log(value + isChecked);
    if (isChecked) {
      setTheatersSelected((arr) => [...arr, `${value}`]);
    } else {
      for (var i = 0; i < theatersSelected.length; i++) {
        if (theatersSelected[i] === value) {
          theatersSelected.splice(i, 1);
        }
      }
    }
  };
  return (
    <>
      <FormControl sx={{ width: "50ch" }}>
        <TextField
          id="outlined-basic"
          label="Movie Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          defaultValue={name}
        />
        <TextField
          id="outlined-basic"
          label="Movie Description"
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={description}
        />
        <TextField
          id="outlined-basic"
          label="Movie Cast"
          variant="outlined"
          onChange={(e) => setCast(e.target.value)}
          defaultValue={cast}
        />

        <FormGroup>
          <p id="label">Select Theaters:</p>

          {theatersDB.map((theater) => {
            return (
              <FormControlLabel
                key={theater._id}
                control={<Checkbox />}
                label={theater.theaterName}
                value={theater._id}
                onChange={(e) =>
                  getSelectedTheaters(e.target.value, e.target.checked)
                }
              />
            );
          })}
        </FormGroup>
        <TextField
          id="outlined-basic"
          label="Show Time"
          variant="outlined"
          onChange={(e) => setShowTime(e.target.value)}
          defaultValue={showTime}
        />
        <br></br>
        <Button
          variant="contained"
          style={{ width: "400px", height: "40px" }}
          onClick={onSubmit}
        >
          Submit
        </Button>
      </FormControl>
    </>
  );
}
