import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import MovieCard from './MovieCard';
import MediaCard from '../Common/MediaCard';

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
        <div className='res_component'>
          {movies.map((movie) => {
            return (
              <MediaCard
                key={movie._id.toString()}
                id={movie._id}
                title={movie.name}
                description={movie.description}
                image={movie.banner}
                btn1='View Details'
                btn2='Book Now'
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
