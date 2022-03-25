import React, { FC } from 'react';

import SeaLayer from './SeaLayer';
import BridgeLayer from './BridgeLayer';
import LandLayer from './LandLayer';
import CanalLayer from './CanalLayer';

interface Props {
  terrainRenderData: any
}

export const TerrainLayer: FC<Props> = ({terrainRenderData}) => {
    return (
      <g className="terrain-layer">
        <SeaLayer seaRenderData={terrainRenderData.sea}/>
        <BridgeLayer bridgeRenderData={terrainRenderData.bridge}/>
        <LandLayer landRenderData={terrainRenderData.land}/>
        <CanalLayer canalRenderData={terrainRenderData.canal}/>
      </g>
    )
}