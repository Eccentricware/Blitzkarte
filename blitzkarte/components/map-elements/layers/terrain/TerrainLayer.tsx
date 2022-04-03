import React, { FC } from 'react';

import SeaLayer from './SeaLayer';
import LineLayer from './LineLayer';
import LandLayer from './LandLayer';
import CanalLayer from './CanalLayer';

interface Props {
  terrainRenderData: any
}

export const TerrainLayer: FC<Props> = ({terrainRenderData}) => {
    return (
      <g className="terrain-layer">
        <SeaLayer seaRenderData={terrainRenderData.sea}/>
        <LandLayer landRenderData={terrainRenderData.land}/>
        <CanalLayer canalRenderData={terrainRenderData.canal}/>
        <LineLayer lineRenderData={terrainRenderData.line}/>
      </g>
    )
}