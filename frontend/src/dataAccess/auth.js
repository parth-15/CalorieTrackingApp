import axios from 'axios';
import * as APIPaths from '../utils/APIPaths';

const baseUrl = APIPaths.baseUrl;

export const login = payload => {
  //payload contains one field named token
  return axios
    .post(baseUrl + APIPaths.login, payload)
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        },
    );
};

export const inviteFriend = userData => {
  const token = localStorage.getItem('authToken');
  return axios
    .post(baseUrl + APIPaths.signup, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        },
    );
};

export const me = () => {
  const token = localStorage.getItem('authToken');
  return axios
    .get(baseUrl + APIPaths.me, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data)
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        },
    );
};
