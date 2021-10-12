import { Router } from 'express';

import userController from '../controllers/user.controller';
import isAuthenticated from '../middlewares/auth.middleware';
import hasPermission from '../middlewares/permission.middleware';

const userRouter = Router();

userRouter
  .route('/')
  .get(
    isAuthenticated,
    hasPermission('read', 'user'),
    userController.getAllUsers
  ) //working
  .post(
    isAuthenticated,
    hasPermission('create', 'user'),
    userController.createUser
  ); //working

userRouter
  .route('/:userId')
  .get(
    isAuthenticated,
    hasPermission('read', 'user'),
    userController.getUserById
  ) //working
  .put(
    isAuthenticated,
    hasPermission('update', 'user'),
    userController.updateUserById
  ) //working
  .delete(
    isAuthenticated,
    hasPermission('delete', 'user'),
    userController.removeUser
  ); //working

export default userRouter;
