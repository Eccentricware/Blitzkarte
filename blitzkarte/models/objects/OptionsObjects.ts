import { OrderDisplay } from "../enumeration/order-enums";
import { OptionDestination, SecondaryUnit } from "./TurnOrdersObjects";

export interface TurnOptionsFinal {
  playerId: number;
  countryId: number;
  countryName: string;
  pending?: {
    id: number;
    name: string;
    deadline: string;
  };
  preliminary?: {
    id: number;
    name: string;
    deadline: string;
  };
  units?: {
    turnStatus: string;
    options: UnitOptionsFinalized[]; // If (spring orders/retreats or fall orders/retreats)}
  };
  buildTransfers?: {
    turnStatus: string;
    options: TransferBuildsCountry[];
    builds: number;
  };
  offerTechOptions?: {
    turnStatus: string;
    options: TransferTechCountry[];
  };
  receiveTechOptions?: {
    turnStatus: string;
    options: TransferTechCountry[];
  };
  builds?: {
    turnStatus: string;
    builds: number;
    locations: BuildOptions;
  }
  disbands?: {
    turnStatus: string;
    options: DisbandOptions;
  };
  nominations?: {
    turnStatus: string;
    options: NominationOptions;
  }
  votes?: {
    turnStatus: string;
    options: VotingOptions;
  }
}

interface UnitOptionsFinalized {
  unitId: number;
  unitType: string;
  unitDisplay: string;
  unitLoc: number[];
  orderTypes: OrderDisplay[];
  moveDestinations: OptionDestination[];
  moveTransportedDestinations: OptionDestination[];
  nukeTargets: OptionDestination[];
  supportStandardUnits: SecondaryUnit[];
  supportStandardDestinations: Record<string, OptionDestination[]>;
  supportTransportedUnits: SecondaryUnit[];
  supportTransportedDestinations: Record<string, OptionDestination[]>;
  transportableUnits: SecondaryUnit[];
  transportDestinations: Record<string, OptionDestination[]>;
}

export interface TransferTechCountry {
  countryId: number;
  countryName: string;
}
export interface TransferBuildsCountry {
  countryId: number;
  countryName: string;
  builds: number;
}

export interface BuildLoc {
  province: string;
  display: string;
  nodeId: number;
  nodeLoc: number[];
}

export interface AtRiskUnit {
  unitId: number;
  unitType: string;
  provinceName: string;
  loc: number[];
}

export interface NominatableCountry {
  countryId: number;
  countryName: string;
  rank: string;
  penalty?: number;
}

export interface Nomination {
  nominationId: number;
  signature: string;
  countries: NominatableCountry[];
  votesRequired: number;
}

export interface BuildOptions {
  land: BuildLoc[],
  sea: BuildLoc[],
  air: BuildLoc[]
};

export interface DisbandOptions {
  disbandCount: number;
  cityCount: number;
  unitCount: number;
  units: AtRiskUnit[];
  nukesInProduction: number;
  nukeLocs: BuildLoc[];
}

export interface NominationOptions {
  victoryBase: number,
  countries: NominatableCountry[]
}

export interface VotingOptions {
  duplicateAlerts: string[];
  nominations: Nomination[];
}