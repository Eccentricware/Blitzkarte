import { Country } from "../utils/parsing/classes/country";

export interface OmniBoxData {
  messaging: any;
  orders: any;
  stats: {
    countries: Country[];
  }
  rules: any;
}

export const initialOmniBoxData = {
  messaging: null,
  orders: null,
  stats: {
    countries: [],
  },
  rules: null
}