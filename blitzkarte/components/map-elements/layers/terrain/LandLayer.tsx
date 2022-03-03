import React, { FC } from 'react';
import { RenderElement } from '../../../../utils/parsing/classes/render-element';

interface Props {
  landRenderData: RenderElement[]
}

const LandLayer: FC<Props> = ({landRenderData}: Props) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}

export default LandLayer;