import { LOAD_ONE_DISCUSSION, TOGGLE_COMMENT_FORM, ADD_COMMENT, REMOVE_COMMENT, REMOVE_REPLY, ADD_REPLY, REMOVE_ALL } from '../actionTypes';

const DEFAULT_STATE = {
  showCommentForm: false,
  comments: [],
  date: '',
  post: '',
  title: '',
  userCreated: '',
  _id: ''
}

const oneDiscussion = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOAD_ONE_DISCUSSION:
      return {...state,
        comments: action.oneDiscussion.comments,
        date: action.oneDiscussion.date,
        post: action.oneDiscussion.post,
        title: action.oneDiscussion.title,
        userCreated: action.oneDiscussion.userCreated,
        _id: action.oneDiscussion._id
      };
    case TOGGLE_COMMENT_FORM:
      return {...state, showCommentForm: !state.showCommentForm}
    case ADD_COMMENT:
      return {...state, comments: [...state.comments, action.comment]}
    case REMOVE_COMMENT:
      return {...state, comments: state.comments.filter(c => c._id !== action.commentID)}
    case REMOVE_REPLY:
      return state
    case ADD_REPLY:
      return state;
    case REMOVE_ALL:
      return {};
    default:
      return state;
  }
}

// const oneDiscussion = (state = DEFAULT_STATE, action) => {
//   switch (action.type) {
//     case LOAD_ONE_DISCUSSION:
//       return {...action.oneDiscussion};
//     case REMOVE_COMMENT:
//       let newState = state;
//       let newComments = state.comments.filter(m => m.comments._id !== action.id);
//       newState.comments = newComments;
//       return newState;
//     case REMOVE_REPLY:
//       return state.comments.filter(m => m.comments.replies._id !== action.id);
//     case ADD_REPLY:
//     // takes the old state and updates the comments array
//     // to include the new reply associated with that comment
//       console.log("current state: ", state);
//       let newStateForReply = state;
//       let newReplies = newStateForReply.comments.map(c => {
//           if (c._id === action.data.commentID) {
//             // console.log("found the associated comment:", c._id)
//             console.log("attemping to push in: ", action.data.foundReply)
//             c.replies.push(action.data.foundReply)
//           }
//           return c;
//       })
//       newStateForReply.comments = newReplies;
//       console.log("attempting to update state to: ", newStateForReply);
//       return newStateForReply;
//     case REMOVE_ALL:
//       return {};
//     default:
//       return state;
//   }
// }

export default oneDiscussion;
