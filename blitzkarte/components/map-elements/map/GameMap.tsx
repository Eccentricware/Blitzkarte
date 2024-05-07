import { FC, useContext, useEffect, useState } from 'react';
import { TerrainLayer } from '../layers/terrain/TerrainLayer';
import { LabelLayer } from '../layers/label/LabelLayer';
import { CityLayer } from '../layers/city/CityLayer';
import { UnitLayer } from '../layers/unit/UnitLayer';
import { NodeLayer } from '../layers/node/NodeLayer';
import Blitzkontext from '../../../utils/Blitzkontext';
import { UseQueryResult } from 'react-query';
import { OrderLayer } from '../layers/orders/OrderLayer';
import { TurnOrders } from '../../../models/objects/OrdersObjects';

interface Props {
  renderData: any;
  mapRef: any;
  refs: any;
  turnOrdersResult: UseQueryResult<TurnOrders> | undefined;
  historicOrders: UseQueryResult<any> | undefined;
  orderSet: TurnOrders | undefined;
  mapWidth: number;
  mapHeight: number;
  labelSize: number;
}

export const GameMap: FC<Props> = ({
  renderData,
  mapRef,
  refs,
  turnOrdersResult,
  mapWidth,
  mapHeight,
  labelSize
}: Props) => {
  const maxHeight = window.innerHeight - 45;
  const maxWidth = window.innerWidth - 420;
  console.log(`Max Height: ${maxHeight} | Width: ${maxWidth}`);

  const [width, setWidth] = useState(maxWidth);
  const [height, setHeight] = useState(maxHeight * 1.6 >= maxWidth ? maxWidth / 1.6 : maxHeight);

  return (
    <Blitzkontext.Consumer>
      {({map}) => {
        return (
          <svg id="map" className="map" ref={mapRef}
            width={mapWidth} height={mapHeight}
            viewBox="0 0 16000 10000"
          >
            <g ref={refs}>
              <TerrainLayer terrainRenderData={renderData.terrain} />
              <CityLayer cityData={renderData.cities}/>
              <LabelLayer
                labelPinData={renderData.labels}
                labelLineData={renderData.labelLines}
                labelSize={labelSize}
              />
              { (turnOrdersResult && turnOrdersResult.data) && <OrderLayer orderData={turnOrdersResult.data}/> }
              {/* { (historicOrders && historicOrders.data) && <OrderLayer orderData={historicOrders.data.maps.orders.standard}/> } */}
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