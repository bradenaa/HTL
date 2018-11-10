import { LOAD_EVENTS, REMOVE_EVENT } from '../actionTypes';

const event = (state=[], action) => {
  switch (action.type) {
    case LOAD_EVENTS:
      return [...action.events];
    case REMOVE_EVENT:
      return state.filter(m => m._id !== action._id)
    default:
      return state;
  }
}

export default event;
