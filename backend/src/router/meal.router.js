import { Router } from 'express';

import mealController from '../controllers/meal.controller';
import isAuthenticated from '../middlewares/auth.middleware';
import hasPermission from '../middlewares/permission.middleware';

const mealRouter = Router();

mealRouter
  .route('/')
  .get(isAuthenticated, hasPermission('read', 'meal'), mealController.listMeals) //working
  .post(
    isAuthenticated,
    hasPermission('create', 'meal'),
    mealController.createMeal
  );

mealRouter
  .route('/:mealId')
  .get(
    isAuthenticated,
    hasPermission('read', 'meal'),
    mealController.getMealById
  )
  .put(
    isAuthenticated,
    hasPermission('update', 'meal'),
    mealController.updateMeal
  )
  .delete(
    isAuthenticated,
    hasPermission('delete', 'meal'),
    mealController.deleteMeal
  );

export default mealRouter;
