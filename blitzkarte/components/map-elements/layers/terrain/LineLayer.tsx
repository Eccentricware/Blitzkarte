import React, { FC } from 'react';
import { Terrain } from '../../../../utils/parsing/classes/terrain';

interface Props {
  lineRenderData: Terrain[]
}

const LineLayer: FC<Props> = ({ lineRenderData }: Props) => {
  return (
    <g className="line-layer">
      {
        lineRenderData.map(line => (
          <g key={line.name}>
            <polyline
              points={line.points}
              fill="none"
              strokeMiterlimit="10"
              stroke="red"
              strokeWidth="12"
              transform="translate(-16000 10000)"
            />
            <polyline
              points={line.points}
              fill="none"
              strokeMiterlimit="10"
              stroke="red"
              strokeWidth="12"
            />
            <polyline
              points={line.points}
              fill="none"
              strokeMiterlimit="10"
              stroke="red"
              strokeWidth="12"
              transform="translate(16000 10000)"
            />
          </g>
        ))
      }
    </g>
  )
}

export default LineLayer;