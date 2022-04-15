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
    errors: string[]
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
    errors: []
  }
}