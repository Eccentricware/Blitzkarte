import { OrderDisplay } from "../enumeration/order-enums";
import { BuildType } from "../enumeration/unit-enumerations";
import { RenderData } from "./RenderDataObject";

export interface TurnHistory {
  orderList: HistoricCountryOrders[];
  maps: {
    orders: {
      nuclear: any;
      standard: any;
    };
    renderData: {
      start: any;
      result: any;
    };
  };
}

export interface HistoricCountryOrders {
  countryId: number;
  countryName: string;
  rank: string;
  flagKey: string;
  history: {
    start: {
      cityCount: number;
      unitCount: number;
      voteCount: number;
      bankedBuilds: number;
      nukeRange: number;
      adjustments: number;
    };
    result: {
      cityCount: number;
      unitCount: number;
      voteCount: number;
      bankedBuilds: number;
      nukeRange: number;
      adjustments: number;
    };
  };
  orders: {
    trades: {
      tech: string | undefined;
      builds: HistoricBuildTransferOrder[];
    };
    units: HistoricOrderDisplay[];
    adjustments: AdjustmentDetails[];
    buildsBanked: number;
    buildsStartingNukes: number;
    buildsIncreasingRange: number;
    bankedBuildsIncreasingRange: number;
  };
}

export interface HistoricOrderDisplay {
  originProvince: string;
  description: string;
  primaryResolution: string;
  secondaryResolution: string;
  success: boolean;
  secondarySuccess: boolean;
  orderType: OrderDisplay;
  loc: number[];
  eventLoc: number[];
  secondaryLoc: number[];
}

interface AdjustmentDetails {
  location: string;
  loc: number[];
  description: string;
}

export interface HistoricBuildTransferOrder {
  recipientName: string;
  quantity: number;
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