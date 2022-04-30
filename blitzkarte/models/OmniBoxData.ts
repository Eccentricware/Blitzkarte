import { Country } from "../utils/parsing/classes/country";

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
    critical: string[]
  },
  input: {
    functions: {}
    data: {}
  }
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
    critical: []
  },
  input: {
    functions: {},
    data: {}
  }
}