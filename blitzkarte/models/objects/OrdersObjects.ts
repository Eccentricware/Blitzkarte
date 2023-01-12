export interface TurnOrdersFinal {
  gameId: number;
  userId: number;
  role?: string;
  countryId?: number;
  countryName?: string;
  turnType?: string;
  message?: string;
  pendingDefault?: boolean;
  preliminaryDefault?: boolean;
  render?: string;
  units?: any[];
  buildTransfers?: TransferBuildOrder[];
  techTransfers?: TransferTechOrder[];
  builds?: BuildOrder[];
  disbands?: any[];
  nomination?: any;
  votes?: any[];
}

export interface TransferBuildOrder {
  countryId: number;
  countryName: string;
  builds: number;
}

export interface TransferTechOrder {
  countryId: number,
  countryName: string;
  techPartnerId: number;
  techPartnerName: string;
  hasNukes: boolean;
}

export interface BuildOrder {

}