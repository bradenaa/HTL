import { apiCall } from '../../services/api';
import { addError } from './errors';
import {
  LOAD_DISCUSSIONS,
  TOGGLE_DISCUSSION_FORM,
  ADD_DISCUSSION,
  REMOVE_DISCUSSION,

  LOAD_ONE_DISCUSSION,
  TOGGLE_COMMENT_FORM,
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_UP_VOTE,

  TOGGLE_REPLY_FORM,
  TOGGLE_REPLY_LIST,
  SHOW_REPLY_LIST,
  REMOVE_REPLY,
  ADD_REPLY,
 } from '../actionTypes';

 // ++++++++++++++++++++++++++++++++++++++++
 // ========== Action Creators =============
 // ++++++++++++++++++++++++++++++++++++++++

 // MAIN DISCUSSION

export const loadDiscussions = discussions => ({
  type: LOAD_DISCUSSIONS,
  discussions
});

export const toggleDiscussionForm = () => ({
  type: TOGGLE_DISCUSSION_FORM
})

export const addDiscussionToState = discussion => ({
  type: ADD_DISCUSSION,
  discussion,
})

export const removeDiscussionFromState = discussionID => ({
  type: REMOVE_DISCUSSION,
  discussionID,
});

export const addUpVote = (userID, discussionID) => ({
  type: ADD_UP_VOTE,
  userID,
  discussionID,
})

// SHOW MORE DISCUSSION

export const loadOneDiscussion = showDiscussion => ({
  type: LOAD_ONE_DISCUSSION,
  showDiscussion
});

export const toggleCommentForm = () => ({
  type: TOGGLE_COMMENT_FORM
})

export const addComment = comment => ({
  type: ADD_COMMENT,
  comment
})

export const removeComment = commentID => ({
  type: REMOVE_COMMENT,
  commentID
});

export const toggleReplyForm = commentID => ({
  type: TOGGLE_REPLY_FORM,
  commentID
})

export const toggleReplyList = commentID => ({
  type: TOGGLE_REPLY_LIST,
  commentID
})

export const showReplyList = commentID => ({
  type: SHOW_REPLY_LIST,
  commentID
})

export const addReply = (commentID, reply) => ({
  type: ADD_REPLY,
  commentID,
  reply,
});

export const removeReply = (commentID, replyID) => ({
  type: REMOVE_REPLY,
  commentID,
  replyID
});

export const removeAll = () => ({
  type: REMOVE_DISCUSSION
});

// ++++++++++++++++++++++++++++++++++++++++
// ============ Discussions ================
// ++++++++++++++++++++++++++++++++++++++++

// Thunk that returns an API call, which retrieves all discussions from backend
// and then dispatches the responding data to the discussions.js reducer
export const fetchDiscussions = () => {
  console.log("Fetch discussions was called");
  return dispatch => {
    return apiCall("get", '/api/discussions')
      .then(res => dispatch(loadDiscussions(res)))
      .catch(err => dispatch(addError(err.message)))
  };
};

/**
* Thunk that returns API call which is posting new discussion to the backend
* Will not dispatch except from an error
* @param {object} data text from the post
**/
export const postNewDiscussion = ( data )  => (dispatch, getState) => {
  let { currentUser } = getState();
  dispatch(toggleDiscussionForm());
  const userID = currentUser.userInfo._id;
  return apiCall('post', `/api/user/${userID}/discussions`, data)
    .then(res => dispatch(addDiscussionToState(res)))
    .catch(err => dispatch(addError(err.message)))
}

/**
* Thunk makes API call to delete specified discussion from server side
* On the completion of the API call, the dispatch action is initialized
* and the dispatch action then deletes from the client side
* @param {string} userID currentUser ID obtained from the store
* @param {string} discussionID the id of the DiscussionItem component
**/
export const removeDiscussion = (userID, discussionID) => {
  return dispatch => {
    return apiCall('delete', `/api/user/${userID}/discussions/${discussionID}`)
      .then(() => dispatch(removeDiscussionFromState(discussionID)))
      .catch(err => dispatch(addError(err.message)))
  };
};

/**
* @param {string} userID currentUser ID obtained from the store
* @param {string} discussionID the id of the DiscussionItem component
**/
export const upVoteDiscussion = (userID, discussionID) => (dispatch, getState) => {
  return apiCall('put', `/api/user/${userID}/discussions/${discussionID}`)
    .then(res => dispatch(addUpVote(userID, discussionID)))
    .catch(err => dispatch(addError(err.message)))
};

/**
* A thunk that returns API call to retrieve a specic discussion from database.
* The responding data from API call is then dispatched to be handled in the reducer
* @param {string} userID currentUser ID obtained from the store
* @param {string} discussionID the id of the DiscussionItem component
**/
export const fetchOneDiscussion = (userID, discussionID) => {
  return dispatch => {
    return apiCall('get', `/api/user/${userID}/discussions/${discussionID}`)
      .then(res => dispatch(loadOneDiscussion(res)))
      .catch(err => dispatch(addError(err.message)))
  };
};

// ++++++++++++++++++++++++++++++++++++++++
// ============ COMMENTS ==================
// ++++++++++++++++++++++++++++++++++++++++

/**
* A thunk that returns API call, which posts new comments to backend
* The response is the updated discussion, which is then dispatched to loadOneDiscussion
* @param {string} discussionID id of discussion received from props
* @param {string} data object containing a text string
**/
export const postNewCommentToDiscussion = ( discussionID, data ) => (dispatch, getState) => {
  let { currentUser } = getState();
  const userID = currentUser.userInfo._id;
  dispatch(toggleCommentForm());
  return apiCall('post', `/api/user/${userID}/discussions/${discussionID}`, data)
    .then(res => dispatch(addComment(res)))
    .catch(err => dispatch(addError(err.message)))
}

/**
* A thunk that returns an API call, which removes comment from backend
* dispatch is then called to send the comment to be removed from the current state
* @param {string} userID ID of the author that made the comment
* @param {string} discussionID ID of the discussion the comment is associated with
* @param {string} commentID ID of the specific comment that was made
**/
export const removeCommentAndDispatch = (userID, discussionID, commentID) => {
  return dispatch => {
    return apiCall('delete', `/api/user/${userID}/discussions/${discussionID}/comments/${commentID}`)
      .then(() => dispatch(removeComment(commentID)))
      .catch(err => dispatch(addError(err.message)))
  };
};

// ++++++++++++++++++++++++++++++++++++++++
// ============ COMMENT REPLY =============
// ++++++++++++++++++++++++++++++++++++++++

/**
* A thunk that returns an API, which posts a new reply to a comment
* The response is the new reply object and associated commentID
* The response is then dispatched
* @param {string} commentID ID of comment that the reply is going to be associated with
* @param {object} data object containing a text string
* TODO: keep the show replies state to be true, instead of defaulting back to false
**/
export const postNewReplyToComment = ( commentID, data ) => (dispatch, getState) => {
  let { currentUser, showDiscussion } = getState();
  const userID = currentUser.userInfo._id;
  const discussionID = showDiscussion._id;
  dispatch(toggleReplyForm(commentID))
  dispatch(showReplyList(commentID))
  return apiCall('post', `/api/user/${userID}/discussions/${discussionID}/comments/${commentID}`, data)
    .then(res => dispatch(addReply(res.commentID, res.reply)))
    .catch(err => dispatch(addError(err.message)))
}


/**
* A thunk that returns an API call, which is going to remove post from the backend
* The replyID is then dispatched to get removed from state
* @param {string} commentID  passed down as props from CommentList and is the associated comment
* @param {string} replyID ID of the specific reply that is to be removed
**/
export const removeReplyAndDispatch = (commentID, replyID) => (dispatch, getState) => {
  let { currentUser, showDiscussion } = getState();
  const userID = currentUser.userInfo._id;
  const discussionID = showDiscussion._id;
    return apiCall('delete', `/api/user/${userID}/discussions/${discussionID}/comments/${commentID}/replies/${replyID}`)
      .then(() => dispatch(removeReply(commentID, replyID)))
      .catch(err => dispatch(addError(err.message)))
};
