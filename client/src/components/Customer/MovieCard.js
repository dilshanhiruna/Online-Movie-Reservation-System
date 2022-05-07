import { dividerClasses } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function MovieCard(props) {
  const movie = props.movie;

  return (
    <>
      <div>{movie.name}</div>
      <div>{movie.description}</div>
    </>
  );
}
