import { LOAD_DISCUSSIONS, REMOVE_DISCUSSION } from '../actionTypes';

const discussion = (state=[], action) => {
  switch (action.type) {
    case LOAD_DISCUSSIONS:
      return [...action.discussions];
    case REMOVE_DISCUSSION:
      return state.filter(m => m._id !== action.id)
    default:
      return state;
  }
}

export default discussion;
