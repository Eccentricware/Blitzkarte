import React, { FC } from 'react';
import { Terrain } from '../../../../utils/parsing/classes/terrain';

interface Props {
  canalRenderData: Terrain[]
}

const CanalLayer: FC<Props> = ({ canalRenderData }: Props) => {
  return (
    <React.Fragment>
      {
        canalRenderData.map(canal => (
          <g key={canal.province}>
            <polygon
              points={canal.points}
              fill="#42cafe"
              strokeMiterlimit="10"
              stroke="white"
              strokeWidth="4"
              transform={`translate(-16000 0)`}
            />
            <polygon
              points={canal.points}
              fill="#42cafe"
              strokeMiterlimit="10"
              stroke="white"
              strokeWidth="4"
            />
            <polygon
              points={canal.points}
              fill="#42cafe"
              strokeMiterlimit="10"
              stroke="white"
              strokeWidth="4"
              transform={`translate(16000 0)`}
            />
          </g>
        ))
      }
    </React.Fragment>
  )
}

export default CanalLayer;