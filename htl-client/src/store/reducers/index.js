import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import events from './events';
import discussions from './discussions';
import showDiscussion from './showDiscussion';
import profile from './profile'

const rootReducer = combineReducers({
  currentUser,
  errors,
  events,
  discussions,
  showDiscussion,
  profile,
})

export default rootReducer;
