import { FC, useContext, useEffect, useRef, useState } from 'react';
import { GameMap } from './GameMap';
import { ViewControls } from './ViewControls';
import { gsap } from 'gsap'
import React from 'react';
import Blitzkontext from '../../../utils/Blitzkontext';
import { MapTwoTone } from '@mui/icons-material';

interface Props {
  renderData: any;
}

export const MapContainer: FC<Props> = ({ renderData }: Props) => {
  const [viewBox, setViewBox] = useState('0 0 16000 10000');
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = React.createRef<SVGSVGElement>();
  const q = gsap.utils.selector(containerRef);
  const mapCtx = useContext(Blitzkontext);

  useEffect(() => {
    // gsap.to(mapRef.current, {
    //   viewbox: '8000 5000 8000 5000'
    // })
  })

  const animateViewBox = () => {
    gsap.fromTo(mapRef.current,
      { attr: {viewBox: '0 0 8000 5000'}},
      {
        attr: { viewBox: '8000 5000 8000 5000' },
        ease: 'power2.inOut',
        duration: 1
      }
    )
  }

  const zoomIn = () => {
    const currentView = mapCtx.map.view.current;
    const nextWidth = currentView.width * 0.8;
    currentView.width = nextWidth;

    const nextHeight = currentView.height * 0.8;
    currentView.height = nextHeight;

    const nextX = currentView.center[0] - (nextWidth / 2);
    currentView.x = nextX;

    const nextY = currentView.center[1] - (nextHeight / 2);
    currentView.y = nextY;

    const nextViewBox = `${nextX} ${nextY} ${nextWidth} ${nextHeight}`;

    gsap.to(mapRef.current, {
      attr: { viewBox: nextViewBox },
      ease: 'power2.inOut',
      duration: 1
    });
  }

  const viewOps = {
    zoomIn: zoomIn
  }



  return (
    <div className="map-container" ref={containerRef}>
      <svg id="map-container" className="map-container" width="1488" height="930" viewBox="0 0 16000 10000">
        <GameMap renderData={renderData} viewBox={viewBox} mapRef={mapRef}/>
        <g transform='translate(14500 8500)'>
          <ViewControls viewOps={viewOps}/>
        </g>
      </svg>
    </div>
  )
}