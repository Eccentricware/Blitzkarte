import { FC, useContext, useEffect, useState } from 'react';
import { TerrainLayer } from '../layers/terrain/TerrainLayer';
import { LabelLayer } from '../layers/label/LabelLayer';
import { CityLayer } from '../layers/city/CityLayer';
import { UnitLayer } from '../layers/unit/UnitLayer';
import { NodeLayer } from '../layers/node/NodeLayer';
import Blitzkontext from '../../../utils/Blitzkontext';
import { height, width } from '@mui/system';

interface Props {
  renderData: any;
  viewBox: string;
  mapRef: any;
}

export const GameMap: FC<Props> = ({renderData, viewBox, mapRef}: Props) => {
  const context = useContext(Blitzkontext);

  return (
    <Blitzkontext.Consumer>
      {({map}) => {
        return (
          <svg id="map" ref={mapRef} className="map" width="16000" height="10000"
            viewBox="0 0 16000 10000">
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