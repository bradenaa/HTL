import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import events from './events';

const rootReducer = combineReducers({
  currentUser,
  errors,
  events
})

export default rootReducer;
