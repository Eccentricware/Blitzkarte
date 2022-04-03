import React, { FC } from 'react';
import { Terrain } from '../../../../utils/parsing/classes/terrain';

interface Props {
  lineRenderData: Terrain[]
}

const LineLayer: FC<Props> = ({ lineRenderData }: Props) => {
  return (
    <React.Fragment>
      {
        lineRenderData.map(line => (
          <g key={line.province}>
            <polyline
              points={line.points}
              fill={line.fill}
              strokeMiterlimit="10"
              stroke={line.stroke}
              strokeWidth="8"
              transform="translate(-16000 10000)"
            />
            <polyline
              points={line.points}
              fill={line.fill}
              strokeMiterlimit="10"
              stroke={line.stroke}
              strokeWidth="8"
            />
            <polyline
              points={line.points}
              fill={line.fill}
              strokeMiterlimit="10"
              stroke={line.stroke}
              strokeWidth="8"
              transform="translate(16000 10000)"
            />
          </g>
        ))
      }
    </React.Fragment>
  )
}

export default LineLayer;