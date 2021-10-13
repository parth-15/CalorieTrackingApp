import axios from 'axios';
import * as APIPaths from '../utils/APIPaths';

const baseUrl = APIPaths.baseUrl;

export const getReportOfUser = userId => {
  const token = localStorage.getItem('authToken');

  const queryString = `/${userId}`;

  return axios
    .get(baseUrl + APIPaths.getUserReport + queryString, {
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
