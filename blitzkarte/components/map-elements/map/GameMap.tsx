import { FC, useContext, useEffect, useState } from 'react';
import { TerrainLayer } from '../layers/terrain/TerrainLayer';
import { LabelLayer } from '../layers/label/LabelLayer';
import { CityLayer } from '../layers/city/CityLayer';
import { UnitLayer } from '../layers/unit/UnitLayer';
import { NodeLayer } from '../layers/node/NodeLayer';
import Blitzkontext from '../../../utils/Blitzkontext';

interface Props {
  renderData: any;
  mapRef: any;
  refs: any;
}

export const GameMap: FC<Props> = ({renderData, mapRef, refs}: Props) => {
  return (
    <Blitzkontext.Consumer>
      {({map}) => {
        return (
          <svg id="map" ref={mapRef} className="map" width="16000" height="10000"
            viewBox="0 0 16000 10000">
            <g ref={refs}>
              <TerrainLayer terrainRenderData={renderData.terrain} />
              <CityLayer cityData={renderData.cities}/>
              <LabelLayer labelPinData={renderData.labels} labelLineData={renderData.labelLines} />
              { (renderData.nodes && renderData.nodes.display) ?
                <NodeLayer nodeData={renderData.nodes} nodeRefs={refs}/>
                :
                <UnitLayer unitData={renderData.units} />
              }
            </g>
          </svg>
        )
      }}
    </Blitzkontext.Consumer>
  )
}