import {
  SET_CURRENT_USER,
  TOGGLE_AUTH_POPUP,
} from '../actionTypes';

const DEFAULT_STATE = {
  isAuthenticated: false, // can only be true if there is a currentUser object that isn't empty
  hasPromo: false, // only place this can be turn true is by backend
  showAuthPopup: false,
  userInfo: {} // all the user information when logged in
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
    return {
        ...state,
        isAuthenticated: !!Object.keys(action.user).length,  // if there are keys true, else false
        hasPromo: action.user.hasPromo,
        userInfo: action.user,
      };
    case TOGGLE_AUTH_POPUP:
      return {...state, showAuthPopup: !state.showAuthPopup}
    default:
      return state;
  }
};
