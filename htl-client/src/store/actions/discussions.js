import { apiCall } from '../../services/api';
import { addError } from './errors';
import {
  LOAD_DISCUSSIONS,
  LOAD_ONE_DISCUSSION,
  ADD_DISCUSSION,
  REMOVE_DISCUSSION,
  REMOVE_REPLY,
  REMOVE_COMMENT,
  ADD_REPLY,
 } from '../actionTypes';

 // ++++++++++++++++++++++++++++++++++++++++
 // ========== Action Creators =============
 // ++++++++++++++++++++++++++++++++++++++++

export const loadDiscussions = discussions => ({
  type: LOAD_DISCUSSIONS,
  discussions
});

export const addDiscussionToState = discussion => ({
  type: ADD_DISCUSSION,
  discussion
})

export const removeDiscussionFromState = id => ({
  type: REMOVE_DISCUSSION,
  id
});

export const loadOneDiscussion = oneDiscussion => ({
  type: LOAD_ONE_DISCUSSION,
  oneDiscussion
});

export const removeComment = id => ({
  type: REMOVE_COMMENT,
  id
});

export const removeReply = id => ({
  type: REMOVE_REPLY,
  id
});

export const addReply = data => ({
  type: ADD_REPLY,
  data
});

export const removeAll = () => ({
  type: REMOVE_DISCUSSION
});

// ++++++++++++++++++++++++++++++++++++++++
// ============ Discussion ================
// ++++++++++++++++++++++++++++++++++++++++

/**
* Thunk makes API call to delete specified discussion from server side
* On the completion of the API call, the dispatch action is initialized
* and the dispatch action then deletes from the client side
* @param {string} userID currentUser ID obtained from the store
* @param {string} discussionID the id of the DiscussionItem component
**/
export const removeDiscussion = (userID, discussionID) => {
  console.log("userID", userID);
  console.log("discussionID", discussionID);

  return dispatch => {
    return apiCall('delete', `/api/user/${userID}/discussions/${discussionID}`)
      .then(() => dispatch(removeDiscussion(discussionID)))
      .catch(err => dispatch(addError(err.message)))
  };
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

//TODO: get response to match that of the data structure on the front-end
/**
* Thunk that returns API call which is posting new discussion to the backend
* Will not dispatch except from an error
* @param {object} data text from the post
**/
export const postNewDiscussion = ( data )  => (dispatch, getState) => {
  let { currentUser } = getState();
  const userID = currentUser.user.id;
  return apiCall('post', `/api/user/${userID}/discussions`, data)
    .then(res => dispatch(addDiscussionToState(res)))
    .catch(err => dispatch(addError(err.message)))
}

// ++++++++++++++++++++++++++++++++++++++++
// ============ COMMENTS ==================
// ++++++++++++++++++++++++++++++++++++++++

/**
* A thunk that returns API call, which posts new comments to backend
* The response is the updated discussion, which is then dispatched to loadOneDiscussion
* @param {string} discussionID id of discussion received from props
* @param {object} data object containing a text string
**/
export const postNewCommentToDiscussion = ( discussionID, data ) => (dispatch, getState) => {
  let { currentUser } = getState();
  const userID = currentUser.user.id;
  return apiCall('post', `/api/user/${userID}/discussions/${discussionID}`, data)
    .then(res => dispatch(loadOneDiscussion(res)))
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
  let { currentUser, oneDiscussion } = getState();
  const userID = currentUser.user.id;
  const discussionID = oneDiscussion._id;
  return apiCall('post', `/api/user/${userID}/discussions/${discussionID}/comments/${commentID}`, data)
    .then(res => {
      console.log("reply post response: ", res)
      dispatch(addReply(res));
    })
    .catch(err => dispatch(addError(err.message)))
}


/**
* A thunk that returns an API call, which is going to remove post from the backend
* The replyID is then dispatched to get removed from state
* @param {string} commentID  passed down as props from CommentList and is the associated comment
* @param {string} replyID ID of the specific reply that is to be removed
**/
export const removeReplyAndDispatch = (commentID, replyID) => (dispatch, getState) => {
  let { currentUser, oneDiscussion } = getState();
  const userID = currentUser.user.id;
  const discussionID = oneDiscussion._id;
    return apiCall('delete', `/api/user/${userID}/discussions/${discussionID}/comments/${commentID}/replies/${replyID}`)
      .then(() => dispatch(removeReply(replyID)))
      .catch(err => dispatch(addError(err.message)))
};
