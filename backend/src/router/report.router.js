import { Router } from 'express';

import reportController from '../controllers/report.controller';
import isAuthenticated from '../middlewares/auth.middleware';
import hasPermission from '../middlewares/permission.middleware';

const reportRouter = Router();

reportRouter
  .route('/foodEntries')
  .get(
    isAuthenticated,
    hasPermission('read', 'adminReport'),
    reportController.getNumberOfFoodEntriesReport
  );

reportRouter
  .route('/calories')
  .get(
    isAuthenticated,
    hasPermission('read', 'adminReport'),
    reportController.getNumberOfCaloriesPerUserInPastWeekReport
  );

reportRouter
  .route('/user/:userId')
  .get(
    isAuthenticated,
    hasPermission('read', 'userReport'),
    reportController.getTotalCaloriesPerUserPerDay
  );

export default reportRouter;
