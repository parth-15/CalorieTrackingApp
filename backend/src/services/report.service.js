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
          sum: {
            $sum: '$calories',
          },
        },
      },
    ]);
    const averagedCaloriesEntry = entries.map(entry => ({
      _id: entry._id,
      average: parseInt(entry.sum / 7),
    }));
    return averagedCaloriesEntry;
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
    const sortedEntriesByDate = entries.sort(function (a, b) {
      return new Date(b._id) - new Date(a._id);
    });
    return sortedEntriesByDate;
  }
}

export default new ReportService();
