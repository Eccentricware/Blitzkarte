import { TurnOptions, TurnOrders } from "../../models/objects/TurnOrdersObjects";
import { AbstractRequestService } from "./abstract-request-service";

export class OrderRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async getTurnOptions(gameId: number): Promise<TurnOptions> {
    return this.get(`orders/${gameId}/options`);
  }

  async getTurnOrders(gameId: number): Promise<TurnOrders> {
    return this.get(`orders/${gameId}/orders`);
  }

  async submitOrders(orders: TurnOrders): Promise<any> {
    this.post(`orders/submit`, {orders: orders});
  }
}