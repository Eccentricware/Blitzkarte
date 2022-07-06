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

  validateWeeklyDeadlineChange(deadlineOps: any): boolean {
    let weeklyOrdersValue: number = this.setWeeklyIndex(deadlineOps.ordersDay, deadlineOps.ordersTime);
    let weeklyRetreatsValue: number = this.setWeeklyIndex(deadlineOps.retreatsDay, deadlineOps.retreatsTime);
    let weeklyAdjustmentsValue: number = this.setWeeklyIndex(deadlineOps.adjustmentsDay, deadlineOps.adjustmentsTime);

    const week: number[] = [
      weeklyOrdersValue,
      weeklyRetreatsValue,
      weeklyAdjustmentsValue
    ];

    if (!deadlineOps.nominateDuringAdjustments) {
      let weeklyNominationsValue: number = this.setWeeklyIndex(deadlineOps.nominationsDay, deadlineOps.nominationsTime);
      week.push(weeklyNominationsValue);
    }

    if (!deadlineOps.voteDuringOrders) {
      let weeklyVotesValue: number = this.setWeeklyIndex(deadlineOps.votesDay, deadlineOps.votesTime);
      week.push(weeklyVotesValue);
    }

    let scheduleValid: boolean = true;

    week.forEach((turn: number, index: number) => {
      week[index] = this.getRelativeValue(turn, weeklyOrdersValue);
      if (index > 0 && week[index] <= week[index - 1]) {
        scheduleValid = false;
      }
    });

    console.log(week);
    console.log(scheduleValid);

    return scheduleValid;
  }

  validateDailyDeadlineChange(deadlineOps: any): boolean {
    let dailyOrdersValue: number = this.setDailyIndex(deadlineOps.ordersTime);
    let dailyRetreatsValue: number = this.setDailyIndex(deadlineOps.retreatsTime);
    let dailyAdjustmentsValue: number = this.setDailyIndex(deadlineOps.adjustmentsTime);

    const day: number[] = [
      dailyOrdersValue,
      dailyRetreatsValue,
      dailyAdjustmentsValue
    ];

    if (!deadlineOps.nominateDuringAdjustments) {
      let dailyNominationsValue: number = this.setDailyIndex(deadlineOps.nominationsTime);
      day.push(dailyNominationsValue)
    }

    if (!deadlineOps.voteDuringOrders) {
      let dailyVotesValue: number = this.setDailyIndex(deadlineOps.votesTime);
      day.push(dailyVotesValue);
    }

    let scheduleValid: boolean = true;

    day.forEach((turn: number, index: number) => {
      day[index] = this.getRelativeValue(turn, dailyOrdersValue);
      if (index > 0 && day[index] <= day[index - 1]) {
        scheduleValid = false;
      }
    });

    console.log(day);
    console.log(scheduleValid);

    return scheduleValid;
  }

  setWeeklyIndex(day: string, time: Date): number {
    return this.dayValues[day] + this.getTimeValue(time);
  }

  setDailyIndex(time: Date): number {
    return this.getTimeValue(time);
  }

  getTimeValue(time: Date): number {
    const hourValue: number = time.getHours() / 24;
    const minuteValue: number = time.getMinutes() / 1440;
    return hourValue + minuteValue;
  }

  getRelativeValue(absoluteTime: number, weeklyOrdersValue: number): number {
    let relativeTime: number;
    if (absoluteTime - weeklyOrdersValue >= 0) {
      relativeTime = absoluteTime - weeklyOrdersValue;
    } else {
      relativeTime = 7 - weeklyOrdersValue + absoluteTime;
    }
    return relativeTime;
  }
}