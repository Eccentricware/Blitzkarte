import React, { FC } from 'react';
import { City } from '../../../../utils/parsing/classes/city';

interface Props {
  supplyCenters: City[]
}

export const SupplyCenterLayer: FC<Props> = ({supplyCenters}: Props) => {
  return (
    <React.Fragment>
    {
      supplyCenters.map((city, i) => {
        return (
          <g key={i}>
            <circle
              cx={city.loc[0] - 16000}
              cy={city.loc[1]}
              r={20}
              fill={city.statusColor}
              stroke="black"
              strokeWidth={3}
            />
            <circle
              cx={city.loc[0]}
              cy={city.loc[1]}
              r={20}
              fill={city.statusColor}
              stroke="black"
              strokeWidth={3}
            />
            <circle
              cx={city.loc[0] + 16000}
              cy={city.loc[1]}
              r={20}
              fill={city.statusColor}
              stroke="black"
              strokeWidth={3}
            />
          </g>
        )
      })
    }
    </React.Fragment>
  )
}