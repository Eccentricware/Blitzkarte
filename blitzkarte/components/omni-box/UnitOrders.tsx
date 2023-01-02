import { Select, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { OrderDisplay } from "../../models/enumeration/order-enums";
import { OptionDestination, SecondaryUnit, UnitOptionsFinalized, UnitOrder } from "../../models/objects/TurnOptionsObjects";

interface UnitProps {
  unit: UnitOptionsFinalized;
  orderSet: UnitOrder[];
}

export const UnitOrders: FC<UnitProps> = ({unit, orderSet}: UnitProps) => {
  const [order, setOrder] = useState<UnitOrder|undefined>(undefined);
  const [orderType, setOrderType] = useState('Hold');
  const [moveDestinationId, setMoveDestinationId] = useState(0);
  const [moveTransportedDestinationId, setMoveTransportedDestinationId] = useState(0);
  const [nukeTargetId, setNukeTargetId] = useState(0);
  const [supportUnitId, setSupportUnitId] = useState(0);
  const [supportDestinationId, setSupportDestinationId] = useState(0);
  const [supportTranportedUnitId, setSupportTransportedUnitId] = useState(0);
  const [supportTransportedDestinationId, setSupportTransportedDestinationId] = useState(0);
  const [transportedUnitId, setTransportedUnitId] = useState(0);
  const [transportDestinationId, setTransportDestinationId] = useState(0);

  const handleOrderTypeChange = (orderType: string) => {
    setOrderType(orderType);
  }

  const handleMoveDestinationChange = (destinationId: string) => {
    setMoveDestinationId(moveDestinationId);
  }

  useEffect(() => {
    const priorOrder = orderSet.find((order: UnitOrder) => unit.unitId === order.unitId);
    if (priorOrder) {
      setOrder(priorOrder);
    } else {

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
            unit.supportStandardDestinations[supportUnitId].map((destination: OptionDestination) => {
              return <option key={destination.nodeId}>{destination.nodeName}</option>
            })
          }
        </select>
      }
    </div>
  )
}