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


export function authUser(){
  return dispatch => {
    // wrap our thunk in a promise so that we can wait for the API call
    return new Promise((resolve, reject) => {
      return apiCall("GET", `http://localhost:8081/api/auth/twitter`)
        .then( data => {
          console.log(data);
          dispatch(removeError());
          resolve(); // indicate that the API call succeeded
        })
        .catch(err => {
          console.log(err);
          // add the error by calling the addError action
          // which is passed to the state and then to the props through
          // mapStateToProps
          // dispatch(addError(err.message));
          reject(); // indicate that the API call failed
        });
    });
  }
}
