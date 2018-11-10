import {
  LOAD_PROFILE
} from '../actionTypes';

const DEFAULT_STATE = {
  _id: '',
  discussions: [],
  displayName: '',
  email: '',
  events: [],
  hasPromo: true,

};

const profile = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOAD_PROFILE:
      return {
        ...state,
        _id: action.profile._id,
        discussions: action.profile.discussions,
        displayName: action.profile.displayName,
        email: action.profile.email,
        events: action.profile.events,
        hasPromo: action.profile.hasPromo,
      };
    default:
      return state;
  }
}

export default profile;
