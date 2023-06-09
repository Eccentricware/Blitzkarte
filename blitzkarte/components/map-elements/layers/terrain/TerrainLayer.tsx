import React, { FC, Fragment } from 'react';

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
        {
          terrainRenderData
            ?
          <Fragment>
            <SeaLayer seaRenderData={terrainRenderData.sea}/>
            <LandLayer landRenderData={terrainRenderData.land}/>
            <CanalLayer canalRenderData={terrainRenderData.canal}/>
            <LineLayer lineRenderData={terrainRenderData.line}/>
          </Fragment>
            :
          <text x="10" y="10" className="error">TerrainLayer: No terrainRenderData</text>
        }
      </g>
    )
}