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
} from '@mui/material';
import { useState, useEffect } from 'react';
import Axios from 'axios';
const API = process.env.REACT_APP_API;

export default function AddMovies() {
  const [name, setName] = useState({});
  const [description, setDescription] = useState({});
  const [cast, setCast] = useState({});
  const [theatersDB, setTheatersDB] = useState([{}]);
  const [theatersSelected, setTheatersSelected] = useState([]);
  const [showTime, setShowTime] = useState({});
  const [banner, setBanner] = useState('');

  //   function updateForm(value) {
  //     return setForm((prev) => {
  //       return { ...prev, ...value };
  //     });
  //   }
  //get theater list form db
  useEffect(() => {
    Axios.get(`${API}api/v1/theater`)
      .then((res) => {
        setTheatersDB(res.data.data);
        console.log(res.data.data);
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
      banner,
      theaters: theatersSelected,
      showTime,
    };
    console.log(movieInfo);

    Axios.post(`${API}api/v1/movies`, movieInfo)
      .then((res) => {
        alert('Added');
        window.location.reload();
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

  //upload image file in cloudinary
  async function uploadImage(file) {
    console.log('indide upload image');
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'xvtygjxv');

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/sliit-hashen/image/upload`,
      {
        method: 'POST',
        body: data,
      }
    );
    const img = await res.json();
    console.log(img.secure_url);
    setBanner(img.secure_url);
  }
  return (
    <>
      <form>
        <FormControl sx={{ width: '50ch' }}>
          <TextField
            id="outlined-basic"
            label="Movie Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
            required="true"
            helperText="Error"
          />
          <TextField
            id="outlined-basic"
            label="Movie Description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{
              maxLength: 50,
            }}
          />
          <TextField
            id="outlined-basic"
            label="Movie Cast"
            variant="outlined"
            onChange={(e) => setCast(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            onChange={(e) => uploadImage(e.target.files[0])}
            type="file"
          />
          {/* <TextField
          id='outlined-basic'
          label='Theaters'
          variant='outlined'
          onChange={(e) => setTheaters(e.target.value)}
        /> */}
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
            type="number"
          />
          <br></br>
          <Button
            variant="contained"
            style={{ width: '400px', height: '40px' }}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </>
  );
}
