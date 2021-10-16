import foodEntryService from '../services/foodEntry.service';
import mealService from '../services/meal.service';
import userService from '../services/user.service';

class FoodEntryController {
  async listFoodEntries(req, res) {
    try {
      const page = parseInt(req.query.page) || 0;
      const foodEntries = await foodEntryService.list(page, 10);
      res.status(200).json({
        success: true,
        data: foodEntries,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }

  async listFoodEntriesOfUser(req, res) {
    try {
      const page = parseInt(req.query.page) || 0;
      const userId = req.params.userId;
      const foodEntries = await foodEntryService.list(page, 10, userId);
      res.status(200).json({
        success: true,
        data: foodEntries,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }

  async getFoodEntryById(req, res) {
    try {
      const foodEntry = await foodEntryService.readById(req.params.foodEntryId);
      res.status(200).json({
        success: true,
        data: foodEntry,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }

  async createFoodEntry(req, res) {
    try {
      const userId = req.body.user;
      const mealId = req.body.meal;
      const date = req.body.date;
      const userById = await userService.readById(userId);
      const mealById = await mealService.readById(mealId);
      if (!userById) {
        return res.status(400).json({
          success: false,
          error: 'Invalid user id',
        });
      }
      if (!mealById) {
        return res.status(400).json({
          success: false,
          error: 'Invalid meal id',
        });
      }
      const countPerMeal = await foodEntryService.countByUserAndDateAndMeal(
        userId,
        date,
        mealId
      );
      const maxAllowed = (await mealService.readById(mealId)).maxAllowed;
      console.log(countPerMeal, maxAllowed);
      if (countPerMeal >= maxAllowed) {
        return res.status(400).json({
          success: false,
          error:
            'Exceeding food entries for given meal and user for given date',
        });
      }
      const foodEntryId = await foodEntryService.create(req.body);
      res.status(201).json({ success: true, data: { id: foodEntryId } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }

  async updateFoodEntry(req, res) {
    try {
      const userId = req.body.user;
      const mealId = req.body.meal;
      const date = req.body.date;
      const foodEntryId = req.params.foodEntryId;
      const oldMealId = (
        await foodEntryService.readById(foodEntryId)
      ).meal.toString();
      console.log(oldMealId, mealId);
      if (oldMealId === mealId) {
        const id = await foodEntryService.putById(foodEntryId, req.body);
        return res.status(201).json({ success: true, data: { id: id } });
      } else {
        const countPerMeal = await foodEntryService.countByUserAndDateAndMeal(
          userId,
          date,
          mealId
        );
        const maxAllowed = (await mealService.readById(mealId)).maxAllowed;
        if (countPerMeal >= maxAllowed) {
          return res.status(400).json({
            success: false,
            error:
              'Exceeding food entries for given meal and user for given date',
          });
        }
        const id = await foodEntryService.putById(foodEntryId, req.body);
        res.status(201).json({ success: true, data: { id: id } });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }

  async deleteFoodEntry(req, res) {
    try {
      const foodEntry = await foodEntryService.readById(req.params.foodEntryId);
      if (!foodEntry) {
        return res
          .status(404)
          .json({ success: false, error: 'FoodEntry not found' });
      }
      await foodEntryService.deleteById(req.params.foodEntryId);
      res.status(204).json({});
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }
}

export default new FoodEntryController();
