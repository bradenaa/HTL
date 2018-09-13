import { combineReducers } from 'redux';
import currentUser from './currentUser';
import errors from './errors';
import events from './events';
import discussions from './discussions';
import showDiscussion from './showDiscussion';

const rootReducer = combineReducers({
  currentUser,
  errors,
  events,
  discussions,
  showDiscussion
})

export default rootReducer;
