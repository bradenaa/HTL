import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';
import { Helmet } from 'react-helmet';
import Main from './Main';
import Navbar from './Navbar';

const store = configureStore();

if(localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // prevents someone from manually tampering with the key of jwtToken
  // in localStorage because only with the right token, will someone be able // to login as the right user or at all, depending on if the token
  // represents a user like object.
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className='application'>
        <Helmet>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width" />
          <title>Hashtag Language Landing Page</title>
          <link href="https://fonts.googleapis.com/css?family=Montserrat:300,600,700" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600" rel="stylesheet" />
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous" />
        </Helmet>
        <Navbar />
        <Main />
      </div>
    </Router>
  </Provider>
)

export default App;
