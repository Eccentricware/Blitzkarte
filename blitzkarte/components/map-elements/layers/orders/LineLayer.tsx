import { FC } from "react";
import { Order } from "../../../../models/objects/TurnOrdersObjects";

interface LineLayerProps {
  orders: Order[];
  stroke: string;
}

export const LineLayer: FC<LineLayerProps> = ({orders, stroke}: LineLayerProps) => {
  return (
    <g>
      <defs>
        <marker id={`${stroke}-arrowhead`} markerWidth="10" markerHeight="10" refX="7.5" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill={stroke} />
        </marker>
        <marker id="arrowhead-fail" markerWidth="10" markerHeight="10" refX="7.5" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="gray" />
        </marker>
      </defs>
      {
        orders.map((order: Order) => {
          const unitLoc = order.loc ? order.loc : [0, 0];
          const eventLoc = order.eventLoc ? order.eventLoc : [0, 0];
          return (
            <g key={order.orderId}>
              <line className="order-line" stroke={stroke} strokeWidth={20} markerEnd={`url(#${stroke}-arrowhead)`}
                x1={unitLoc[0] - 16000} y1={unitLoc[1]}
                x2={eventLoc[0] - 16000} y2={eventLoc[1]}
              />
              <line className="order-line" stroke={stroke} strokeWidth={20} markerEnd={`url(#${stroke}-arrowhead)`}
                x1={unitLoc[0]} y1={unitLoc[1]}
                x2={eventLoc[0]} y2={eventLoc[1]}
              />
              <line className="order-line" stroke={stroke} strokeWidth={20} markerEnd={`url(#${stroke}-arrowhead)`}
                x1={unitLoc[0] + 16000} y1={unitLoc[1]}
                x2={eventLoc[0] + 16000} y2={eventLoc[1]}
              />
            </g>
          )
        })
      }
    </g>
  )
}