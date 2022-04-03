import React, { FC } from 'react';
import { Terrain } from '../../../../utils/parsing/classes/terrain';

interface Props {
  seaRenderData: Terrain[]
}

const SeaLayer: FC<Props> = ({seaRenderData}: Props) => {
  return (
    <g className="sea-layer">
      {
        seaRenderData.map(sea => {
          return (
            <g key={sea.province}>
              <polygon
                points={sea.points}
                fill="#42cafe"
                strokeMiterlimit="10"
                stroke="white"
                strokeWidth="8"
                transform={`translate(-16000 0)`}
              />
              <polygon
                points={sea.points}
                fill="#42cafe"
                strokeMiterlimit="10"
                stroke="white"
                strokeWidth="8"
              />
              <polygon
                points={sea.points}
                fill="#42cafe"
                strokeMiterlimit="10"
                stroke="white"
                strokeWidth="8"
                transform={`translate(16000 0)`}
              />
            </g>
          )
        })
      }
    </g>
  )
}

export default SeaLayer;