import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import MovieCard from '../Common/MovieCard';
import { Grid } from '@mui/material';

const API = process.env.REACT_APP_API;

export default function AdminViewMovies() {
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
        {/* <div className="movie_component">
          {movies.map((movie) => {
            return (
              <MovieCard
                key={movie._id.toString()}
                // id={movie._id}
                // title={movie.name}
                // description={movie.description}
                // image={movie.banner}
                movie={movie}
                btn3="Update"
                btn4="Delete"
              />
            );
          })}
        </div> */}
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
                // id={movie._id}
                // title={movie.name}
                // description={movie.description}
                // image={movie.banner}
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
