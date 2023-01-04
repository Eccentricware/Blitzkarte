import { FC } from "react"
import { DoubleTurnOptions, UnitOrder } from "../../models/objects/TurnOrdersObjects";
import { TurnOrdersPanel } from "./TurnOrdersPanel";

interface OrderOrdersProps {
  options: DoubleTurnOptions;
  orders: any;
}

export const OrdersTab: FC<OrderOrdersProps> = ({options, orders}: OrderOrdersProps) => {
  return (
    <div>
      {
        options.pending
        && <TurnOrdersPanel turnOptions={options.pending} orders={orders.pending}/>
      }
      {
        options.preliminary
        && <TurnOrdersPanel turnOptions={options.preliminary} orders={orders.preliminary}/>
      }
    </div>
  )
}