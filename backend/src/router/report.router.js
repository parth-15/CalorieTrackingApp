import { Router } from 'express';

import reportController from '../controllers/report.controller';
import isAuthenticated from '../middlewares/auth.middleware';
import hasPermission from '../middlewares/permission.middleware';

const reportRouter = Router();

reportRouter
  .route('/admin/1')
  .get(
    isAuthenticated,
    hasPermission('read', 'adminReport'),
    reportController.getNumberOfFoodEntriesReport
  );

reportRouter
  .route('/admin/2')
  .get(
    isAuthenticated,
    hasPermission('read', 'adminReport'),
    reportController.getNumberOfCaloriesPerUser
  );

reportRouter
  .route('/user/:userId')
  .get(
    isAuthenticated,
    hasPermission('read', 'userReport'),
    reportController.getTotalCaloriesPerUserPerDay
  );

export default reportRouter;
