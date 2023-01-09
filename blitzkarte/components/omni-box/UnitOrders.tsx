import { Select, SelectChangeEvent } from "@mui/material";
import { ChangeEvent, FC, Fragment, useContext, useEffect, useState } from "react";
import { OrderDisplay } from "../../models/enumeration/order-enums";
import { OptionDestination, Order, SecondaryUnit, UnitOptionsFinalized, UnitOrder } from "../../models/objects/TurnOrdersObjects";
import Blitzkontext from "../../utils/Blitzkontext";

interface UnitProps {
  unit: UnitOptionsFinalized;
  orders: any;
  nudge: any;
}

export const UnitOrders: FC<UnitProps> = ({unit, orders, nudge}: UnitProps) => {
  const [order, setOrder] = useState<Order|undefined>(undefined);
  const [orderType, setOrderType] = useState<string>(unit.orderTypes[0]);
  const [moveDestinationId, setMoveDestinationId] = useState<number>(0);
  const [moveTransportedDestinationId, setMoveTransportedDestinationId] = useState<number>(0);
  const [nukeTargetId, setNukeTargetId] = useState<number>(0);
  const [supportUnitId, setSupportUnitId] = useState<number>(0);
  const [supportDestinationId, setSupportDestinationId] = useState<number>(0);
  const [standardSupport, setStandardSupport] = useState({unitId: supportUnitId, destinationId: supportDestinationId });
  const [supportTranportedUnitId, setSupportTransportedUnitId] = useState<number>(0);
  const [supportTransportedDestinationId, setSupportTransportedDestinationId] = useState<number>(0);
  const [transportedUnitId, setTransportedUnitId] = useState<number>(0);
  const [transportDestinationId, setTransportDestinationId] = useState<number>(0);

  const handleOrderTypeChange = (orderType: string) => {
    setOrderType(orderType);

    const updatedOrder = order;
    if (updatedOrder) {
      updatedOrder.orderType = orderType;

      if (orderType === OrderDisplay.MOVE) {
        setMoveDestinationId(unit.moveDestinations[0].nodeId);
        updatedOrder.destinationId = unit.moveDestinations[0].nodeId;
        updatedOrder.eventLoc = unit.moveDestinations[0].loc;
      }

      if (orderType === OrderDisplay.MOVE_CONVOYED) {
        setMoveTransportedDestinationId(unit.moveTransportedDestinations[0].nodeId);
        updatedOrder.destinationId = unit.moveTransportedDestinations[0].nodeId;
        updatedOrder.eventLoc = unit.moveTransportedDestinations[0].loc;
      }

      if (orderType === OrderDisplay.DETONATE) {
        setNukeTargetId(unit.nukeTargets[0].nodeId);
        updatedOrder.destinationId = unit.nukeTargets[0].nodeId;
        updatedOrder.eventLoc = unit.nukeTargets[0].loc;
      }

      if (orderType === OrderDisplay.SUPPORT) {
        const supportUnit = unit.supportStandardUnits[0];
        if (supportUnit.id) {
          const destination = unit.supportStandardDestinations[supportUnit.id][0];
          setSupportUnitId(supportUnit.id);
          updatedOrder.secondaryUnitId = supportUnit.id;
          updatedOrder.secondaryUnitLoc = supportUnit.loc;
          setSupportDestinationId(destination.nodeId);
          updatedOrder.destinationId = destination.nodeId;
          updatedOrder.eventLoc = destination.loc;
        }
      }

      setOrder(updatedOrder);
      nudge.set(!nudge.get);
    }
  }

  const handleMoveDestinationChange = (destinationId: string) => {
    const destination = unit.moveDestinations.find((destination: OptionDestination) => destination.nodeId === Number(destinationId));
    setMoveDestinationId(Number(destinationId));
    const updatedOrder = order;

    if (updatedOrder && destination) {
      updatedOrder.destinationId = destination.nodeId;
      updatedOrder.eventLoc = destination.loc;
      setOrder(updatedOrder);
    }
    nudge.set(!nudge.get);
  }

  const handleMoveTransportedDestinationChange = (destinationId: string) => {
    const destination = unit.moveTransportedDestinations.find((destination: OptionDestination) => destination.nodeId === Number(destinationId));
    setMoveTransportedDestinationId(Number(destinationId));
    const updatedOrder = order;

    if (updatedOrder && destination) {
      updatedOrder.destinationId = destination.nodeId;
      updatedOrder.eventLoc = destination.loc;
      setOrder(updatedOrder);
    }
    nudge.set(!nudge.get);
  }

  const handleNukeTargetChange = (destinationId: string) => {
    const destination = unit.nukeTargets.find((destination: OptionDestination) => destination.nodeId === Number(destinationId));
    setNukeTargetId(Number(destinationId));
    const updatedOrder = order;

    if (updatedOrder && destination) {
      updatedOrder.destinationId = destination.nodeId;
      updatedOrder.eventLoc = destination.loc;
      setOrder(updatedOrder);
    }
    nudge.set(!nudge.get);
  }

  const handleSupportUnitChange = (unitId: string) => {
    const updatedOrder = order;
    const supportUnit = unit.supportStandardUnits.find((unit: SecondaryUnit) => unit.id === Number(unitId));
    setSupportUnitId(Number(unitId));
    setSupportDestinationId(unit.supportStandardDestinations[unitId][0].nodeId);
    if (supportUnit) {

      if (updatedOrder && supportUnit && supportUnit.id) {
        updatedOrder.secondaryUnitId = supportUnit.id;
        updatedOrder.secondaryUnitLoc = supportUnit.loc;

        const destination = unit.supportStandardDestinations[unitId][0];
        updatedOrder.destinationId = destination.nodeId;
        updatedOrder.eventLoc = destination.loc;
        setOrder(updatedOrder);
      }
    }
    nudge.set(!nudge.get);
  }

  const handleSupportDestinationChange = (destinationId: string) => {
    const destination = unit.moveDestinations.find((destination: OptionDestination) => destination.nodeId === Number(destinationId));
    setSupportDestinationId(Number(destinationId));
    const updatedOrder = order;

    if (updatedOrder && destination) {
      updatedOrder.destinationId = destination.nodeId;
      updatedOrder.eventLoc = destination.loc;
      setOrder(updatedOrder);
    }
    nudge.set(!nudge.get);
  }

  useEffect(() => {
    const priorOrder: Order = orders.find((order: any) => unit.unitId === order.orderedUnitId);
    if (priorOrder) {
      setOrder(priorOrder);
      setOrderType(priorOrder.orderType);
      if (priorOrder.orderType === OrderDisplay.MOVE && priorOrder.destinationId) {
        setMoveDestinationId(priorOrder.destinationId);
      }

      if (priorOrder.orderType === OrderDisplay.MOVE_CONVOYED && priorOrder.destinationId) {
        setMoveTransportedDestinationId(priorOrder.destinationId);
      }

      if (priorOrder.orderType === OrderDisplay.DETONATE && priorOrder.destinationId) {
        setNukeTargetId(priorOrder.destinationId);
      }

      if (priorOrder.orderType === OrderDisplay.SUPPORT && priorOrder.secondaryUnitId && priorOrder.destinationId) {
        setSupportUnitId(priorOrder.secondaryUnitId);
        setSupportDestinationId(priorOrder.destinationId);
      }

      if (priorOrder.orderType === OrderDisplay.SUPPORT_CONVOYED && priorOrder.secondaryUnitId && priorOrder.destinationId) {
        setSupportTransportedUnitId(priorOrder.secondaryUnitId);
        setSupportTransportedDestinationId(priorOrder.destinationId);
      }

      if ((priorOrder.orderType === OrderDisplay.AIRLIFT || priorOrder.orderType === OrderDisplay.CONVOY)
      && priorOrder.secondaryUnitId && priorOrder.destinationId) {
        setTransportedUnitId(priorOrder.secondaryUnitId);
        setTransportDestinationId(priorOrder.destinationId);
      }
    }
  }, []);

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
              return <option key={destination.nodeId} value={destination.nodeId}>{destination.nodeName}</option>
            })
          }
        </select>
      }
      {
        orderType === OrderDisplay.MOVE_CONVOYED
          &&
        <select className="order-destination" value={moveTransportedDestinationId}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            handleMoveTransportedDestinationChange(event.target.value);
          }}
        >
          {
            unit.moveTransportedDestinations.map((destination: OptionDestination) => {
              return <option key={destination.nodeId} value={destination.nodeId}>{destination.nodeName}</option>
            })
          }
        </select>
      }
      {
        orderType === OrderDisplay.DETONATE
          &&
        <select className="order-destination" value={nukeTargetId}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            handleNukeTargetChange(event.target.value);
          }}
        >
          {
            unit.nukeTargets.map((destination: OptionDestination) => {
              return <option key={destination.nodeId} value={destination.nodeId}>{destination.nodeName}</option>
            })
          }
        </select>
      }
      {
        orderType === OrderDisplay.SUPPORT
          &&
        <Fragment>
          <select className="order-unit" value={supportUnitId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              handleSupportUnitChange(event.target.value);
            }}
          >
            {
              unit.supportStandardUnits.map((secondaryUnit: SecondaryUnit) => {
                return <option key={secondaryUnit.id}>{secondaryUnit.displayName}</option>
              })
            }
          </select>
          <select className="order-destination" value={supportDestinationId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              handleSupportDestinationChange(event.target.value);
            }}
          >
            {
              unit.supportStandardDestinations[supportUnitId].map((destination: OptionDestination) => {
                return <option key={destination.nodeId}>{destination.nodeName}</option>
              })
            }
          </select>
        </Fragment>
      }
    </div>
  )
}