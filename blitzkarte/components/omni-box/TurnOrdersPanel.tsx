import { FC } from "react";
import { TurnOptions, UnitOptionsFinalized, UnitOrder } from "../../models/objects/TurnOptionsObjects";
import { DateTime } from 'luxon';
import { Units } from "./Units";

interface TurnOrdersPanelProps {
  turnOptions: TurnOptions;
  orderSet: UnitOrder[];
}

export const TurnOrdersPanel: FC<TurnOrdersPanelProps> = ({turnOptions, orderSet}: TurnOrdersPanelProps) => {
  return (
    <div>
      <h4>{turnOptions.name} - {DateTime.fromISO(turnOptions.deadline).toLocaleString(DateTime.DATETIME_SHORT)}</h4>
        { turnOptions.units && <Units units={turnOptions.units} orderSet={orderSet}/> }
      </div>
  )
}