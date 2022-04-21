import { FC, useState } from 'react';
import { TerrainLayer } from '../layers/terrain/TerrainLayer';
import { LabelLayer } from '../layers/label/LabelLayer';
import { CityLayer } from '../layers/city/CityLayer';
import { UnitLayer } from '../layers/unit/UnitLayer';
import { NodeLayer } from '../layers/node/NodeLayer';
import Blitzkontext from '../../../utils/Blitzkontext';

interface Props {
  renderData: any;
}

export const GameMap: FC<Props> = ({renderData}: Props) => {
  return (
    <Blitzkontext.Consumer>
      {({map}) => {
        return (
          <svg id="map" className="map" width="16000" height="10000"
            viewBox={`${map.view.x} ${map.view.y} ${map.view.width} ${map.view.height}`}>
            <TerrainLayer terrainRenderData={renderData.terrain} />
            <CityLayer cityData={renderData.cities}/>
            <LabelLayer labelPinData={renderData.labels} labelLineData={renderData.labelLines} />
            { renderData.nodes.display ?
              <NodeLayer nodeData={renderData.nodes}/>
              :
              <UnitLayer unitData={renderData.units} />
            }
          </svg>
        )
      }}
    </Blitzkontext.Consumer>
  )
}