import React, { FC } from 'react';
import { Terrain } from '../../../../utils/parsing/classes/terrain';

interface Props {
  bridgeRenderData: Terrain[]
}

const BridgeLayer: FC<Props> = ({ bridgeRenderData }: Props) => {
  return (
    <React.Fragment>
      {
        bridgeRenderData.map(bridge => (
          <g key={bridge.province}>
            <polygon
              points={bridge.points}
              fill="#42cafe"
              strokeMiterlimit="10"
              stroke="white"
              strokeWidth="4"
              transform="translate(-16000 10000)"
            />
            <polygon
              points={bridge.points}
              fill="#42cafe"
              strokeMiterlimit="10"
              stroke="white"
              strokeWidth="4"
            />
            <polygon
              points={bridge.points}
              fill="#42cafe"
              strokeMiterlimit="10"
              stroke="white"
              strokeWidth="4"
              transform="translate(16000 10000)"
            />
          </g>
        ))
      }
    </React.Fragment>
  )
}

export default BridgeLayer;