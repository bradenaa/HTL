import { LOAD_DISCUSSIONS, REMOVE_DISCUSSION, REMOVE_ALL, ADD_DISCUSSION, TOGGLE_DISCUSSION_FORM } from '../actionTypes';


const discussions = (state = {
  discussions: [],
  showDiscussionForm: false
}, action) => {
  switch (action.type) {
    case LOAD_DISCUSSIONS:
      return {...state, discussions: action.discussions}
    case TOGGLE_DISCUSSION_FORM:
      return {...state, showDiscussionForm: !state.showDiscussionForm}
    case ADD_DISCUSSION:
      return {...state, discussions: [...state.discussions, action.discussion]};
    case REMOVE_DISCUSSION:
      return {...state, discussions: state.discussions.filter(m => m._id !== action.discussionID)};
    case REMOVE_ALL:
      return []
    default:
      return state;
  }
}

export default discussions;
