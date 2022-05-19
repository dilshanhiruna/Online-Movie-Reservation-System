import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import MovieCard from '../Common/MovieCard';
import './CustomerViewMovies.css';
import { Grid } from '@mui/material';

const API = process.env.REACT_APP_API;

export default function CustomerViewMovies() {
  const [movies, setMovies] = useState([]);
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
            {movies.map((movie) => {
              return (
                <MovieCard
                  key={movie._id.toString()}
                  movie={movie}
                  btn1="View Details"
                  btn2="Book Now"
                />
              );
            })}
          </Grid>
        </div>
      </div>
    </>
  );
}
