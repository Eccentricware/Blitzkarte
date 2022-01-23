import React, { FC } from 'react';
import { Pin } from '../../utils/Parsing/pin';

interface Props {
  supplyCenters: Pin[]
}

export const SupplyCenterLayer: FC<Props> = ({supplyCenters}: Props) => {
  return (
    <React.Fragment>
    {
      supplyCenters.map((city, i) => {
        return (
          <circle key={city.id ? city.id : i}
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