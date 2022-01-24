import React, { FC } from 'react';
import { CityPin } from '../../utils/Parsing/cityPin';

interface Props {
  supplyCenters: CityPin[]
}

export const SupplyCenterLayer: FC<Props> = ({supplyCenters}: Props) => {
  return (
    <React.Fragment>
    {
      supplyCenters.map((city, i) => {
        return (
          <circle key={i}
            cx={city.loc[0]}
            cy={city.loc[1]}
            r={20}
            fill={city.statusColor}
            stroke="black"
            strokeWidth={3}
          />
        )
      })
    }
    </React.Fragment>
  )
}