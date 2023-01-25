import { FC } from "react";
import { Order } from "../../../../models/objects/TurnOrdersObjects";

interface CurveLineLayerProps {
  orders: any;
  stroke: string;
}

export const CurveLineLayer: FC<CurveLineLayerProps> = ({orders, stroke}: CurveLineLayerProps) => {
  return (
    <g>
      {
        orders.map((order: Order) => {
          const unitLoc = order.loc ? order.loc : [0, 0];
          const secondaryLoc = order.secondaryUnitLoc ? order.secondaryUnitLoc : [0, 0];
          const eventLoc = order.eventLoc ? order.eventLoc : [0, 0];
          if (unitLoc[0] - eventLoc[0] > 8000) {
            secondaryLoc[0] += 16000;
            eventLoc[0] += 16000;
          } else if (eventLoc[0] - unitLoc[0] > 8000) {
            secondaryLoc[0] -= 16000;
            eventLoc[0] -= 16000;
          }
          return (
            <g key={order.orderId}>
              <path className="order-line" d={`M ${unitLoc[0] - 16000} ${unitLoc[1]} C ${secondaryLoc[0] - 16000} ${secondaryLoc[1]}, ${secondaryLoc[0] - 16000} ${secondaryLoc[1]}, ${eventLoc[0] - 16000} ${eventLoc[1]}`} stroke={stroke} strokeWidth="25" fill="transparent"/>
              <path className="order-line" d={`M ${unitLoc[0]} ${unitLoc[1]} C ${secondaryLoc[0]} ${secondaryLoc[1]}, ${secondaryLoc[0]} ${secondaryLoc[1]}, ${eventLoc[0]} ${eventLoc[1]}`} stroke={stroke} strokeWidth="25" fill="transparent"/>
              <path className="order-line" d={`M ${unitLoc[0] + 16000} ${unitLoc[1]} C ${secondaryLoc[0] + 16000} ${secondaryLoc[1]}, ${secondaryLoc[0] + 16000} ${secondaryLoc[1]}, ${eventLoc[0] + 16000} ${eventLoc[1]}`} stroke={stroke} strokeWidth="25" fill="transparent"/>
            </g>
          )
        })
      }
    </g>
  )
}