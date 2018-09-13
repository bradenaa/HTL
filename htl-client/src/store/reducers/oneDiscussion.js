import {
  LOAD_ONE_DISCUSSION,
  TOGGLE_COMMENT_FORM,
  ADD_COMMENT,
  REMOVE_COMMENT,

  TOGGLE_REPLY_FORM,
  TOGGLE_REPLY_LIST,
  SHOW_REPLY_LIST,
  ADD_REPLY,
  REMOVE_REPLY,
  REMOVE_ALL,
} from '../actionTypes';

const DEFAULT_STATE = {
  showCommentForm: false,
  comments: [],
  date: '',
  post: '',
  title: '',
  userCreated: '',
  _id: '',
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
        _id: action.oneDiscussion._id,
      };
    case TOGGLE_COMMENT_FORM:
      return {...state, showCommentForm: !state.showCommentForm}
    case ADD_COMMENT:
      return {...state, comments: [...state.comments, action.comment]}
    case REMOVE_COMMENT:
      return {...state, comments: state.comments.filter(c => c._id !== action.commentID)}
    case TOGGLE_REPLY_FORM:
      return {
        ...state,
        comments: state.comments.map( c => (c._id === action.commentID) ? {...c, showReplyForm: !c.showReplyForm} : {...c} )
      };
    case TOGGLE_REPLY_LIST:
      return {
        ...state,
        comments: state.comments.map( c => (c._id === action.commentID) ? {...c, showReplyList: !c.showReplyList} : {...c} )
      };
    case SHOW_REPLY_LIST:
     return {
       ...state,
       comments: state.comments.map( c => (c._id === action.commentID) ? {...c, showReplyList: true} : {...c})
     }
    case ADD_REPLY:
      return {
        ...state,
        comments: state.comments.map( c => (c._id === action.commentID) ? {...c, replies: [...c.replies, action.reply]} : c)
      };
    case REMOVE_REPLY:
      return {
        ...state,
        comments: state.comments.map( c => (c._id === action.commentID) ? {...c, replies: c.replies.filter( r => r._id !== action.replyID)} : c)
      }
    case REMOVE_ALL:
      return {};
    default:
      return state;
  }
}

export default oneDiscussion;
