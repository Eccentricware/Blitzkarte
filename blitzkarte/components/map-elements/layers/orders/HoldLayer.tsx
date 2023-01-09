import { FC } from "react";
import { Order } from "../../../../models/objects/TurnOrdersObjects";

interface HoldLayerProps {
  orders: Order[];
}

export const HoldLayer: FC<HoldLayerProps> = ({orders}: HoldLayerProps) => {
  return (
    <g>
    {
      orders.map((order: Order) => {
        const loc = order.orderedUnitLoc ? order.orderedUnitLoc : [0, 0];
        return (
          <g key={order.orderId}>
            <circle className="order"
              cx={loc[0] - 16000}
              cy={loc[1]}
              r={120}
              fill="red"
              stroke="black"
              strokeWidth={4}
            />
            <circle className="order"
              cx={loc[0]}
              cy={loc[1]}
              r={120}
              fill="red"
              stroke="black"
              strokeWidth={4}
            />
            <circle className="order"
              cx={loc[0] + 16000}
              cy={loc[1]}
              r={120}
              fill="red"
              stroke="black"
              strokeWidth={4}
            />
          </g>
        )
      })
    }
    </g>
  )
}