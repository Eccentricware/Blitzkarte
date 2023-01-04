import { Select, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { OrderDisplay } from "../../models/enumeration/order-enums";
import { OptionDestination, Order, SecondaryUnit, UnitOptionsFinalized, UnitOrder } from "../../models/objects/TurnOrdersObjects";

interface UnitProps {
  unit: UnitOptionsFinalized;
  orders: any;
}

export const UnitOrders: FC<UnitProps> = ({unit, orders}: UnitProps) => {
  const [order, setOrder] = useState<Order|undefined>(undefined);
  const [orderType, setOrderType] = useState<string|undefined>(undefined);
  const [moveDestinationId, setMoveDestinationId] = useState<number|undefined>(0);
  const [moveTransportedDestinationId, setMoveTransportedDestinationId] = useState<number|undefined>(0);
  const [nukeTargetId, setNukeTargetId] = useState<number|undefined>(0);
  const [supportUnitId, setSupportUnitId] = useState<number|undefined>(0);
  const [supportDestinationId, setSupportDestinationId] = useState<number|undefined>(0);
  const [supportTranportedUnitId, setSupportTransportedUnitId] = useState<number|undefined>(0);
  const [supportTransportedDestinationId, setSupportTransportedDestinationId] = useState<number|undefined>(0);
  const [transportedUnitId, setTransportedUnitId] = useState<number|undefined>(0);
  const [transportDestinationId, setTransportDestinationId] = useState<number|undefined>(0);

  const handleOrderTypeChange = (orderType: string) => {
    setOrderType(orderType);
  }

  const handleMoveDestinationChange = (destinationId: string) => {
    setMoveDestinationId(moveDestinationId);
  }

  useEffect(() => {
    const priorOrder: Order = orders.find((order: any) => unit.unitId === order.orderedUnitId);
    if (priorOrder) {
      setOrder(priorOrder);
      setOrderType(priorOrder.orderType);
      if (priorOrder.orderType === OrderDisplay.MOVE) {
        setMoveDestinationId(priorOrder.destinationId);
      }

      if (priorOrder.orderType === OrderDisplay.MOVE_CONVOYED) {
        setMoveTransportedDestinationId(priorOrder.destinationId);
      }

      if (priorOrder.orderType === OrderDisplay.DETONATE) {
        setNukeTargetId(priorOrder.destinationId);
      }

      if (priorOrder.orderType === OrderDisplay.SUPPORT) {
        setSupportUnitId(priorOrder.secondaryUnitId);
        setSupportDestinationId(priorOrder.destinationId);
      }

      if (priorOrder.orderType === OrderDisplay.SUPPORT_CONVOYED) {
        setSupportTransportedUnitId(priorOrder.secondaryUnitId);
        setSupportTransportedDestinationId(priorOrder.destinationId);
      }

      if (priorOrder.orderType === OrderDisplay.AIRLIFT || priorOrder.orderType === OrderDisplay.CONVOY) {
        setTransportedUnitId(priorOrder.secondaryUnitId);
        setTransportDestinationId(priorOrder.destinationId);
      }
    }
  });

  return(
    <div className="order-row">
      <div className="order-unit">{unit.unitDisplay}</div>
      <select className="order-type" value={orderType}
        onChange={(event: ChangeEvent<HTMLSelectElement>) => {
          handleOrderTypeChange(event.target.value);
        }}
      >
        {
          unit.orderTypes.map((orderType: string,) => {
            return <option key={orderType} value={orderType}>{orderType}</option>
          })
        }
      </select>
      {
        orderType === OrderDisplay.MOVE
          &&
        <select className="order-destination" value={moveDestinationId}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            handleMoveDestinationChange(event.target.value);
          }}
        >
          {
            unit.moveDestinations.map((destination: OptionDestination) => {
              return <option key={destination.nodeId}>{destination.nodeName}</option>
            })
          }
        </select>
      }
      {
        orderType === OrderDisplay.SUPPORT
          &&
        <select className="order-unit">
          {
            unit.supportStandardUnits.map((secondaryUnit: SecondaryUnit) => {
              return <option key={secondaryUnit.id}>{secondaryUnit.displayName}</option>
            })
          }
        </select>
      }
      {
        orderType === OrderDisplay.SUPPORT
          &&
          <select className="order-destination">
          {
            // unit.supportStandardDestinations[supportUnitId].map((destination: OptionDestination) => {
            //   return <option key={destination.nodeId}>{destination.nodeName}</option>
            // })
          }
        </select>
      }
    </div>
  )
}