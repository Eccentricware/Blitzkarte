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
    let weeklyNominationsValue: number = this.setWeeklyIndex(deadlineOps.nominationsDay, deadlineOps.nominationsTime);
    let weeklyVotesValue: number = this.setWeeklyIndex(deadlineOps.votesDay, deadlineOps.votesTime);

    const week: number[] = [
      weeklyOrdersValue,
      weeklyRetreatsValue,
      weeklyAdjustmentsValue
    ];

    if (!deadlineOps.nominateDuringAdjustments) {
      week.push(weeklyNominationsValue);
    }

    if (!deadlineOps.voteDuringOrders) {
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

  setWeeklyIndex(day: string, time: Date): number {
    return this.dayValues[day] + this.getTimeValue(time);
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