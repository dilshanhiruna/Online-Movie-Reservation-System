import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import MovieCard from '../Common/MovieCard';
import { Grid } from '@mui/material';

const API = process.env.REACT_APP_API;

export default function AdminViewMovies() {
  //array to store all movies retrieved from the db
  const [movies, setMovies] = useState([]);

  //axios call to get all movies backedn endpoint
  useEffect(() => {
    Axios.get(`${API}api/v1/movies`)
      .then((res) => {
        setMovies(res.data.data);
        movies.map((movie) => {});
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Display retrieved movies (Passing details for a separate movie card component)
  return (
    <>
      <div>
        <div className="movie_component">
          <Grid
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            {movies.map((movie) => (
              <MovieCard
                key={movie._id.toString()}
                movie={movie}
                btn3="Update"
                btn4="Delete"
              />
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
}
