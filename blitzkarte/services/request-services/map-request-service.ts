import { TurnOrdersFinal } from "../../models/objects/OrdersObjects";
import { TurnOptions, TurnOrders } from "../../models/objects/TurnOrdersObjects";
import { AbstractRequestService } from "./abstract-request-service";

export class MapRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async getCurrentMap(gameId: number): Promise<any> {
    return this.get(`maps/${gameId}/current`);
  }
}