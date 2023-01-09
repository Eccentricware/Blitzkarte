import { FC } from "react";
import { UnitOptionsFinalized, UnitOrder } from "../../models/objects/TurnOrdersObjects";
import { UnitOrders } from "./UnitOrders";

interface UnitsProps {
  units: {
    turnStatus: string;
    options: UnitOptionsFinalized[]; // If (spring orders/retreats or fall orders/retreats)}
  };
  unitOrders: any;
  nudge: any;
}

export const Units: FC<UnitsProps> = ({units, unitOrders, nudge}: UnitsProps) => {
  console.log('Units.unitOrders:', unitOrders)
  return (
    <div>
      <div>
        {
         units.options.map((unit: UnitOptionsFinalized) => {
            return <UnitOrders key={unit.unitId} unit={unit} orders={unitOrders} nudge={nudge}/>
          })
        }
      </div>
    </div>
  )
}