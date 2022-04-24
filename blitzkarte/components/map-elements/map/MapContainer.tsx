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
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = React.createRef<SVGSVGElement>();
  const q = gsap.utils.selector(containerRef);
  const mapCtx = useContext(Blitzkontext);

  const zoomIn = () => {
    const view = mapCtx.map.view;
    view.current.zoom *= view.zoomRate;

    const endWidth = view.default.width * view.current.zoom;
    view.current.width = endWidth;

    const endHeight = view.default.height * view.current.zoom;
    view.current.height = endHeight;

    const endX = view.current.center[0] - (endWidth / 2);
    view.current.x = endX;

    const endY = view.current.center[1] - (endHeight / 2);
    view.current.y = endY;

    const endViewBox = `${endX} ${endY} ${endWidth} ${endHeight}`;

    gsap.to(mapRef.current, {
      attr: { viewBox: endViewBox },
      ease: 'power2.inOut',
      duration: 1
    });

    setZoomed(true);
    setAtTop(false);
    setAtBottom(false);
  }

  const zoomOut = () => {
    const view = mapCtx.map.view;
    const constraints = mapCtx.map.view.constraints;

    view.current.zoom /= view.zoomRate;
    if (view.current.zoom >= 1) {
      view.current.zoom = 1;
      setZoomed(false);
      setAtTop(true);
      setAtBottom(true);
    }

    const endWidth: number = view.default.width * view.current.zoom;
    const endHeight: number = view.default.height * view.current.zoom;

    // Too Left
    if (view.current.center[0] - (endWidth / 2) < constraints.left) {
      view.current.center[0] += 16000;
    }

    // Too Right
    if (view.current.center[0] + (endWidth / 2) > constraints.right) {
      view.current.center[0] -= 16000;
    }

    const endX: number = view.current.center[0] - (endWidth / 2);

    let endY: number;
    // Too High
    if (view.current.y - (endHeight / 2) < constraints.top
    && view.current.center[1] <= 5000) {
      endY = constraints.top;
      view.current[1] = endHeight / 2;

    // Too Low
    } else if (view.current.center[1] + (endHeight / 2) > constraints.bottom
    && view.current.center[1] > 5000) {
      endY = constraints.bottom - endHeight;
      view.current[1] = constraints.bottom - (endHeight / 2);

    // Just Right
    } else {
      endY = view.current.center[1] - (endHeight / 2);
    }

    const startX: number = view.current.center[0] - (view.current.width / 2);
    const startY: number = view.current.center[1] - (view.current.height / 2);

    const startView: string = `${startX} ${startY} ${view.current.width} ${view.current.height}`;
    const endView: string = `${endX} ${endY} ${endWidth} ${endHeight}`;

    view.current.x = endX;
    view.current.y = endY;
    view.current.width = endWidth;
    view.current.height = endHeight;
    view.current.center[0] = view.current.x + (view.current.width / 2);
    view.current.center[1] = view.current.y + (view.current.height / 2);

    gsap.fromTo(mapRef.current,
      { attr: { viewBox: startView } },
      {
        attr: { viewBox: endView },
        ease: 'power2.inOut',
        duration: 1
      }
    );
  }

  const panUp = () => {
    const view = mapCtx.map.view;
    const constraints = mapCtx.map.view.constraints;

    // Too High
    if (view.current.y - (view.current.height * view.panRate) <= constraints.top) {
      view.current.y = constraints.top;
      view.current.center[1] = constraints.top + (view.current.height / 2);

      setAtTop(true);
    } else {
      view.current.y -= view.current.height * view.panRate;
    }

    const endViewBox = `${view.current.x} ${view.current.y} ${view.current.width} ${view.current.height}`;

    gsap.to(mapRef.current, {
      attr: { viewBox: endViewBox },
      ease: 'power2.inOut',
      duration: 1
    });

    if (view.current.zoom < 1) {
      setAtBottom(false);
    }
  }

  const panDown = () => {
    const view = mapCtx.map.view;
    const constraints = mapCtx.map.view.constraints;

    // Too Low
    if ((view.current.y + view.current.height) + (view.current.height * view.panRate) >= constraints.bottom) {
      view.current.y = constraints.bottom - view.current.height;
      view.current.center[1] = constraints.bottom - (view.current.height / 2);

      setAtBottom(true);
    } else {
      view.current.y += view.current.height * view.panRate;
    }

    const endViewBox = `${view.current.x} ${view.current.y} ${view.current.width} ${view.current.height}`;

    gsap.to(mapRef.current, {
      attr: { viewBox: endViewBox },
      ease: 'power2.inOut',
      duration: 1
    });

    if (view.current.zoom < 1) {
      setAtTop(false);
    }
  }

  const panLeft = () => {

  }

  const panRight = () => {

  }

  const reset = () => {

  }

  const viewOps = {
    zoomIn: zoomIn,
    zoomOut: zoomOut,
    panUp: panUp,
    panDown: panDown,
    panLeft: panLeft,
    panRight: panRight,
    reset: reset,
    zoomed: zoomed,
    atTop: atTop,
    atBottom: atBottom
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