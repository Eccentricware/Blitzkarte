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