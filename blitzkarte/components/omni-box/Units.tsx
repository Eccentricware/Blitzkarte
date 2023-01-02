import { FC } from "react";
import { UnitOptionsFinalized, UnitOrder } from "../../models/objects/TurnOptionsObjects";
import { UnitOrders } from "./UnitOrders";

interface UnitsProps {
  units: UnitOptionsFinalized[];
  orderSet: UnitOrder[];
}

export const Units: FC<UnitsProps> = ({units, orderSet}: UnitsProps) => {
  return (
    <div>
      <h4>Units</h4>
      <div>
        {
         units.map((unit: UnitOptionsFinalized) => {
            return <UnitOrders key={unit.unitId} unit={unit} orderSet={orderSet}/>
          })
        }
      </div>
    </div>
  )
}