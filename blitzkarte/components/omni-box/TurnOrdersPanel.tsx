import { FC } from "react";
import { DateTime } from 'luxon';
import { Units } from "./Units";
import { TurnOptions, UnitOrder } from "../../models/objects/TurnOrdersObjects";
import { TechTransfer } from "./TechTransfer";
import { BuildTransfer } from "./BuildTransfer";

interface TurnOrdersPanelProps {
  turnOptions: any;
  orders: any;
  nudge: any;
}

export const TurnOrdersPanel: FC<TurnOrdersPanelProps> = ({turnOptions, orders, nudge}: TurnOrdersPanelProps) => {
  return (
    <div>
      <h4>{turnOptions.name} - {DateTime.fromISO(turnOptions.deadline).toLocaleString(DateTime.DATETIME_SHORT)}</h4>
        {
          turnOptions.units
            &&
          <Units units={turnOptions.units}
            unitOrders={orders.units}
            nudge={nudge}
          />
        }
        {
          turnOptions.transfers
            &&
          <BuildTransfer transferOptions={turnOptions.transfers}/>
        }
        {
          turnOptions.transfers
           &&
          <TechTransfer transferOptions={turnOptions.transfers}/>
        }
      </div>
  )
}