import { FC } from "react";
import { DateTime } from 'luxon';
import { Units } from "./Units";
import { TurnOptions, UnitOrder } from "../../models/objects/TurnOrdersObjects";

interface TurnOrdersPanelProps {
  turnOptions: TurnOptions;
  orders: any;
}

export const TurnOrdersPanel: FC<TurnOrdersPanelProps> = ({turnOptions, orders}: TurnOrdersPanelProps) => {
  return (
    <div>
      <h4>{turnOptions.name} - {DateTime.fromISO(turnOptions.deadline).toLocaleString(DateTime.DATETIME_SHORT)}</h4>
        {
          turnOptions.units
          &&
          <Units units={turnOptions.units}
            unitOrders={orders.units}
          />
        }
      </div>
  )
}