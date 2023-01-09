import { FC } from "react";
import { UseQueryResult } from "react-query"
import { OrderDisplay } from "../../../../models/enumeration/order-enums";
import { Order, TurnOrders } from "../../../../models/objects/TurnOrdersObjects"
import { HoldLayer } from "./HoldLayer";
import { MoveLayer } from "./MoveLayer";
import { SupportLayer } from "./SupportLayer";

interface OrderLayerProps {
  orderData: any;
}

export const OrderLayer: FC<OrderLayerProps> = ({orderData}: OrderLayerProps) => {
  const supports = orderData.units.filter((unit: any) => [
    OrderDisplay.AIRLIFT, OrderDisplay.CONVOY, OrderDisplay.SUPPORT, OrderDisplay.SUPPORT_CONVOYED
  ].includes(unit.orderType));

  const moves = orderData.units.filter((unit: any) => [
    OrderDisplay.DETONATE, OrderDisplay.MOVE, OrderDisplay.MOVE_CONVOYED
  ].includes(unit.orderType));

  const holds = orderData.units.filter((unit: any) => [
    OrderDisplay.HOLD, OrderDisplay.DISBAND
  ].includes(unit.orderType));

  return (
    <g className="order-layer">
      <SupportLayer orders={supports}/>
      <MoveLayer orders={moves}/>
      <HoldLayer orders={holds}/>
    </g>
  )
}