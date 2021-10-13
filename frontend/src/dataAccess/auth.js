import axios from 'axios';
import * as APIPaths from '../utils/APIPaths';

const baseUrl = APIPaths.baseUrl;

export const logIn = token => {
  return axios
    .post(baseUrl + APIPaths.login, {token: token})
    .then(response => response.data)
    .catch(err => err || {success: false, error: 'Something went wrong'});
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
        err || {
          success: false,
          error: 'Something went wrong',
        },
    );
};
