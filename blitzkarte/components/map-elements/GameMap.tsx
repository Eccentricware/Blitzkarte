import React, { FC } from 'react';
import { RenderElement } from '../../utils/renderElement';
import { TerrainLayer } from './TerrainLayer';

interface Props {
  terrainRenderData: any
}

export const GameMap: FC<Props> = ({terrainRenderData}) => {
  return (
    <svg id="map" className="map" width="1488" height="930" viewBox="0 0 16000 10000">
      <TerrainLayer terrainRenderData={terrainRenderData} />
    </svg>
  )
}