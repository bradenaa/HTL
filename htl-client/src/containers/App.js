import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router } from 'react-router-dom';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

import Main from './Main';

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
      <div>
        <Main />
      </div>
    </Router>
  </Provider>
)

export default App;
