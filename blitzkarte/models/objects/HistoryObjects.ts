import { BuildType } from "../enumeration/unit-enumerations";
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

export interface HistoricBuildOrdersResult {
  country_id: number;
  country_name: string;
  banked_builds: number;
  adjustments: number;
  nuke_range: number;
  increase_range: number;
  builds: HistoricBuildResult[];
}

export interface BuildOrders {
  countryId: number;
  countryName: string;
  bankedBuilds: number;
  buildCount: number;
  nukeRange: number | null;
  increaseRange: number;
  builds: HistoricBuild[];
  nukesReady?: HistoricBuild[];
}

export interface HistoricBuildResult {
  build_order_id?: number;
  order_set_id: number;
  build_number: number;
  build_type: BuildType;
  node_id: number;
  node_name?: string;
  node_display?: string;
  province_name?: string;
  loc?: number[];
}

export interface HistoricBuild {
  buildOrderId?: number;
  orderSetId: number;
  buildNumber: number;
  buildType: BuildType;
  typeId: number;
  nodeId: number;
  nodeName?: string;
  nodeDisplay?: string;
  provinceName?: string;
  loc?: number[];
}