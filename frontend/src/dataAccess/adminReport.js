import axios from 'axios';
import * as APIPaths from '../utils/APIPaths';

const baseUrl = APIPaths.baseUrl;

export const getFirstReportOfAdmin = () => {
  const token = localStorage.getItem('authToken');

  return axios
    .get(baseUrl + APIPaths.getFirstAdminReport, {
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
