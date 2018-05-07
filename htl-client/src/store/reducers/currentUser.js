import { SET_CURRENT_USER } from '../actionTypes';

const DEFAULT_STATE = {
  isAuthenticated: false, // hopefully true when logged in
  user: {} // all the user information when logged in
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        // turn empty object into false or if there are keys, then true
        // if there are keys true, else false
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      };
    default:
      return state;
  }
};
