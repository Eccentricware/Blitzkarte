import { FC, useState } from 'react';
import { GameMap } from './GameMap';
import { ViewControls } from './ViewControls';

interface Props {
  renderData: any;
}

export const MapContainer: FC<Props> = ({ renderData }: Props) => {
  return (
    <div className="map-container">
      <svg id="map" className="map" width="1488" height="930" viewBox="0 0 16000 10000">
        <GameMap renderData={renderData}/>
        <g transform='translate(14500 8500)'>
          <ViewControls />
        </g>
      </svg>
    </div>
  )
}