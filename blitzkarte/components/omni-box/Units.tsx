import { FC } from "react";
import { UnitOptionsFinalized, UnitOrder } from "../../models/objects/TurnOrdersObjects";
import { UnitOrders } from "./UnitOrders";

interface UnitsProps {
  units: UnitOptionsFinalized[];
  unitOrders: any;
}

export const Units: FC<UnitsProps> = ({units, unitOrders}: UnitsProps) => {
  return (
    <div>
      <h4>Units</h4>
      <div>
        {
         units.map((unit: UnitOptionsFinalized) => {
            return <UnitOrders key={unit.unitId} unit={unit} orders={unitOrders}/>
          })
        }
      </div>
    </div>
  )
}