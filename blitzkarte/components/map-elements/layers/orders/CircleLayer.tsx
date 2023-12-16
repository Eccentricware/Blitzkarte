import { FC } from "react";
import { Build, DisbandingUnitDetail, NukeBuildInDisband } from "../../../../models/objects/OrdersObjects";
import { Order } from "../../../../models/objects/TurnOrdersObjects";

interface CircleLayerProps {
  orders: Order[] | Build[] | NukeBuildInDisband[] | DisbandingUnitDetail[];
  fill: string;
}

export const CircleLayer: FC<CircleLayerProps> = ({orders, fill}: CircleLayerProps) => {
  return (
    <g>
    {
      orders.map((order: Order | Build | NukeBuildInDisband | DisbandingUnitDetail, index: number) => {
        return (
          <g key={index}>
            <circle className="order-circle"
              cx={order.loc[0] - 16000}
              cy={order.loc[1]}
              r={135}
              fill={fill}
              stroke="black"
              strokeWidth={4}
            />
            <circle className="order-circle"
              cx={order.loc[0]}
              cy={order.loc[1]}
              r={135}
              fill={fill}
              stroke="black"
              strokeWidth={4}
            />
            <circle className="order-circle"
              cx={order.loc[0] + 16000}
              cy={order.loc[1]}
              r={135}
              fill={fill}
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