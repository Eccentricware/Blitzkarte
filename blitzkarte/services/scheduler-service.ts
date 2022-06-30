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
  constructor(deadlines: any) {
    this.deadlines = deadlines;
  }
}