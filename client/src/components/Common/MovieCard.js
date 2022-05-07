import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import { color } from '@mui/system';
import Axios from 'axios';
const API = process.env.REACT_APP_API;

export default function MediaCard({
  id,
  title,
  description,
  btn1,
  btn2,
  btn3,
  btn4,
  image,
}) {
  let history = useHistory();
  const viewDetails = () => {
    // history.push({ pathname: '/customer/reservation', id });
  };

  const bookNow = () => {
    history.push({ pathname: '/customer/reservation', id });
  };

  const updateMovie = () => {
    // history.push({ pathname: '/customer/reservation', id });
  };
  const deleteMovie = () => {
    const confirmation = window.confirm('Are you sure?');

    if (confirmation) {
      Axios.delete(`${API}api/v1/movies/${id}`)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Card sx={{ maxWidth: 350, margin: '15px' }}>
      <CardMedia component='img' height='250' image={image} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          style={{ textAlign: 'left' }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          onClick={() => {
            viewDetails();
          }}
        >
          {btn1}
        </Button>
        <Button
          size='small'
          onClick={() => {
            bookNow();
          }}
        >
          {btn2}
        </Button>
        <Button
          size='small'
          onClick={() => {
            updateMovie();
          }}
          style={{ marginLeft: '50px', color: 'green' }}
        >
          {btn3}
        </Button>
        <Button
          size='small'
          onClick={() => {
            deleteMovie();
          }}
          style={{ color: 'red' }}
        >
          {btn4}
        </Button>
      </CardActions>
    </Card>
  );
}
