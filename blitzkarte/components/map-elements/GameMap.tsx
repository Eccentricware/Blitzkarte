import React, { FC } from 'react';
import { TerrainLayer } from './TerrainLayer';
import { LabelLayer } from './LabelLayer';
import { CityLayer } from './CityLayer';

interface Props {
  renderData: any
}

let country: string = 'australia';

export const GameMap: FC<Props> = ({renderData}: Props) => {
  return (
    <svg id="map" className="map" width="1488" height="930" viewBox="0 0 16000 10000">
      <TerrainLayer terrainRenderData={renderData.terrain} />
      <CityLayer cityData={renderData.cities}/>
      <LabelLayer labelRenderData={renderData.labels}/>
    </svg>
  )
}