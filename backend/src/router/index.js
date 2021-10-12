import { Router } from 'express';

import authRouter from './auth.router';
import foodEntryRouter from './foodEntry.router';
import mealRouter from './meal.router';
import userRouter from './user.router';
import reportRouter from './report.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/foodEntry', foodEntryRouter);
router.use('/meal', mealRouter);
router.use('/user', userRouter);
router.use('/report', reportRouter);

export default router;
