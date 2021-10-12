import Meal from '../models/meal.model';

class MealService {
  async list() {
    const meals = await Meal.find({});
    return {
      rows: meals,
    };
  }

  async readById(mealId) {
    const meal = await Meal.findById(mealId);
    return meal;
  }

  async create(mealData) {
    let maxAllowed;
    if (mealData.type === 'breakfast') {
      maxAllowed = 3;
    } else if (mealData.type === 'lunch') {
      maxAllowed = 5;
    } else {
      maxAllowed = 2;
    }
    const meal = new Meal({
      type: mealData.type,
      maxAllowed: mealData.maxAllowed || maxAllowed,
    });
    const savedMeal = await meal.save();
    return savedMeal.id;
  }

  async putById(mealId, mealData) {
    let maxAllowed;
    if (mealData.type === 'breakfast') {
      maxAllowed = 3;
    } else if (mealData.type === 'lunch') {
      maxAllowed = 5;
    } else {
      maxAllowed = 2;
    }
    const updatedMeal = await Meal.findByIdAndUpdate(
      mealId,
      {
        type: mealData.type,
        maxAllowed: mealData.maxAllowed || maxAllowed,
      },
      { new: true }
    );
    return updatedMeal.id;
  }

  async deleteById(mealId) {
    await Meal.findByIdAndDelete(mealId);
    return mealId;
  }
}

export default new MealService();
