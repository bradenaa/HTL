import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_DISCUSSIONS, REMOVE_DISCUSSION } from '../actionTypes';

export const loadDiscussions = discussions => ({
  type: LOAD_DISCUSSIONS,
  discussions
});

export const remove = id => ({
  type: REMOVE_DISCUSSION,
  id
});

export const removeDiscussion = (userID, discussionID) => {
  return dispatch => {
    return apiCall('delete', `/api/user/${userID}/discussions/${discussionID}`)
      .then(() => dispatch(remove(discussionID)))
      .catch(err => dispatch(addError(err.message)))
  };
};

export const getDiscussion = (userID, discussionID) => {
  return dispatch => {
    return apiCall('get', `/api/user/${userID}/discussions/${discussionID}`)
      .then(res => console.log(res))
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
  console.log(data);
  // sets the currentUser to the current state in the redux store
  let { currentUser } = getState();
  const userID = currentUser.user.id;
  return apiCall('post', `/api/user/${userID}/discussions`, data)
    .then(res => console.log(res))
    .catch(err => dispatch(addError(err.message)))
}
