import { FC } from 'react';
import { TerrainLayer } from './layers/terrain/TerrainLayer';
import { LabelLayer } from './layers/label/LabelLayer';
import { CityLayer } from './layers/city/CityLayer';
import { UnitLayer } from './layers/unit/UnitLayer';
import { NodeLayer } from './layers/node/NodeLayer';

interface Props {
  renderData: any;
}

export const GameMap: FC<Props> = ({renderData}: Props) => {
  return (
    <svg id="map" className="map" width="1488" height="930" viewBox="0 0 16000 10000">
      <TerrainLayer terrainRenderData={renderData.terrain} />
      <CityLayer cityData={renderData.cities}/>
      <LabelLayer labelRenderData={renderData.labels} />
      { renderData.nodes.display ?
        <NodeLayer nodeData={renderData.nodes}/>
        :
        <UnitLayer unitData={renderData.units} />
      }

    </svg>
  )
}