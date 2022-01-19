import React, { FC } from 'react';
import { RenderElement } from '../../utils/renderElement';

interface Props {
  landRenderData: RenderElement[]
}

const LandLayer: FC<Props> = ({landRenderData}: Props) => {
  return (
    <React.Fragment>
      {
        landRenderData.map(land => (
          <polygon
            key={land.province}
            points={land.points}
            fill="#85A587"
            strokeMiterlimit="10"
            stroke="black"
            strokeWidth="4"
          />
        ))
      }
    </React.Fragment>
  )
}

export default LandLayer;