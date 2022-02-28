import React, { FC } from 'react';
import { RenderElement } from '../../utils/renderElement';

interface Props {
  bridgeRenderData: RenderElement[]
}

const BridgeLayer: FC<Props> = ({ bridgeRenderData }: Props) => {
  return (
    <React.Fragment>
      {
        bridgeRenderData.map(bridge => (
          <polygon
            key={bridge.province}
            points={bridge.points}
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

export default BridgeLayer;