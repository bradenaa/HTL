import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import events from './events';
import discussions from './discussions';
import oneDiscussion from './oneDiscussion';

const rootReducer = combineReducers({
  currentUser,
  errors,
  events,
  discussions,
  oneDiscussion
})

export default rootReducer;
