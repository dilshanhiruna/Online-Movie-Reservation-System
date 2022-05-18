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
  const [selectedImage, setSelectedImage] = useState('');

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
        alert('Added Movie');
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert('All fileds are required!');
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
    //setting the uploaded image as the selected image
    setSelectedImage(file);
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
    //setting the saved image url as the banner
    setBanner(img.secure_url);
  }

  return (
    <>
      <Grid container spacing={10} style={{ paddingLeft: '70px' }}>
        <Grid item xs={5}>
          <TextField
            style={{ width: '100%' }}
            id="outlined-basic"
            variant="outlined"
            onChange={(e) => uploadImage(e.target.files[0])}
            type="file"
          />
          {selectedImage && (
            <div style={styles.preview}>
              <img
                src={URL.createObjectURL(selectedImage)}
                style={styles.image}
                alt="Thumb"
              />
            </div>
          )}
          {selectedImage == '' ? (
            <img
              style={{ maxWidth: '100%', maxHeight: '600px' }}
              src={
                'https://res.cloudinary.com/sliit-hashen/image/upload/v1652898560/ymmukdma1eehcqn0bnk5.webp'
              }
            />
          ) : (
            ''
          )}
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ width: '50ch' }}>
            <TextField
              id="outlined-basic"
              label="Movie Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
            <br></br>
            <TextField
              id="outlined-basic"
              label="Movie Description"
              variant="outlined"
              onChange={(e) => setDescription(e.target.value)}
              inputProps={{
                maxLength: 50,
              }}
            />
            <br></br>
            <TextField
              id="outlined-basic"
              label="Movie Cast"
              variant="outlined"
              onChange={(e) => setCast(e.target.value)}
            />
            <br></br>

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
              <br></br>
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
  image: { maxWidth: '100%', maxHeight: '500px' },
  delete: {
    cursor: 'pointer',
    padding: 15,
    background: 'red',
    color: 'white',
    border: 'none',
  },
};
