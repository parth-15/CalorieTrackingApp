import { Router } from 'express';

import authController from '../controllers/auth.controller';
import isAuthenticated from '../middlewares/auth.middleware';

const authRouter = Router();

authRouter.post('/signup', authController.signup);

authRouter.post('/login', authController.login);

authRouter.get('/', isAuthenticated, authController.me);

export default authRouter;
