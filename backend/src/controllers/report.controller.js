import reportService from '../services/report.service';
import moment from 'moment';

class ReportController {
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

  async getTotalCaloriesPerUserPerDay(req, res) {
    try {
      const entries = await reportService.getTotalCaloriesPerUserPerDay(
        req.params.userId
      );
      res.status(200).json({ success: true, data: { entries } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Something went wrong' });
    }
  }
}

export default new ReportController();
