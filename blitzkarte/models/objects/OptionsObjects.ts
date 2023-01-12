import { OrderDisplay } from "../enumeration/order-enums";
import { OptionDestination, SecondaryUnit } from "./TurnOrdersObjects";

export interface TurnOptionsFinal {
  playerId: number;
  countryId: number;
  countryName: string;
  pending?: {
    id?: number;
    name?: string;
    deadline?: Date | string;
  };
  preliminary?: {
    id?: number;
    name?: string;
    deadline?: Date | string;
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
    options: AtRiskUnit[];
  }
  nominations?: {
    turnStatus: string;
    options: NominatableCountry[];
  }
  votes?: {
    turnStatus: string;
    options: Nomination[];
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
  countryId: number;
  countryName: string;
  provinceName: string;
  cityLoc: number[];
  landNodeId?: number;
  landNodeLoc?: number[];
  seaNodeId?: number;
  seaNodeLoc?: number[];
  seaNodeName?: string;
  airNodeId?: number;
  airNodeLoc?: number[];
}

export interface AtRiskUnit {
  countryId: number;
	countryName: string;
	rank: string;
	flagKey: string;
	unitId: number;
	unitType: string;
	provinceName: string;
	loc: number[];
}

export interface NominatableCountry {
  countryId: number;
  countryName: string;
  rank: string;
}

export interface Nomination {
  nominationId: number;
  rankSignature: string;
  countries: NominatableCountry[];
  votesRequired: number;
}

export interface BuildOptions {
  land: BuildLoc[],
  sea: BuildLoc[],
  air: BuildLoc[]
};