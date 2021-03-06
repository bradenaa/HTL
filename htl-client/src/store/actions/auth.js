import { apiCall, setTokenHeader } from "../../services/api";
import { addError, removeError } from './errors';
import {
  SET_CURRENT_USER,
  SET_PROMO,
  TOGGLE_AUTH_POPUP,
} from '../actionTypes';

//TODO: read a little about blogs compared to other data structures

// Here we will run a function that will accept a user object and return the action from current user action.
// The current user action, checks to see if the user object passes contains any keys
// The api call to the back end server would only return a non-empty object if everything is authenticated on the backend side, therefore someone could only login if authenticated on the back end side.
export const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    user
});

export const setPromo = (promo) => ({
    type: SET_PROMO,
    promo
});

export const toggleAuthPopup = () => ({
  type: TOGGLE_AUTH_POPUP
})

export function setAuthorizationToken(token) {
  return setTokenHeader(token)
};

/**
* Handles the initial request response from Facebook and Google
* Passes accessToken in form of a Blob to the backend to complete authentication
* The respose from the backend is either an error or an authenticated JWT token
* JWT token is stored in local storage and User information dispatched to setCurrentUser
* @param {string} type social media provider name (lowercase)
* @param {object} response reponse from the social media API call
**/
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
      fetch(`http://localhost:8081/api/auth/${type}`, options)
        .then(user => user.json())
        .then(user => {
          localStorage.setItem("jwtToken", user.token);
          console.log(user);
          setAuthorizationToken(user.token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve(); // indicate that the API call succeeded
        })
        .catch(err => {
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
        localStorage.setItem("jwtToken", user.token);
        setAuthorizationToken(user.token);
        dispatch(setCurrentUser(user));
        dispatch(removeError());
        resolve();
      })
      .catch(err => {
        dispatch(addError(err.message));
        reject();
      })
    })
  }
}

/**
* makes a request to the backend to check on promo submitted
* response is only 200 if Promo is confirmed
* @param {string} promo string submitted by the user
* @param {string} userID ID of the currentUser
**/
export const submitPromo = (promo, userID) => {
  return dispatch => {
    return apiCall('put', `api/auth/users/${userID}/promo/${promo}`)
      .then(res => {
        localStorage.setItem("jwtToken", res.token)
        setAuthorizationToken(res.token);
        dispatch(setCurrentUser(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      })
  }
}

/**
* Removes JWT from localStorage
* Sets auth header to false for future backend requests
* dispatches an empty object to remove currentUser information
**/
export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}
