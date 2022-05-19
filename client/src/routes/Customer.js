import React from 'react';
import Footer from '../components/view/Footer';
import { Route, Switch, Redirect } from 'react-router-dom';
import Reservations from '../components/Reservations/Reservations';
import Tickets from '../components/Reservations/Tickets';
import MyReservations from '../components/Reservations/MyReservations';
import CusHeader from '../components/view/CusHeader';
import CustomerViewMovies from '../components/Customer/CustomerViewMovies';
import MovieDetails from '../components/Customer/MovieDetails';

export default function Customer() {
  return (
    <div className="customer__view">
      <CusHeader title={'Movies'} user={'customer'} />
      <Switch>
        <Route exact path="/customer/movies">
          <CustomerViewMovies />
        </Route>
        <Route exact path="/customer/reservation">
          <Reservations />
        </Route>
        <Route exact path="/customer/reservation/tickets/:id">
          <Tickets />
        </Route>
        <Route exact path="/customer/myreservations">
          <MyReservations />
        </Route>
        <Route exact path="/customer/moviedetails">
          <MovieDetails />
        </Route>
        <Redirect to="/customer/movies" />
      </Switch>
      <Footer />
    </div>
  );
}
