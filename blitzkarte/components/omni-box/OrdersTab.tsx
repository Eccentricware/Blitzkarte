import { Button } from "@mui/material";
import { FC } from "react"
import { DoubleTurnOptions, UnitOrder } from "../../models/objects/TurnOrdersObjects";
import { OrderRequestService } from "../../services/request-services/order-request-service";
import { TurnOrdersPanel } from "./TurnOrdersPanel";

interface OrderOrdersProps {
  options: DoubleTurnOptions;
  orders: any;
  nudge: any;
}

export const OrdersTab: FC<OrderOrdersProps> = ({options, orders, nudge}: OrderOrdersProps) => {
  const orderRequestService = new OrderRequestService();
  const handleSubmitOrdersClick = () => {
    orderRequestService.submitOrders(orders);
  };

  return (
    <div>
      {
        options.pending
        && <TurnOrdersPanel turnOptions={options.pending} orders={orders.pending} nudge={nudge}/>
      }
      {
        options.preliminary
        && <TurnOrdersPanel turnOptions={options.preliminary} orders={orders.preliminary} nudge={nudge}/>
      }
      <Button
        color="inherit"
        variant="contained"
        onClick={handleSubmitOrdersClick}
      >
        Submit Orders
      </Button>
    </div>
  )
}