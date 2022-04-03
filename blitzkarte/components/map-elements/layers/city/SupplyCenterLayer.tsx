import React, { FC } from 'react';
import { City } from '../../../../utils/parsing/classes/city';

interface Props {
  supplyCenters: City[]
}

export const SupplyCenterLayer: FC<Props> = ({supplyCenters}: Props) => {
  return (
    <g className="supply-center-layer">
    {
      supplyCenters.map((city, i) => {
        return (
          <g key={i}>
            <circle
              cx={city.loc[0] - 16000}
              cy={city.loc[1]}
              r={25}
              fill={city.statusColor}
              stroke="black"
              strokeWidth={4}
            />
            <circle
              cx={city.loc[0]}
              cy={city.loc[1]}
              r={25}
              fill={city.statusColor}
              stroke="black"
              strokeWidth={4}
            />
            <circle
              cx={city.loc[0] + 16000}
              cy={city.loc[1]}
              r={25}
              fill={city.statusColor}
              stroke="black"
              strokeWidth={4}
            />
          </g>
        )
      })
    }
    </g>
  )
}