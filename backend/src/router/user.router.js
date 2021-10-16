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
  )
  .post(
    isAuthenticated,
    hasPermission('create', 'user'),
    userController.createUser
  );

userRouter
  .route('/:userId')
  .get(
    isAuthenticated,
    hasPermission('read', 'user'),
    userController.getUserById
  )
  .put(
    isAuthenticated,
    hasPermission('update', 'user'),
    userController.updateUserById
  )
  .delete(
    isAuthenticated,
    hasPermission('delete', 'user'),
    userController.removeUser
  );

export default userRouter;
