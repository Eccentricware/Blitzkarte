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
          <polygon
            key={canal.province}
            points={canal.points}
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

export default CanalLayer;