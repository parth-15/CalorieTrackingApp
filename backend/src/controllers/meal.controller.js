import mealService from "../services/meal.service";

class MealController {
  async listMeals(req, res) {
    try {
      const meals = await mealService.list();
      res.status(200).json({
        success: true,
        data: meals,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  }

  async getMealById(req, res) {
    try {
      const meal = await mealService.readById(req.params.mealId);
      if (!meal) {
        return res
          .status(404)
          .json({ success: false, error: "Meal not found" });
      }
      res.status(200).json({ success: true, data: meal });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  }

  async createMeal(req, res) {
    try {
      const type = req.body.type;
      const mealByType = await mealService.readByType(type);
      if (mealByType) {
        return res.status(400).json({
          success: false,
          error: "Meal with same type already exists",
        });
      }
      const mealId = await mealService.create(req.body);
      res.status(201).json({ success: true, data: mealId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  }

  async updateMeal(req, res) {
    try {
      const meal = await mealService.readById(req.params.mealId);
      if (!meal) {
        return res
          .status(404)
          .json({ success: false, error: "Meal not found" });
      }
      const type = req.body.type;
      const maxAllowed = req.body.maxAllowed;
      const mealByType = await mealService.readByType(type);
      if (mealByType && mealByType.id !== req.params.mealId) {
        return res.status(400).json({
          success: false,
          error: "Meal with same type already exists",
        });
      }
      const mealId = await mealService.putById(req.params.mealId, req.body);
      res.status(204).json({});
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  }

  async deleteMeal(req, res) {
    try {
      const meal = await mealService.readById(req.params.mealId);
      if (!meal) {
        return res
          .status(404)
          .json({ success: false, error: "Meal not found" });
      }
      const mealId = await mealService.deleteById(req.params.mealId);
      res.status(204).json({});
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Something went wrong" });
    }
  }
}

export default new MealController();
