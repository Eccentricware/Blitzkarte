import { FC } from "react"
import { DoubleTurnOptions, UnitOrder } from "../../models/objects/TurnOptionsObjects";
import { TurnOrdersPanel } from "./TurnOrdersPanel";

interface OrderOptionsProps {
  orderOptions: DoubleTurnOptions;
  orderSet: UnitOrder[];
}

export const OrdersTab: FC<OrderOptionsProps> = ({orderOptions, orderSet}: OrderOptionsProps) => {
  return (
    <div>
      {
        orderOptions.pending
        && <TurnOrdersPanel turnOptions={orderOptions.pending} orderSet={orderSet}/>
      }
      {
        orderOptions.preliminary
        && <TurnOrdersPanel turnOptions={orderOptions.preliminary} orderSet={orderSet}/>
      }
    </div>
  )
}