export interface GameDataObject {
  adjustmentsDay: string;
  adjustmentsSpan: number;
  adjustmentsTime: string;
  administrators: any[];
  assignmentMethod: string;
  assignments: any[];
  blindAdministrators: boolean;
  concurrentGamesLimit: number;
  currentYear: number;
  deadlineType: string;
  isAdmin: boolean;
  finalReadinessCheck: boolean;
  gameId: number;
  gameName: string;
  gameStatus: string;
  meridiemTime: boolean;
  hiddenGame: boolean;
  nmrToleranceAdjustments: boolean | null;
  nmrToleranceOrders: boolean | null;
  nmrToleranceRetreats: boolean | null;
  nmrToleranceTotal: number;
  nominationsDay: string;
  nominationsSpan: number;
  nominationsTime: string;
  observeDst: boolean;
  ordersDay: string;
  ordersSpan: number;
  ordersTime: string;
  partialRosterStart: boolean;
  privateGame: boolean;
  retreatsDay: string;
  retreatsSpan: number;
  retreatsTime: string;
  rules: any[];
  startTime: Date;
  stylizedStartYear: number;
  timeCreated: Date;
  turn1Timing: string;
  voteDelayCount: number | null;
  voteDelayDisplayCount: number | null;
  voteDelayDisplayPercent: number | null;
  voteDelayEnabled: boolean;
  voteDelayLock: number | null;
  voteDelayPercent: number | null;
  votesDay: string;
  votesSpan: number;
  votesTime: string;
  nominationTiming: string;
  nominationYear: number;
  automaticAssignments: boolean;
  ratingLimitsEnabled: boolean;
  funMin: number;
  funMax: number;
  skillMin: number;
  skillMax: number;
};