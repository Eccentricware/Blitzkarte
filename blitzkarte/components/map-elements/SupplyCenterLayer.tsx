import React, { FC } from 'react';
import { Pin } from '../../utils/Parsing/pin';

interface Props {
  supplyCenters: Pin[]
}

export const SupplyCenterLayer: FC<Props> = ({supplyCenters}: Props) => {
  return (
    <React.Fragment>
    {
      supplyCenters.map((supplyCenter, i) => {
        return (
          <polygon key={i}/>
        )
      })
    }
    </React.Fragment>
  )
}