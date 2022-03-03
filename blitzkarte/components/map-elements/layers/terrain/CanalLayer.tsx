import React, { FC } from 'react';
import { RenderElement } from '../../../../utils/parsing/classes/render-element';

interface Props {
  canalRenderData: RenderElement[]
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