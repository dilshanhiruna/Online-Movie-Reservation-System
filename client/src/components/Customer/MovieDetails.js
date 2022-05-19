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
  Grid,
  TextareaAutosize,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory, useLocation } from 'react-router';

const API = process.env.REACT_APP_API;

export default function MovieDetails() {
  const location = useLocation();
  //console.log(location.movie.name);
  const [id, setId] = useState(location.movie._id);
  const [name, setName] = useState(location.movie.name);
  const [description, setDescription] = useState(location.movie.description);
  const [cast, setCast] = useState(location.movie.cast);
  const [theaters, setTheaters] = useState([]);
  const [theaterIds, setTheaterIds] = useState(location.movie.theaters);
  const [showTime, setShowTime] = useState(location.movie.showTime);
  const history = useHistory();
  const [banner, setBanner] = useState(location.movie.banner);

  //calling get theaters endpoint to get the theater object of given theater Ids and storing them in theaters array
  useEffect(() => {
    theaterIds.map((theaterId) => {
      Axios.get(`${API}api/v1/theater/${theaterId}`)
        .then((res) => {
          setTheaters((prev) => [...prev, res.data.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  // Displaying all movie details
  return (
    <>
      <Grid container spacing={4} style={{ padding: '25px 10px 20px 150px' }}>
        <Grid item xs={4}>
          <img
            style={{ maxWidth: '100%', maxHeight: '600px' }}
            src={`${banner}`}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ width: '50ch' }}>
            <TextField
              id="outlined-basic"
              label="Movie Name"
              variant="outlined"
              defaultValue={name}
              inputProps={{ readOnly: true }}
            />
            <br></br>

            <TextareaAutosize
              id="outlined-basic"
              aria-label="Movie Description"
              label="Movie Description"
              minRows={3}
              placeholder="Movie Description"
              style={{
                width: '92%',
                fontSize: '17px',
                backgroundColor: 'transparent',
                borderColor: '#B8B8B8',
                padding: '15px',
                borderRadius: '5px',
              }}
              maxLength="200"
              defaultValue={description}
              readOnly={true}
            />
            <br></br>
            <TextField
              id="outlined-basic"
              label="Movie Cast"
              variant="outlined"
              defaultValue={cast}
              inputProps={{ readOnly: true }}
            />
            <br></br>

            <FormGroup>
              <p id="label">Available Theaters:</p>
              <Select label="theater" style={{ width: '200px' }}>
                {theaters.map((theater) => (
                  <MenuItem value={theater}>{theater.theaterName}</MenuItem>
                ))}
              </Select>
              <br></br>
            </FormGroup>
            <TextField
              id="outlined-basic"
              label="Show Time"
              variant="outlined"
              defaultValue={showTime}
              inputProps={{ readOnly: true }}
            />
            <br></br>
          </FormControl>{' '}
        </Grid>
      </Grid>
    </>
  );
}

//styling
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingRight: '100px',
  },
  preview: {
    marginTop: 20,
  },
  image: { maxWidth: '100%', maxHeight: '600px' },
  delete: {
    cursor: 'pointer',
    padding: 15,
    background: 'red',
    color: 'white',
    border: 'none',
  },

  box1: {
    backgroundColor: '#000',
    color: '#fff',
    opacity: '.5',
  },
};
