import FoodEntry from '../models/foodEntry.model';
import mongoose from 'mongoose';

class ReportService {
  async getNumberOfFoodEntriesInRange(startDate, endDate) {
    const count = await FoodEntry.countDocuments({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    console.log('count is', count);
    return count;
  }

  async getAverageCaloriesPerUserInPastWeek(startDate, endDate) {
    const entries = await FoodEntry.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: '$user',
          average: {
            $avg: '$calories',
          },
        },
      },
    ]);
    return entries;
  }

  async getTotalCaloriesPerUserPerDay(userId) {
    const entries = await FoodEntry.aggregate([
      {
        $match: {
          user: {
            $eq: new mongoose.Types.ObjectId(userId),
          },
        },
      },
      {
        $group: {
          _id: '$date',
          sum: {
            $sum: '$calories',
          },
        },
      },
    ]);
    console.log(entries);
    return entries;
  }
}

export default new ReportService();
