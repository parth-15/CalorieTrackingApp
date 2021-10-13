import FoodEntry from "../models/foodEntry.model";

class FoodEntryService {
  async list(page, perPage, userId) {
    let foodEntries;
    let count = 0;
    if (userId) {
      count = await FoodEntry.countDocuments({ user: userId });
      await FoodEntry.paginate(
        { user: userId },
        { populate: ["user", "meal"], page: page + 1, limit: perPage }
      ).then(function (result) {
        foodEntries = result.docs;
      });
    } else {
      count = await FoodEntry.countDocuments({});
      await FoodEntry.paginate(
        {},
        { populate: ["user", "meal"], page: page + 1, limit: perPage }
      ).then(function (result) {
        foodEntries = result.docs;
      });
    }
    return {
      count,
      page,
      perPage,
      rows: foodEntries,
    };
  }

  async readById(foodEntryId) {
    const foodEntry = await FoodEntry.findById(foodEntryId);
    return foodEntry;
  }

  async countByUserAndDateAndMeal(userId, date, mealId) {
    const foodEntriesCount = await FoodEntry.countDocuments({
      user: userId,
      date: date,
      meal: mealId,
    });
    return foodEntriesCount;
  }

  async create(foodEntryData) {
    const foodEntry = new FoodEntry({
      name: foodEntryData.name,
      date: foodEntryData.date,
      time: foodEntryData.time,
      calories: foodEntryData.calories,
      user: foodEntryData.user,
      meal: foodEntryData.meal,
    });
    const savedFoodEntry = await foodEntry.save();
    return savedFoodEntry.id;
  }

  async putById(foodEntryId, foodEntryData) {
    const updatedFoodEntry = await FoodEntry.findByIdAndUpdate(
      foodEntryId,
      {
        name: foodEntryData.name,
        date: foodEntryData.date,
        time: foodEntryData.time,
        calories: foodEntryData.calories,
        user: foodEntryData.user,
        meal: foodEntryData.meal,
      },
      { new: true }
    );
    return updatedFoodEntry.id;
  }

  async deleteById(foodEntryId) {
    await FoodEntry.findByIdAndDelete(foodEntryId);
    return foodEntryId;
  }
}

export default new FoodEntryService();
