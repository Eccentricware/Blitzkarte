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
              fill={land.fill}
              strokeMiterlimit="1"
              stroke={land.stroke}
              strokeWidth="4"
              transform={`translate(-16000 0)`}
            />
            <polygon
              points={land.points}
              fill={land.fill}
              strokeMiterlimit="1"
              stroke={land.stroke}
              strokeWidth="4"
            />
            <polygon
              points={land.points}
              fill={land.fill}
              strokeMiterlimit="1"
              stroke={land.stroke}
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