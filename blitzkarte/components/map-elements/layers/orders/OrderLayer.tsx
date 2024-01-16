import { FC } from "react";
import { UseQueryResult } from "react-query"
import { OrderDisplay } from "../../../../models/enumeration/order-enums";
import { CircleLayer } from "./CircleLayer";
import { LineLayer } from "./LineLayer";
import { CurveLineLayer } from "./CurveLineLayer";
import { TurnOrders } from "../../../../models/objects/OrdersObjects";

interface OrderLayerProps {
  orderData: TurnOrders;
}

export const OrderLayer: FC<OrderLayerProps> = ({orderData}: OrderLayerProps) => {
  const units = orderData.pending?.units && orderData.pending?.units?.length > 0
    ? orderData.pending.units
    : orderData.preliminary?.units && orderData.preliminary?.units?.length > 0
      ? orderData.preliminary.units
      : [];

  const moves = units.filter((unit: any) =>
    [OrderDisplay.NUKE, OrderDisplay.MOVE, OrderDisplay.MOVE_CONVOYED].includes(unit.orderType)
  );

  const holds = units.filter((unit: any) => unit.orderType === OrderDisplay.HOLD );

  const retreatOtb = units.filter((unit: any) => unit.orderType === OrderDisplay.DISBAND );

  const supportHolds = units.filter((unit: any) => unit.orderType === OrderDisplay.SUPPORT && unit.destinationId === 0);

  const supportMoves = units.filter((unit: any) =>
    [OrderDisplay.SUPPORT, OrderDisplay.SUPPORT_CONVOYED].includes(unit.orderType) && unit.destinationId !== 0
  );

  const convoys = units.filter((unit: any) => [OrderDisplay.AIRLIFT, OrderDisplay.CONVOY].includes(unit.orderType));

  const buildData = orderData.pending?.builds
    ? orderData.pending.builds
    : orderData.preliminary?.builds
      ? orderData.preliminary.builds
      : undefined;

  const builds = buildData ? buildData.builds : [];
  const nukesReadyBuilding = buildData ? buildData.nukesReady : [];

  const disbandData = orderData.pending?.disbands
    ? orderData.pending.disbands
    : orderData.preliminary?.disbands
      ? orderData.preliminary.disbands
      : undefined;

  const nukesReadyDisbanding = disbandData?.nukeBuildDetails ? disbandData.nukeBuildDetails : [];
  const disbands = disbandData ? disbandData.unitDisbandingDetailed : [];

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