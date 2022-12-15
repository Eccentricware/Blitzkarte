export interface TurnOrders {
  turnOptions: TurnOptions;
  turnOrders: TurnOrder[];
}

export interface TurnOptions {
  pending: {
    units?: SavedOption[]; // If (spring orders/retreats or fall orders/retreats)
    tech?: any;            // If (spring or rule override)
    buildTransfer?: any;   // If (spring or rule override)
    adjustments?: any;
    nominations?: any;
    votes?: any;
  },
  preliminary: {
    units?: SavedOption[]; // If (voting and vote/spring split) or (spring retreats and not in retreat)
    buildTransfer?: any;   // If (voting and vote/spring split)
    adjustments?: any;     // If (fall retreats and not in retreat)
    nominations?: any;     // If (adjustments and adjustments/nominations split)
    tech?: any;            // If (voting and vote/spring split)
  }
}

export interface SavedOption {
  unitId: number;
  unitType: string;
  provinceName: string;
  canHold: boolean;
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