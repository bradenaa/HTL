import { LOAD_DISCUSSIONS, REMOVE_DISCUSSION, REMOVE_ALL, ADD_DISCUSSION } from '../actionTypes';


const discussions = (state = [], action) => {
  switch (action.type) {
    case LOAD_DISCUSSIONS:
      return [...action.discussions]
    case ADD_DISCUSSION:
      return [...state, action.discussion]
    case REMOVE_DISCUSSION:
      return state.filter(m => m._id !== action.id)
    case REMOVE_ALL:
      return []
    default:
      return state;
  }
}

export default discussions;
