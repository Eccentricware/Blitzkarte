import React, { FC } from 'react';
//import { RenderElement } from '../../utils/renderElement';
import { TerrainLayer } from './TerrainLayer';
import { LabelLayer } from './LabelLayer';

interface Props {
  renderData: any
}

export const GameMap: FC<Props> = ({renderData}) => {
  return (
    <svg id="map" className="map" width="1488" height="930" viewBox="0 0 16000 10000">
      <TerrainLayer terrainRenderData={renderData.terrain} />
      <LabelLayer labelRenderData={renderData.labels}/>
    </svg>
  )
}