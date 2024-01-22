import { OrderDisplay } from "../enumeration/order-enums";
import { TurnStatus } from "../enumeration/turn-status-enum";
import { OptionDestination, SecondaryUnit } from "./TurnOrdersObjects";

export interface OptionsFinal {
  playerId: number;
  countryId: number;
  countryName: string;
  message?: string;
  pending?: SpecificTurnOptions;
  preliminary?: SpecificTurnOptions;
  finale?: FinaleDetails;
}

export interface SpecificTurnOptions {
  id: number;
  name: string;
  status: TurnStatus;
  deadline: Date | string;
  applicable: boolean;
  message?: string;
  units?: UnitOptionsFinalized[]; // If (spring orders/retreats or fall orders/retreats)}
  buildTransfers?: {
    options: TransferBuildsOption[];
    builds: number;
  };
  offerTechOptions?: TransferTechCountry[];
  receiveTechOptions?: TransferTechCountry[];
  builds?: {
    builds: number;
    locations: BuildOptions;
  };
  disbands?: DisbandOptions;
  nominations?: NominationOptions;
  votes?: VotingOptions;
}

interface FinaleDetails {

}

export interface TransferCountry {
  countryId: number;
  countryName: string;
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
export interface TransferBuildsOption {
  countryId: number;
  countryName: string;
  builds: number;
}

export interface TransferBuildOrder {
  buildTransferOrderId?: number;
  orderSetId?: number;
  countryId?: number;
  countryName?: string;
  recipientId: number;
  recipientName: string;
  quantity: number;
  uiRow?: number;
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
  voteCount: number;
}