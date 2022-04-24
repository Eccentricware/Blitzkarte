import { FC, useContext, useEffect, useRef, useState } from 'react';
import { GameMap } from './GameMap';
import { ViewControls } from './ViewControls';
import { gsap } from 'gsap'
import React from 'react';
import Blitzkontext from '../../../utils/Blitzkontext';

interface Props {
  renderData: any;
}

export const MapContainer: FC<Props> = ({ renderData }: Props) => {
  const [viewBox, setViewBox] = useState('0 0 16000 10000');
  const [zoomed, setZoomed] = useState(false);
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
    const defaultView = mapCtx.map.view.default;
    currentView.zoom *= 0.8

    const endWidth = defaultView.width * currentView.zoom;
    currentView.width = endWidth;

    const endHeight = defaultView.height * currentView.zoom;
    currentView.height = endHeight;

    const endX = currentView.center[0] - (endWidth / 2);
    currentView.x = endX;

    const endY = currentView.center[1] - (endHeight / 2);
    currentView.y = endY;

    const endViewBox = `${endX} ${endY} ${endWidth} ${endHeight}`;

    gsap.to(mapRef.current, {
      attr: { viewBox: endViewBox },
      ease: 'power2.inOut',
      duration: 1
    });

    setZoomed(true);
  }

  const zoomOut = () => {
    const currentView = mapCtx.map.view.current;
    const defaultView = mapCtx.map.view.default;
    const constraints = mapCtx.map.view.constraints;

    currentView.zoom /= 0.8;
    if (currentView.zoom >= 1) {
      currentView.zoom = 1;
      setZoomed(false);
    }

    const endWidth: number = defaultView.width * currentView.zoom;
    const endHeight: number = defaultView.height * currentView.zoom;

    // Too Left
    if (currentView.center[0] - (endWidth / 2) < constraints.left) {
      currentView.center[0] += 16000;
    }

    // Too Right
    if (currentView.center[0] + (endWidth / 2) > constraints.right) {
      currentView.center[0] -= 16000;
    }

    const endX: number = currentView.center[0] - (endWidth / 2);

    // Too High
    if (currentView.center[1] - (endHeight / 2) < constraints.top) {
      currentView[1] = endHeight / 2;
    }

    // Too low
    if (currentView.center[1] + (endHeight / 2) > constraints.bottom) {
      currentView[1] = constraints.bottom - (endHeight / 2);
    }
    const endY: number = currentView.center[1] - (endHeight / 2);

    const startX: number = currentView.center[0] - (currentView.width / 2);
    const startY: number = currentView.center[1] - (currentView.height / 2);

    const startView: string = `${startX} ${startY} ${currentView.width} ${currentView.height}`;
    const endView: string = `${endX} ${endY} ${endWidth} ${endHeight}`;

    currentView.x = endX;
    currentView.y = endY;
    currentView.width = endWidth;
    currentView.height = endHeight;

    gsap.fromTo(mapRef.current,
      { attr: { viewBox: startView } },
      {
        attr: { viewBox: endView },
        ease: 'power2.inOut',
        duration: 1
      }
    );
  }

  const viewOps = {
    zoomIn: zoomIn,
    zoomOut: zoomOut,
    zoomed: zoomed
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