import { Country } from "../../utils/parsing/classes/country";


export interface OmniBoxData {
  messaging: any;
  orders: any;
  stats: {
    countries: Country[];
  }
  rules: any;
  debug: {
    display: {},
    functions: {},
    warnings: string[],
    errors: string[],
    criticals: string[]
  },
  input: InputObject;
}

export interface InputObject {
  functions: any,
  data: any,
  coalitionSchedule: CoalitionSchedule;
}

export const initialOmniBoxData: OmniBoxData = {
  messaging: null,
  orders: null,
  stats: {
    countries: [],
  },
  rules: null,
  debug: {
    display: {},
    functions: {},
    warnings: [],
    errors: [],
    criticals: []
  },
  input: {
    functions: {},
    data: {},
    coalitionSchedule: {
      totalVotes: 0,
      baseRequired: 0,
      countriesInCoalition: 3,
      highestCoalition: '',
      rankCounts: {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
      },
      penalties: {
        a: undefined,
        b: undefined,
        c: undefined,
        d: undefined,
        e: undefined,
        f: undefined,
        g: undefined
      },
      highestPenalty: 0
    }
  }
}

export interface CoalitionSchedule {
  totalVotes: number;
  rankCounts: Record<string, number>;
  baseRequired: number;
  countriesInCoalition: number;
  highestCoalition: string;
  penalties: Record<string, number | undefined>;
  highestPenalty: number;
}