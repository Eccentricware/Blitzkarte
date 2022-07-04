export class SchedulerService {
  turnOrder: string[] = ['orders', 'retreats', 'adjustments', 'nominations', 'votes'];
  dayValues: any = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6
  };

  deadlines: any = {};
  constructor() {}

  validateDeadlineChange(deadlineOps: any): boolean {
    console.log('deadlineOps', deadlineOps);
    let weeklyOrderIndex: number = this.setWeeklyIndex(deadlineOps.ordersDay, deadlineOps.ordersTime);
    console.log('weeklyOrderIndex', weeklyOrderIndex);
    return true;
  }

  setWeeklyIndex(day: string, time: Date): number {
    return this.dayValues[day] + this.getTimeValue(time);
  }

  getTimeValue(time: Date): number {
    const hourValue: number = time.getHours() / 24;
    const minuteValue: number = time.getMinutes() / 1440;
    return hourValue + minuteValue;
  }
}