import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_DISCUSSIONS, LOAD_ONE_DISCUSSION, REMOVE_DISCUSSION, REMOVE_COMMENT } from '../actionTypes';

export const loadDiscussions = discussions => ({
  type: LOAD_DISCUSSIONS,
  discussions
});

export const loadOneDiscussion = oneDiscussion => ({
  type: LOAD_ONE_DISCUSSION,
  oneDiscussion
});

export const removeDiscussion = id => ({
  type: REMOVE_DISCUSSION,
  id
});

export const removeComment = id => ({
  type: REMOVE_COMMENT,
  id
});

export const removeAll = () => ({
  type: REMOVE_DISCUSSION
});

// ++++++++++++++++++++++++++++++++++++++++
// ============ Discussion ================
// ++++++++++++++++++++++++++++++++++++++++

export const removeDiscussionAndDispatch = (userID, discussionID) => {
  return dispatch => {
    return apiCall('delete', `/api/user/${userID}/discussions/${discussionID}`)
      .then(() => dispatch(removeDiscussion(discussionID)))
      .catch(err => dispatch(addError(err.message)))
  };
};

export const fetchOneDiscussion = (userID, discussionID) => {
  return dispatch => {
    return apiCall('get', `/api/user/${userID}/discussions/${discussionID}`)
      .then(res => {
        dispatch(loadOneDiscussion(res));
      })
      .catch(err => dispatch(addError(err.message)))
  };
};

export const fetchDiscussions = () => {
  return dispatch => {
    return apiCall("get", '/api/discussions')
      .then(res => {
        console.log(res);
        dispatch(loadDiscussions(res));
      })
      .catch(err => dispatch(addError(err.message)));
  };
};

// function the accepts some text as a parameter
// and immediately returns dispatch and getState
export const postNewDiscussion = ( data )  => (dispatch, getState) => {
  console.log("data", data);
  // sets the currentUser to the current state in the redux store
  let { currentUser } = getState();
  const userID = currentUser.user.id;
  return apiCall('post', `/api/user/${userID}/discussions`, data)
    .then(res => console.log(res))
    .catch(err => dispatch(addError(err.message)))
}

// ++++++++++++++++++++++++++++++++++++++++
// ============ COMMENTS ==================
// ++++++++++++++++++++++++++++++++++++++++

export const postNewCommentToDiscussion = ( discussionID, data )  => (dispatch, getState) => {
  console.log("comment data", data);

  // sets the currentUser to the current state in the redux store
  let { currentUser } = getState();
  const userID = currentUser.user.id;
  return apiCall('post', `/api/user/${userID}/discussions/${discussionID}`, data)
    .then(res => {
      dispatch(loadOneDiscussion(res));
    })
    .catch(err => dispatch(addError(err.message)))
}

export const removeCommentAndDispatch = (userID, discussionID, commentID) => {
  return dispatch => {
    return apiCall('delete', `/api/user/${userID}/discussions/${discussionID}/comments/${commentID}`)
      .then(() => dispatch(removeComment(commentID)))
      .catch(err => dispatch(addError(err.message)))
  };
};
