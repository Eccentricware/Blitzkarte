import { OrderDisplay } from "../enumeration/order-enums";

export interface TurnOrders {
  turnOptions: DoubleTurnOptions;
  turnOrders: TurnOrder[];
}

export interface DoubleTurnOptions {
  pending?: TurnOptions,
  preliminary?: TurnOptions
}

export interface TurnOptions {
  turnType: string;
  name: string;
  deadline: string;
  units?: UnitOptionsFinalized[]; // If (spring orders/retreats or fall orders/retreats)
  transfers?: any;
  builds?: any;
  disbands?: any;
  nominations?: any;
  votes?: any;
}

export interface SavedOption {
  unitId: number;
  unitType: string;
  provinceName: string;
  orderType: string;
  secondaryUnitId?: number;
  secondaryUnitType?: string;
  secondaryProvince?: string;
  secondaryOrderType?: string;
  destinations?: any[];
}

interface TurnOrder {
  unitId: number;
  orderType: string;
  secondaryUnitId?: number;
  destinations?: any;
}

export interface UnitOptionsFinalized {
  unitId: number;
  unitType: string;
  unitDisplay: string;
  unitLoc: number[];
  orderTypes: OrderDisplay[] | string[];
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

export interface SecondaryUnit {
  id: number;
  displayName: string;
  loc: number[];
}

export interface OptionDestination {
  nodeId: number;
  nodeName: string;
  loc: number[];
}

export interface UnitOrder {
  unitId: number;
  unitLoc: number[];
  orderType: OrderDisplay | string;
  secondaryUnitId: number;
  secondaryUnitLoc: number[];
  destinationId: number;
  destinationLoc: number[];
}

export interface Order {
  orderId?: number;
  orderSetId: number;
  orderedUnitId: number;
  loc: number[];
  orderType: string;
  secondaryUnitId?: number | undefined;
  secondaryUnitLoc?: number[];
  destinationId?: number;
  eventLoc?: number[];
  orderStatus?: string;
}