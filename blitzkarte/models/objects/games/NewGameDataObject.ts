export interface NewGameData {
  gameName: string;
  assignmentMethod: 'manual';
  stylizedStartYear: number;
  deadlineType: string;
  observeDst: boolean;
  gameStart: Date | string | undefined;
  firstTurnDeadline: Date | string | undefined;
  ordersDay: string;
  ordersTime: Date | string;
  retreatsDay: string;
  retreatsTime: Date | string;
  adjustmentsDay: string;
  adjustmentsTime: Date | string;
  nominationsDay: string;
  nominationsTime: Date | string;
  votesDay: string;
  votesTime: Date | string;
  firstOrdersTimeSpan: number;
  firstOrdersTimeType: string;
  ordersTimeSpan: number;
  ordersTimeType: string;
  retreatsTimeSpan: number;
  retreatsTimeType: string;
  adjustmentsTimeSpan: number;
  adjustmentsTimeType: string;
  nominationsTimeSpan: number;
  nominationsTimeType: string;
  votesTimeSpan: number;
  votesTimeType: string;
  nominateDuringAdjustments: boolean;
  voteDuringOrders: boolean;
  turn1Timing: string;
  nominationTiming: string;
  nominationYear: number;
  concurrentGamesLimit: number;
  automaticAssignments: boolean;
  ratingLimits: boolean;
  funRange: number[];
  skillRange: number[];
  nmrTolerance: number | undefined;
  finalReadinessCheck: boolean;
  rules: any;
  voteDeadlineExtension: boolean | undefined;
  blindCreator: boolean;
  partialRosterStart: boolean;
  coalitionSchedule: CoalitionSchedule;
  dbRows: any;
}

interface CoalitionSchedule {
  baseRequired: number;
  totalVotes: number;
  penalties: {
    a: number | undefined;
    b: number | undefined;
    c: number | undefined;
    d: number | undefined;
    e: number | undefined;
    f: number | undefined;
    g: number | undefined;
  }
}