import { apiCall } from '../../services/api';
import { addError } from './errors';

import {
  LOAD_PROFILE,
} from '../actionTypes';


// ++++++++++++++++++++++++++++++++++++++++
// ========== Action Creators =============
// ++++++++++++++++++++++++++++++++++++++++

export const loadProfile = profile => ({
  type: LOAD_PROFILE,
  profile
})


// ++++++++++++++++++++++++++++++++++++++++
// ========= THUNKS for Profile ===========
// ++++++++++++++++++++++++++++++++++++++++

export const fetchProfile = (userID) => {
  return dispatch => {
    return apiCall('get', `/api/user/${userID}/profile`)
      .then(res => dispatch(loadProfile(res)))
      .catch(err => dispatch(addError(err.message)))
  };
};
