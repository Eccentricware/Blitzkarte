import React, { FC } from 'react';
import { RenderElement } from '../../../../utils/parsing/classes/render-element';

interface Props {
  seaRenderData: RenderElement[]
}

const SeaLayer: FC<Props> = ({seaRenderData}: Props) => {
  return (
    <React.Fragment>
      {
        seaRenderData.map(sea => {
          return (
            <g key={sea.province}>
              <polygon
                points={sea.points}
                fill="#42cafe"
                strokeMiterlimit="10"
                stroke="white"
                strokeWidth="4"
                transform={`translate(-16000 0)`}
              />
              <polygon
                points={sea.points}
                fill="#42cafe"
                strokeMiterlimit="10"
                stroke="white"
                strokeWidth="4"
              />
              <polygon
                points={sea.points}
                fill="#42cafe"
                strokeMiterlimit="10"
                stroke="white"
                strokeWidth="4"
                transform={`translate(16000 0)`}
              />
            </g>
          )
        })
      }
    </React.Fragment>
  )
}

export default SeaLayer;