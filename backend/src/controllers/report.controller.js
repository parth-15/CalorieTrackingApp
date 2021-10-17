import reportService from '../services/report.service';
import userService from '../services/user.service';
import moment from 'moment';

class ReportController {
  //controller for getting report of number of food entries added in
  //past week and past's past week
  async getNumberOfFoodEntriesReport(req, res) {
    try {
      const today = moment().format('YYYY-MM-DD');
      const past6days = moment().subtract('days', 6).format('YYYY-MM-DD');
      const past7days = moment().subtract('days', 7).format('YYYY-MM-DD');
      const past14days = moment().subtract('days', 13).format('YYYY-MM-DD');
      console.log(today, past7days, past14days);
      const pastWeekCount = await reportService.getNumberOfFoodEntriesInRange(
        past6days,
        today
      );
      const past2WeekCount = await reportService.getNumberOfFoodEntriesInRange(
        past14days,
        past7days
      );
      res
        .status(200)
        .json({ success: true, data: { pastWeekCount, past2WeekCount } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }

  //controller for getting report of average number of calories added by user in
  //past week
  async getNumberOfCaloriesPerUserInPastWeekReport(req, res) {
    try {
      const today = moment().format('YYYY-MM-DD');
      const past7days = moment().subtract('days', 7).format('YYYY-MM-DD');
      const entries = await reportService.getAverageCaloriesPerUserInPastWeek(
        past7days,
        today
      );
      res.status(200).json({ success: true, data: { entries } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }

  //controller for getting report of total caloreis added by user for
  //each day
  async getTotalCaloriesPerUserPerDay(req, res) {
    try {
      const userId = req.params.userId;
      const userById = await userService.readById(userId);
      if (!userById) {
        return res.status(400).json({
          success: false,
          error: 'Invalid user id',
        });
      }
      const entries = await reportService.getTotalCaloriesPerUserPerDay(userId);
      res.status(200).json({ success: true, data: { entries } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }
}

export default new ReportController();
