export interface TurnOrdersFinal {
  // gameId: number;
  // userId: number;
  // countryId: number;
  pending?: {
    orderSetId?: number;
    default?: boolean;
    restricted?: boolean;
    skipped?: boolean;
  };
  preliminary?: {
    orderSetId?: number;
    default?: number;
  }
  role?: string;
  countryName?: string;
  turnType?: string;
  message?: string;
  pendingDefault?: boolean;
  preliminaryDefault?: boolean;
  render?: string;
  units?: any[];
  buildTransfers?: TransferBuildOrder[];
  techTransfer?: TransferTechOrder;
  builds?: BuildOrders;
  disbands?: DisbandOrders;
  nomination?: NominationOrder;
  votes?: {
    nominations: number[];
  };
}

export interface SingleTurnOrders {
  units?: any[]; // If (spring orders/retreats or fall orders/retreats)
  transfers?: any[];
  builds?: any[];
  disbands?: any[];
  nomination?: any;
  votes?: any[];
}


export interface OrderSetFinal {
  orderSetId: number;
  countryId: number;
  countryName: string;
  defaultOrders: boolean;
  techPartnerId: number;
  newUnitTypes: string[];
  newUnitLocs: number[];
  unitsDisbanding: number[];
  buildTransfers: TransferCountry[];
}

export interface TransferCountry {
  countryId: number;
  countryName: string;
}

export interface TransferBuildOrder {
  countryId: number;
  countryName: string;
  builds: number;
}

export interface TransferTechOrderResult {
  country_id: number,
  country_name: string;
  tech_partner_id: number;
  tech_partner_name: string;
  has_nukes: boolean;
}
export interface TransferTechOrder {
  countryId: number,
  countryName: string;
  foreignCountryId: number;
  foreignCountryName: string;
  hasNukes: boolean;
}
export interface BuildOrders {
  countryId: number;
  countryName: string;
  bankedBuilds: number;
  buildCount: number;
  nukeRange: number;
  increaseRange: number;
  builds: Build[];
  nukesReady: Build[];
}

export interface Build {
  typeId: number;
  buildType: string;
  nodeId: number;
  nodeName?: string;
  provinceName: string;
  loc: number[];
}

export interface DisbandOrders {
  countryId: number;
  countryName: string;
  bankedBuilds: number;
  disbands: number;
  unitDisbandingDetailed: DisbandingUnitDetail[];
  nukeLocs: number[];
  nukeBuildDetails?: NukeBuildInDisband[];
  nukeRange: number;
  increaseRange: number;
  unitsDisbanding: number[];
}

export interface BuildLocation {
  province: string;
  display: string;
  nodeId: number;
  loc: number[];
}

export interface NukeBuildInDisband extends BuildLocation {
  unitId: number;
}

export interface DisbandingUnitDetail {
  unitId: number;
  unitType: string;
  provinceName: string;
  loc: number[];
}

export interface NominationOrder {
  countryIds: number[];
  countryDetails: NominatableCountry[];
  coalitionSignature: string;
}

export interface NominatableCountry {
  countryId: number;
  countryName: string;
  rank: string;
  penalty?: number;
}