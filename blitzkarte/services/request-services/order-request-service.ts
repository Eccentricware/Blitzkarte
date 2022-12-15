import { TurnOrders } from "../../models/objects/TurnOptions";
import { AbstractRequestService } from "./abstract-request-service";

export class OrderRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async getTurnOrders(gameId: number): Promise<TurnOrders> {
    return this.get(`orders/${gameId}`);
  }
}