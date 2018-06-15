import { LOAD_ONE_DISCUSSION, REMOVE_COMMENT, REMOVE_ALL } from '../actionTypes';

const DEFAULT_STATE = {
  comments: []
}

const oneDiscussion = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOAD_ONE_DISCUSSION:
      return {...action.oneDiscussion}
    case REMOVE_COMMENT:
      return state.filter(m => m.comment._id !== action.id)
    case REMOVE_ALL:
      return []
    default:
      return state;
  }
}

export default oneDiscussion;
