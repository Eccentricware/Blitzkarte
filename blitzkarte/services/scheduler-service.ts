import { getTimeZones, TimeZone } from '@vvo/tzdb';
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

  constructor() {};

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
      week[index] = this.getWeeklyOffset(turn, weeklyOrdersValue);
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
      day[index] = this.getWeeklyOffset(turn, dailyOrdersValue);
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

  getWeeklyOffset(absoluteTime: number, weeklyOrdersValue: number): number {
    let relativeTime: number;
    if (absoluteTime - weeklyOrdersValue >= 0) {
      relativeTime = absoluteTime - weeklyOrdersValue;
    } else {
      relativeTime = 7 - weeklyOrdersValue + absoluteTime; // Days
    }
    return relativeTime;
  }

  getDailyOffset(absoluteDeadline: number, absoluteNow: number): number {
    let relativeTime: number = absoluteDeadline - absoluteNow;
    if (absoluteNow - absoluteDeadline >= 0) {
      relativeTime += 1;
    }
    return relativeTime;
  }

  setStartScheduling(deadlineOps: any): void {
    console.log('deadlineOps', deadlineOps);

    if (deadlineOps.deadlineType === 'weekly') {
      if (deadlineOps.turn1Timing === 'immediate') {
        deadlineOps.setGameStart(new Date());
        deadlineOps.setFirstTurnDeadline(this.findNextWeeklyDeadline(deadlineOps));
      } else if (deadlineOps.turn1Timing === 'standard') {
        deadlineOps.setGameStart(this.findNextWeeklyDeadline(deadlineOps));
        deadlineOps.setFirstTurnDeadline(this.addWeekToDate(this.findNextWeeklyDeadline(deadlineOps)));
      } else if (deadlineOps.turn1Timing === 'remainder') {
        deadlineOps.setGameStart(new Date());
        deadlineOps.setFirstTurnDeadline(this.addWeekToDate(this.findNextWeeklyDeadline(deadlineOps)));
      } else if (deadlineOps.turn1Timing === 'double') {
        deadlineOps.setGameStart(this.findNextWeeklyDeadline(deadlineOps));
        deadlineOps.setFirstTurnDeadline(this.add2WeeksToDate(this.findNextWeeklyDeadline(deadlineOps)));
      } else if (deadlineOps.turn1Timing === 'extended') {
        deadlineOps.setGameStart(new Date());
        deadlineOps.setFirstTurnDeadline(this.add2WeeksToDate(this.findNextWeeklyDeadline(deadlineOps)));
      }
    } else if (deadlineOps.deadlineType === 'daily') {
      if (deadlineOps.turn1Timing === 'immediate') {
        deadlineOps.setGameStart(new Date());
        deadlineOps.setFirstTurnDeadline(this.findNextDailyDeadline(deadlineOps));
      } else if (deadlineOps.turn1Timing === 'standard') {
        deadlineOps.setGameStart(this.findNextDailyDeadline(deadlineOps));
        deadlineOps.setFirstTurnDeadline(this.addDayToDate(this.findNextDailyDeadline(deadlineOps)));
      } else if (deadlineOps.turn1Timing === 'remainder') {
        deadlineOps.setGameStart(new Date());
        deadlineOps.setFirstTurnDeadline(this.addDayToDate(this.findNextDailyDeadline(deadlineOps)));
      } else if (deadlineOps.turn1Timing === 'double') {
        deadlineOps.setGameStart(this.findNextDailyDeadline(deadlineOps));
        deadlineOps.setFirstTurnDeadline(this.add2DaysToDate(this.findNextDailyDeadline(deadlineOps)));
      } else if (deadlineOps.turn1Timing === 'extended') {
        deadlineOps.setGameStart(new Date());
        deadlineOps.setFirstTurnDeadline(this.add2DaysToDate(this.findNextDailyDeadline(deadlineOps)));
      }
    }
  }

  findNextWeeklyDeadline(deadlineOps: any): Date {
    let now = new Date();
    let absoluteNow = now.getDay() + this.getTimeValue(now);
    let absoluteFirstTurn = this.setWeeklyIndex(deadlineOps.ordersDay, deadlineOps.ordersTime);
    let relativeTimeValue = this.getWeeklyOffset(absoluteFirstTurn, absoluteNow);
    let nextDeadline: Date = new Date(Date.now() + (relativeTimeValue * 86400000) - now.getSeconds() * 1000);

    return nextDeadline;
  }

  addWeekToDate(date: Date): Date {
    return new Date(Date.parse(date.toISOString()) + 604800000);
  }

  add2WeeksToDate(date: Date): Date {
    return new Date(Date.parse(date.toISOString()) + 604800000 * 2);
  }

  findNextDailyDeadline(deadlineOps: any): Date {
    let now = new Date();
    let absoluteNow = this.getTimeValue(now);
    let absoluteFirstTurn = this.getTimeValue(deadlineOps.ordersTime);
    let relativeFirstTurn = this.getDailyOffset(absoluteFirstTurn, absoluteNow);
    let nextDeadline: Date = new Date(Date.now() + (relativeFirstTurn * 86400000) - now.getSeconds() * 1000);
    return nextDeadline;
  }

  addDayToDate(date: Date): Date {
    return new Date(Date.parse(date.toISOString()) + 86400000);
  }

  add2DaysToDate(date: Date): Date {
    return new Date(Date.parse(date.toISOString()) + 86400000 * 2);
  }

  chooseTimeZones(): TimeZone[] {
    const timeZonesToInclude = [
      'America/Los_Angeles'
    ];

    const timeZones: TimeZone[] = getTimeZones().filter((timeZone: TimeZone) => {
      return timeZonesToInclude.includes(timeZone.name);
    });
    return timeZones;
  }
}