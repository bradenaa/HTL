import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from '../actionTypes';
import { addError, removeError } from './errors';

// Here we will run a function that will accept a user object and return the action from current user action.
// The current user action, checks to see if the user object passes contains any keys
// The api call to the back end server would only return a non-empty object if everything is authenticated on the backend side, therefore someone could only login if authenticated on the back end side.
export function setCurrentUser(user){
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function authUser(type, response){
  return dispatch => {
    // wrap our thunk in a promise so that we can wait for the API call
    return new Promise((resolve, reject) => {
      const tokenBlob = new Blob(
        [JSON.stringify({access_token: response.accessToken}, null, 2)],
        {type: 'application/json'}
      );
      const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
      };
      console.log(tokenBlob);
      fetch(`http://localhost:8081/api/auth/${type}`, options)
        .then(user => user.json())
        .then(user => {
          // sets the token in the local storage
          localStorage.setItem("jwtToken", user.token);
          // gives an authorization header of Bearer plus token
          setAuthorizationToken(user.token);
          // calls the setCurrentUser action, and passes the user that was responded
          console.log("user: ", user);
          dispatch(setCurrentUser(user));
          // because there was no error, we want to go ahead and remove any error that may be currently set in the state, so we call the removeError action
          dispatch(removeError());
          resolve(); // indicate that the API call succeeded
        })
        .catch(err => {
          console.log(err);
          // add the error by calling the addError action
          // which is passed to the state and then to the props through
          // mapStateToProps
          dispatch(addError(err));
          reject(); // indicate that the API call failed
        });
    });
  }
}


export function twitterAuth(response) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return response.json().then(user => {
        // sets the token into the localStorage
        localStorage.setItem("jwtToken", user.token);
        // gives an authorization header of Bearer plus token - to be decoded on backendside
        setAuthorizationToken(user.token);
        // will call the setCurrentUser action, and passes the user object
        console.log("user: ", user);
        dispatch(setCurrentUser(user));
        // because there was no error, we want to go ahead and remove errors
        dispatch(removeError());
        resolve();
      })
      .catch(err => {
        console.log(err);
        // add the error by calling the addError action
        // which is passed to the state and then to the props through
        // mapStateToProps
        dispatch(addError(err.message));
        reject();
      })
    })
  }
}

export function logout() {
  return dispatch => {
    // removes the token from local storage
    localStorage.clear();
    // removes the token from request headers
    setAuthorizationToken(false);
    // sets the currentUser state to an empty object
    // which will make isAuthenticated to be falsey
    dispatch(setCurrentUser({}));
  }
}
