import { Router } from "express";

import foodEntryController from "../controllers/foodEntry.controller";
import isAuthenticated from "../middlewares/auth.middleware";
import hasPermission from "../middlewares/permission.middleware";

const foodEntryRouter = Router();

foodEntryRouter
  .route("/")
  .post(
    isAuthenticated,
    hasPermission("create", "foodEntry"),
    foodEntryController.createFoodEntry
  )
  .get(
    isAuthenticated,
    hasPermission("read", "foodEntry"),
    foodEntryController.listFoodEntries
  );

foodEntryRouter
  .route("/user/:userId")
  .get(
    isAuthenticated,
    hasPermission("read", "foodEntry"),
    foodEntryController.listFoodEntriesOfUser
  );

foodEntryRouter
  .route("/:foodEntryId")
  .get(
    isAuthenticated,
    hasPermission("read", "foodEntry"),
    foodEntryController.getFoodEntryById
  )
  .put(
    isAuthenticated,
    hasPermission("update", "foodEntry"),
    foodEntryController.updateFoodEntry
  )
  .delete(
    isAuthenticated,
    hasPermission("delete", "foodEntry"),
    foodEntryController.deleteFoodEntry
  );

export default foodEntryRouter;
