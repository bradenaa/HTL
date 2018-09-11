import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_EVENTS, REMOVE_EVENT } from '../actionTypes';

export const loadEvents = events => ({
  type: LOAD_EVENTS,
  events
});

export const remove = id => ({
  type: REMOVE_EVENT,
  id
});

export const removeEvent = (user_id, event_id) => {
  return dispatch => {
    return apiCall('delete', `/api/users/${user_id}/events/${event_id}`)
      .then(() => dispatch(remove(event_id)))
      .catch(err => dispatch(addError(err.message)))
  };
};

export const fetchEvents = () => {
  return dispatch => {
    return apiCall("get", '/api/events')
      .then(res => {
        // console.log(res[0]);
        dispatch(loadEvents(res));
      })
      .catch(err => dispatch(addError(err.message)));
  };
};

export const joinEvent = (event_id, user_id) => {
  return dispatch => {
    return apiCall("put", `api/users/${user_id}/events/${event_id}`)
      .then(res => console.log(res))
      .catch(err => dispatch(addError(err.message)))
  }
}

// function the accepts some text as a parameter
// and immediately returns dispatch and getState
export const postNewEvent = ( data )  => (dispatch, getState) => {
  console.log(data);
  // sets the currentUser to the current state in the redux store
  let { currentUser } = getState();
  const id = currentUser.userInfo.id;
  return apiCall('post', `/api/users/${id}/events`, data)
    .then(res => console.log(res))
    .catch(err => dispatch(addError(err.message)))
}
