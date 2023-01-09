import { FC } from "react";
import { UnitOptionsFinalized, UnitOrder } from "../../models/objects/TurnOrdersObjects";
import { UnitOrders } from "./UnitOrders";

interface UnitsProps {
  units: UnitOptionsFinalized[];
  unitOrders: any;
  nudge: any;
}

export const Units: FC<UnitsProps> = ({units, unitOrders, nudge}: UnitsProps) => {
  return (
    <div>
      <div>
        {
         units.map((unit: UnitOptionsFinalized) => {
            return <UnitOrders key={unit.unitId} unit={unit} orders={unitOrders} nudge={nudge}/>
          })
        }
      </div>
    </div>
  )
}