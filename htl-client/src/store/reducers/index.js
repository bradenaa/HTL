import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import events from './events';
import discussions from './discussions';

const rootReducer = combineReducers({
  currentUser,
  errors,
  events,
  discussions
})

export default rootReducer;
