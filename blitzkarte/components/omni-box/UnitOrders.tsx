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
  const [order, setOrder] = useState<Order>(orders.find((order: any) => unit.unitId === order.orderedUnitId));

  const handleOrderTypeChange = (orderType: string) => {
    const updatedOrder = order;
    // if (updatedOrder) {
      updatedOrder.orderType = orderType;

      if (orderType === OrderDisplay.MOVE) {
        updatedOrder.destinationId = unit.moveDestinations[0].nodeId;
        updatedOrder.eventLoc = unit.moveDestinations[0].loc;
      }

      if (orderType === OrderDisplay.MOVE_CONVOYED) {
        updatedOrder.destinationId = unit.moveTransportedDestinations[0].nodeId;
        updatedOrder.eventLoc = unit.moveTransportedDestinations[0].loc;
      }

      if (orderType === OrderDisplay.NUKE) {
        updatedOrder.destinationId = unit.nukeTargets[0].nodeId;
        updatedOrder.eventLoc = unit.nukeTargets[0].loc;
      }

      if (orderType === OrderDisplay.SUPPORT) {
        const supportUnit = unit.supportStandardUnits[0];
        if (supportUnit.id) {
          const destination = unit.supportStandardDestinations[supportUnit.id][0];
          updatedOrder.secondaryUnitId = supportUnit.id;
          updatedOrder.secondaryUnitLoc = supportUnit.loc;
          updatedOrder.destinationId = destination.nodeId;
          updatedOrder.eventLoc = destination.loc;
        }
      }

      if (orderType === OrderDisplay.SUPPORT_CONVOYED) {
        const supportUnit = unit.supportTransportedUnits[0];
        if (supportUnit.id) {
          const destination = unit.supportTransportedDestinations[supportUnit.id][0];
          updatedOrder.secondaryUnitId = supportUnit.id;
          updatedOrder.secondaryUnitLoc = supportUnit.loc;
          updatedOrder.destinationId = destination.nodeId;
          updatedOrder.eventLoc = destination.loc;
        }
      }

      if (orderType === OrderDisplay.AIRLIFT) {
        const supportUnit = unit.transportableUnits[0];
        if (supportUnit.id) {
          const destination = unit.transportDestinations[supportUnit.id][0];
          updatedOrder.secondaryUnitId = supportUnit.id;
          updatedOrder.secondaryUnitLoc = supportUnit.loc;
          updatedOrder.destinationId = destination.nodeId;
          updatedOrder.eventLoc = destination.loc;
        }
      }

      if (orderType === OrderDisplay.CONVOY) {
        const supportUnit = unit.transportableUnits[0];
        if (supportUnit.id) {
          const destination = unit.transportDestinations[supportUnit.id][0];
          updatedOrder.secondaryUnitId = supportUnit.id;
          updatedOrder.secondaryUnitLoc = supportUnit.loc;
          updatedOrder.destinationId = destination.nodeId;
          updatedOrder.eventLoc = destination.loc;
        }
      }

      setOrder(updatedOrder);
      nudge.set(!nudge.get);
    // }
  }

  const handleMoveDestinationChange = (destinationId: string) => {
    const destination = unit.moveDestinations.find((destination: OptionDestination) => destination.nodeId === Number(destinationId));
    const updatedOrder = order;

    if (destination) {
      updatedOrder.destinationId = destination.nodeId;
      updatedOrder.eventLoc = destination.loc;
      setOrder(updatedOrder);
    }
    nudge.set(!nudge.get);
  }

  const handleMoveTransportedDestinationChange = (destinationId: string) => {
    const destination = unit.moveTransportedDestinations.find((destination: OptionDestination) => destination.nodeId === Number(destinationId));
    const updatedOrder = order;

    if (destination) {
      updatedOrder.destinationId = destination.nodeId;
      updatedOrder.eventLoc = destination.loc;
      setOrder(updatedOrder);
    }
    nudge.set(!nudge.get);
  }

  const handleNukeTargetChange = (destinationId: string) => {
    const destination = unit.nukeTargets.find((destination: OptionDestination) => destination.nodeId === Number(destinationId));
    const updatedOrder = order;

    if (updatedOrder && destination) {
      updatedOrder.destinationId = destination.nodeId;
      updatedOrder.eventLoc = destination.loc;
      setOrder(updatedOrder);
    }
    nudge.set(!nudge.get);
  }

  const handleTransportedUnitChange = (unitId: string) => {
    const updatedOrder = order;
    const supportUnit = unit.transportableUnits.find((unit: SecondaryUnit) => unit.id === Number(unitId));

    if (supportUnit) {

      if (updatedOrder && supportUnit && supportUnit.id) {
        updatedOrder.secondaryUnitId = supportUnit.id;
        updatedOrder.secondaryUnitLoc = supportUnit.loc;

        const destination = unit.transportDestinations[unitId][0];
        updatedOrder.destinationId = destination.nodeId;
        updatedOrder.eventLoc = destination.loc;
        setOrder(updatedOrder);
      }
    }
    nudge.set(!nudge.get);
  }

  const handleTransportedDestinationChange = (destinationId: string) => {
    if (order.secondaryUnitId) {
      const destination = unit.transportDestinations[order.secondaryUnitId].find((destination: OptionDestination) => destination.nodeId === Number(destinationId));
      const updatedOrder = order;

      if (updatedOrder && destination) {
        updatedOrder.destinationId = destination.nodeId;
        updatedOrder.eventLoc = destination.loc;
        setOrder(updatedOrder);
      }
    }
    nudge.set(!nudge.get);
  }

  const handleSupportTransportedUnitChange = (unitId: string) => {
    const updatedOrder = order;
    const supportUnit = unit.supportTransportedUnits.find((unit: SecondaryUnit) => unit.id === Number(unitId));

    if (supportUnit) {

      if (updatedOrder && supportUnit && supportUnit.id) {
        updatedOrder.secondaryUnitId = supportUnit.id;
        updatedOrder.secondaryUnitLoc = supportUnit.loc;

        const destination = unit.supportTransportedDestinations[unitId][0];
        updatedOrder.destinationId = destination.nodeId;
        updatedOrder.eventLoc = destination.loc;
        setOrder(updatedOrder);
      }
    }
    nudge.set(!nudge.get);
  }

  const handleSupportTransportedDestinationChange = (destinationId: string) => {
    if (order.secondaryUnitId) {
      const destination = unit.supportTransportedDestinations[order.secondaryUnitId].find((destination: OptionDestination) => destination.nodeId === Number(destinationId));
      const updatedOrder = order;

      if (updatedOrder && destination) {
        updatedOrder.destinationId = destination.nodeId;
        updatedOrder.eventLoc = destination.loc;
        setOrder(updatedOrder);
      }
    }
    nudge.set(!nudge.get);
  }

  const handleSupportUnitChange = (unitId: string) => {
    const updatedOrder = order;
    const supportUnit = unit.supportStandardUnits.find((unit: SecondaryUnit) => unit.id === Number(unitId));

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
    if (order.secondaryUnitId) {
      const destination = unit.supportStandardDestinations[order.secondaryUnitId].find((destination: OptionDestination) => destination.nodeId === Number(destinationId));
      const updatedOrder = order;

      if (updatedOrder && destination) {
        updatedOrder.destinationId = destination.nodeId;
        updatedOrder.eventLoc = destination.loc;
        setOrder(updatedOrder);
      }
    }
    nudge.set(!nudge.get);
  }

  if (!order) {
    return (
    <div className="order-row">
      <div className="order-unit">{unit.unitDisplay}</div>
      <select className="order-type" disabled>
        <option>Hold</option>
      </select>
      <select className="order-destination" disabled>
        <option>Error</option>
      </select>
    </div>
    )
  }

  return(
    <div className="order-row">
      <div className="order-unit">{unit.unitDisplay}</div>
      <select className="order-type" value={order.orderType}
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
        order.orderType === OrderDisplay.MOVE
          &&
        <select className="order-destination" value={order.destinationId}
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
        order.orderType === OrderDisplay.MOVE_CONVOYED
          &&
        <select className="order-destination" value={order.destinationId}
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
        order.orderType === OrderDisplay.NUKE
          &&
        <select className="order-destination" value={order.destinationId}
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
        order.orderType === OrderDisplay.SUPPORT
          &&
        <Fragment>
          <select className="order-unit" value={order.secondaryUnitId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              handleSupportUnitChange(event.target.value);
            }}
          >
            {
              unit.supportStandardUnits.map((secondaryUnit: SecondaryUnit) => {
                return <option key={secondaryUnit.id} value={secondaryUnit.id}>{secondaryUnit.displayName}</option>
              })
            }
          </select>
          <select className="order-destination" value={order.destinationId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              handleSupportDestinationChange(event.target.value);
            }}
          >
            {
              order.secondaryUnitId
                &&
              unit.supportStandardDestinations[order.secondaryUnitId].map((destination: OptionDestination) => {
                return <option key={destination.nodeId} value={destination.nodeId}>{destination.nodeName}</option>
              })
            }
          </select>
        </Fragment>
      }
      {
        order.orderType === OrderDisplay.SUPPORT_CONVOYED
          &&
        <Fragment>
          <select className="order-unit" value={order.secondaryUnitId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              handleSupportTransportedUnitChange(event.target.value);
            }}
          >
            {
              unit.supportTransportedUnits.map((secondaryUnit: SecondaryUnit) => {
                return <option key={secondaryUnit.id} value={secondaryUnit.id}>{secondaryUnit.displayName}</option>
              })
            }
          </select>
          <select className="order-destination" value={order.destinationId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              handleSupportTransportedDestinationChange(event.target.value);
            }}
          >
            {
              order.secondaryUnitId
                &&
              unit.supportTransportedDestinations[order.secondaryUnitId].map((destination: OptionDestination) => {
                return <option key={destination.nodeId} value={destination.nodeId}>{destination.nodeName}</option>
              })
            }
          </select>
        </Fragment>
      }
      {
        order.orderType === OrderDisplay.AIRLIFT
          &&
        <Fragment>
          <select className="order-unit" value={order.secondaryUnitId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              handleTransportedUnitChange(event.target.value);
            }}
          >
            {
              unit.transportableUnits.map((secondaryUnit: SecondaryUnit) => {
                return <option key={secondaryUnit.id} value={secondaryUnit.id}>{secondaryUnit.displayName}</option>
              })
            }
          </select>
          <select className="order-destination" value={order.destinationId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              handleTransportedDestinationChange(event.target.value);
            }}
          >
            {
              order.secondaryUnitId
                &&
              unit.transportDestinations[order.secondaryUnitId].map((destination: OptionDestination) => {
                return <option key={destination.nodeId} value={destination.nodeId}>{destination.nodeName}</option>
              })
            }
          </select>
        </Fragment>
      }
      {
        order.orderType === OrderDisplay.CONVOY
          &&
        <Fragment>
          <select className="order-unit" value={order.secondaryUnitId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              handleTransportedUnitChange(event.target.value);
            }}
          >
            {
              unit.transportableUnits.map((secondaryUnit: SecondaryUnit) => {
                return <option key={secondaryUnit.id} value={secondaryUnit.id}>{secondaryUnit.displayName}</option>
              })
            }
          </select>
          <select className="order-destination" value={order.destinationId}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              handleTransportedDestinationChange(event.target.value);
            }}
          >
            {
              order.secondaryUnitId
                &&
              unit.transportDestinations[order.secondaryUnitId].map((destination: OptionDestination) => {
                return <option key={destination.nodeId} value={destination.nodeId}>{destination.nodeName}</option>
              })
            }
          </select>
        </Fragment>
      }
    </div>
  )
}