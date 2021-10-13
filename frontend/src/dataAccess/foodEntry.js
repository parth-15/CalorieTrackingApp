import axios from 'axios';
import * as APIPaths from '../utils/APIPaths';

const baseUrl = APIPaths.baseUrl;

export const getAllFoodEntryOfUser = (userId, page) => {
  const token = localStorage.getItem('authToken');

  const queryString = `/${userId}?page=${page}`;

  return axios
    .get(baseUrl + APIPaths.listFoodEntriesOfUser + queryString, {
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

export const createFoodEntry = foodEntryInput => {
  const token = localStorage.getItem('authToken');

  return axios
    .post(baseUrl + APIPaths.createFoodEntry, foodEntryInput, {
      headers: {
        'Content-Type': 'application/json',
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
