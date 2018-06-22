import { LOAD_ONE_DISCUSSION, REMOVE_COMMENT, REMOVE_REPLY, ADD_REPLY, REMOVE_ALL } from '../actionTypes';

const DEFAULT_STATE = {
  comments: []
}

const oneDiscussion = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOAD_ONE_DISCUSSION:
      return {...action.oneDiscussion};
    case REMOVE_COMMENT:
      return state.filter(m => m.comments._id !== action.id);
    case REMOVE_REPLY:
      return state.filter(m => m.comments.replies._id !== action.id);
    case ADD_REPLY:
      let newObj = state;
      newObj.comments.replies.push(action);
      return newObj;
    case REMOVE_ALL:
      return {};
    default:
      return state;
  }
}

export default oneDiscussion;
