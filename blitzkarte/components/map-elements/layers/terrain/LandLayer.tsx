import React, { FC } from 'react';
import { Terrain } from '../../../../utils/parsing/classes/terrain';

interface Props {
  landRenderData: Terrain[]
}

const LandLayer: FC<Props> = ({landRenderData}: Props) => {
  return (
    <g className="land-layer">
      {
        landRenderData.map(land => (
          <g key={land.province}>
            <polygon
              points={land.points}
              fill="#85A587"
              strokeMiterlimit="10"
              stroke="black"
              strokeWidth="4"
              transform={`translate(-16000 0)`}
            />
            <polygon
              points={land.points}
              fill="#85A587"
              strokeMiterlimit="10"
              stroke="black"
              strokeWidth="4"
            />
            <polygon
              points={land.points}
              fill="#85A587"
              strokeMiterlimit="10"
              stroke="black"
              strokeWidth="4"
              transform={`translate(16000 0)`}
            />
          </g>
        ))
      }
    </g>
  )
}

export default LandLayer;