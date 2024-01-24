import React, { FC } from 'react';
import { Unit }  from '../../../../utils/parsing/classes/unit';
import { UnitRender } from './UnitRender';

interface Props {
  unitData: Unit[];
}

export const UnitLayer: FC<Props> = ({unitData}) => {
  return (
    <g className="unit-layer">
      {
        unitData.map((unit, index) =>
          <UnitRender key={index} unit={unit}/>
        )
      }
    </g>
  )
}