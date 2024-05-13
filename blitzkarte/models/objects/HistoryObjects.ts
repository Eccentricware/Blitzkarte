import { RenderData } from "./RenderDataObject";

export interface TurnHistory {
  orderList: CountryOrders[];
  maps: {
    nuclear: RenderData,
    standard: RenderData,
    result: RenderData
  }
}

export interface CountryOrders {
  countryName: string;
  countryFlag: string;
  orders: {
    description: string;
    resolution: string;
    success: boolean;
    icon: string;
  };
}

export interface HistoricNomination {
  nominationId: number;
  countries: HistoricNominatedCountry[];
  signature: string;
  votesRequired: number;
}

export interface HistoricNominationVote {
  countries: HistoricNominatedCountry[];
  nominationId: number;
  signature: string;
  votesRequired: number;
  votesReceived: number;
  winner: boolean;
  yayVotes: HistoricYayVote[];
}

export interface HistoricNominatedCountry {
  countryId: number;
  countryName: string;
  rank: string;
}

export interface HistoricYayVote {
  countryId: number;
  countryName: string;
  votesControlled: number;
}