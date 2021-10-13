import axios from 'axios';
import * as APIPaths from '../utils/APIPaths';

const baseUrl = APIPaths.baseUrl;

export const getAllMeals = () => {
  const token = localStorage.getItem('authToken');

  return axios
    .get(baseUrl + APIPaths.getAllMeals, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(
      err =>
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        },
    );
};

export const updateMeal = (mealId, mealData) => {
  const token = localStorage.getItem('authToken');

  const queryString = `/${mealId}`;

  return axios
    .put(baseUrl + APIPaths.updateMeal + queryString, mealData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log(response.data);
      return response.data;
    })
    .catch(err => {
      console.log(err.response.data);
      return (
        (err && err.response && err.response.data) || {
          success: false,
          error: 'Something went wrong',
        }
      );
    });
};
