import { LOAD_DISCUSSIONS, REMOVE_DISCUSSION, REMOVE_ALL } from '../actionTypes';

const discussions = (state=[], action) => {
  switch (action.type) {
    case LOAD_DISCUSSIONS:
      return [...action.discussions]
    case REMOVE_DISCUSSION:
      return state.filter(m => m._id !== action.id)
    case REMOVE_ALL:
      return []
    default:
      return state;
  }
}

export default discussions;
