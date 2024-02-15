import { TurnOptions } from "../../models/objects/TurnOrdersObjects";
import { TurnOrders } from "../../models/objects/OrdersObjects";
import { AbstractRequestService } from "./abstract-request-service";

export class OrderRequestService extends AbstractRequestService {
  constructor() {
    super();
  }

  async getTurnOptions(gameId: number): Promise<TurnOptions> {
    return this.get(`options/${gameId}`);
  }

  async getTurnOrders(gameId: number): Promise<TurnOrders> {
    return this.get(`orders/${gameId}/orders`);
  }

  async submitOrders(orders: TurnOrders): Promise<any> {
    return this.post(`orders/submit`, {orders: orders});
  }
}