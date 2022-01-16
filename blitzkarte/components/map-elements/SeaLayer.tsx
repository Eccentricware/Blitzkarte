import React, { FC } from 'react';
import { RenderElement } from '../../utils/renderElement';

interface Props {
  seaRenderData: RenderElement[]
}

const SeaLayer: FC<Props> = ({seaRenderData}: Props) => {
  return (
    <React.Fragment>
      {
        seaRenderData.map(sea => (
          <polygon
            key={sea.province}
            points={sea.points}
            fill="#42cafe"
            strokeMiterlimit="10"
            stroke="white"
            strokeWidth="4"
          />
        ))
      }
    </React.Fragment>
  )
}

export default SeaLayer;