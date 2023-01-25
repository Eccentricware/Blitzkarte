import { FC } from "react";
import { UseQueryResult } from "react-query"
import { OrderDisplay } from "../../../../models/enumeration/order-enums";
import { Order, TurnOrders } from "../../../../models/objects/TurnOrdersObjects"
import { CircleLayer } from "./CircleLayer";
import { LineLayer } from "./LineLayer";
import { CurveLineLayer } from "./CurveLineLayer";
import { TurnOrdersFinal } from "../../../../models/objects/OrdersObjects";

interface OrderLayerProps {
  orderData: TurnOrdersFinal;
}

export const OrderLayer: FC<OrderLayerProps> = ({orderData}: OrderLayerProps) => {
  const moves = orderData.units ? orderData.units.filter((unit: any) =>
    [OrderDisplay.DETONATE, OrderDisplay.MOVE, OrderDisplay.MOVE_CONVOYED].includes(unit.orderType)
  ) : [];

  const holds = orderData.units ? orderData.units.filter((unit: any) => unit.orderType === OrderDisplay.HOLD ) : [];

  const retreatOtb = orderData.units ? orderData.units.filter((unit: any) => unit.orderType === OrderDisplay.DISBAND ) : [];

  const supportHolds = orderData.units ? orderData.units.filter((unit: any) =>
    unit.orderType === OrderDisplay.SUPPORT && unit.destinationId === 0
  ) : [];

  const supportMoves = orderData.units ? orderData.units.filter((unit: any) =>
    [OrderDisplay.SUPPORT, OrderDisplay.SUPPORT_CONVOYED].includes(unit.orderType) && unit.destinationId !== 0
  ) : [];

  const convoys = orderData.units ?
    orderData.units.filter((unit: any) => [OrderDisplay.AIRLIFT, OrderDisplay.CONVOY].includes(unit.orderType)) : [];

  const builds = orderData.builds ? orderData.builds.builds : [];

  const nukesReadyBuilding = orderData.builds ? orderData.builds.nukesReady : [];
  const nukesReadyDisbanding = (orderData.disbands && orderData.disbands.nukeBuildDetails) ? orderData.disbands.nukeBuildDetails : [];

  const disbands = orderData.disbands ? orderData.disbands.unitDisbandingDetailed : [];

  return (
    <g className="order-layer">
      { supportHolds.length > 0 && <LineLayer orders={supportHolds} stroke="blue"/> }
      { supportMoves.length > 0 && <CurveLineLayer orders={supportMoves} stroke="blue"/> }
      { convoys.length > 0 && <CurveLineLayer orders={convoys} stroke="purple"/> }
      { holds.length > 0 && <CircleLayer orders={holds} fill="red"/> }
      { retreatOtb.length > 0 && <CircleLayer orders={retreatOtb} fill="red"/> }
      { moves.length > 0 && <LineLayer orders={moves} stroke="red"/> }
      { builds.length > 0 && <CircleLayer orders={builds} fill="green"/> }
      { nukesReadyBuilding.length > 0 && <CircleLayer orders={nukesReadyBuilding} fill="green"/> }
      { nukesReadyDisbanding.length > 0 && <CircleLayer orders={nukesReadyDisbanding} fill="green"/> }
      { disbands.length > 0 && <CircleLayer orders={disbands} fill="red"/> }
    </g>
  )
}