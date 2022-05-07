import React from 'react';
import Header from '../components/view/Header';
import Footer from '../components/view/Footer';
import AdminViewMovies from '../components/MovAdmin/AdminViewMovies';
import MovAdminHeader from '../components/view/MovAdminHeader';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddMovie from '../components/MovAdmin/AddMovie';

export default function MovAdmin() {
  return (
    <div className='movadmin__view'>
      <MovAdminHeader title={'Movies'} user={'movadmin'} />
      <Switch>
        <Route exact path='/movadmin/movies'>
          <AdminViewMovies />
        </Route>
        <Route exact path='/movadmin/movies/add'>
          <AddMovie />
        </Route>
        <Route exact path='/movies/'></Route>
        <Redirect to='/movadmin/movies' />
      </Switch>
      <Footer />
    </div>
  );
}
