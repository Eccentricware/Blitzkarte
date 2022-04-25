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
  // const [viewBox, setViewBox] = useState('0 0 16000 10000');
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
    const endHeight = view.default.height * view.current.zoom;
    const endX = view.current.center[0] - (endWidth / 2);
    const endY = view.current.center[1] - (endHeight / 2);


    const endViewBox = `${endX} ${endY} ${endWidth} ${endHeight}`;

    gsap.to(mapRef.current, {
      attr: { viewBox: endViewBox },
      ease: 'power2.inOut',
      duration: 1
    });

    view.current.width = endWidth;
    view.current.height = endHeight;
    view.current.x = endX;
    view.current.y = endY;

    setZoomed(true);
    setAtTop(false);
    setAtBottom(false);
  }

  const zoomOut = () => {
    const view = mapCtx.map.view;
    const constraints = mapCtx.map.view.constraints;

    if (view.current.zoom === 1) {
      return;
    }

    view.current.zoom /= view.zoomRate;
    if (view.current.zoom >= 1) {
      view.current.zoom = 1;
      setZoomed(false);
      setAtTop(true);
      setAtBottom(true);
    }

    const endWidth: number = view.default.width * view.current.zoom;
    const endHeight: number = view.default.height * view.current.zoom;

    let startX: number = view.current.x;
    let endX: number = view.current.center[0] - (endWidth / 2);

    // Too Left
    if (endX <= constraints.left) {
      startX += 16000;
      endX += 16000;
    }

    // Too Right
    if (endX + endWidth >= constraints.right) {
      startX -= 16000;
      endX += 16000;
    }
    view.current.center[0] = endX + (endWidth / 2);

    const startY: number = view.current.center[1] - (view.current.height / 2);

    let endY: number = view.current.center[1] - (endHeight / 2);

    // Too High
    if (endY <= constraints.top
    && view.current.center[1] <= 5000) {
      endY = constraints.top;
      view.current.center[1] = endHeight / 2;
      setAtTop(true);

    // Too Low
    } else if (endY + endHeight >= constraints.bottom
    && view.current.center[1] > 5000) {
      endY = constraints.bottom - endHeight;
      view.current.center[1] = constraints.bottom - (endHeight / 2);
      setAtBottom(true);

    // Just Right
    } else {
      endY = view.current.center[1] - (endHeight / 2);
    }

    const startView: string = `${startX} ${startY} ${view.current.width} ${view.current.height}`;
    const endView: string = `${endX} ${endY} ${endWidth} ${endHeight}`;

    gsap.fromTo(mapRef.current,
      { attr: { viewBox: startView } },
      {
        attr: { viewBox: endView },
        ease: 'power2.inOut',
        duration: 1
      }
    );

    view.current.x = endX;
    view.current.y = endY;
    view.current.width = endWidth;
    view.current.height = endHeight;
    view.current.center[0] = view.current.x + (view.current.width / 2);
    view.current.center[1] = view.current.y + (view.current.height / 2);
  }

  const panUp = () => {
    const view = mapCtx.map.view;
    const constraints = mapCtx.map.view.constraints;

    if (view.current.y === constraints.top) {
      return;
    }

    // Too High
    let endY: number = view.current.y - (view.current.height * view.panRate);
    if (endY <= constraints.top) {
      endY = constraints.top;
      setAtTop(true);
    }

    const endViewBox = `${view.current.x} ${endY} ${view.current.width} ${view.current.height}`;

    gsap.to(mapRef.current, {
      attr: { viewBox: endViewBox },
      ease: 'power2.inOut',
      duration: 1
    });

    view.current.y = endY;
    view.current.center[1] = endY + (view.current.height / 2);

    if (view.current.zoom < 1) {
      setAtBottom(false);
    }
  }

  const panDown = () => {
    const view = mapCtx.map.view;
    const constraints = mapCtx.map.view.constraints;

    if (view.current.y + view.current.height === constraints.top) {
      return;
    }

    // Too Low
    let endY: number = view.current.y + (view.current.height * view.panRate);
    if (endY + view.current.height >= constraints.bottom) {
      endY = constraints.bottom - view.current.height;
      setAtBottom(true);
    }

    const endViewBox = `${view.current.x} ${endY} ${view.current.width} ${view.current.height}`;

    gsap.to(mapRef.current, {
      attr: { viewBox: endViewBox },
      ease: 'power2.inOut',
      duration: 1
    });

    view.current.y = endY;
    view.current.center[1] = endY + (view.current.height / 2);

    if (view.current.zoom < 1) {
      setAtTop(false);
    }
  }

  const panLeft = () => {
    const view = mapCtx.map.view;
    const constraints = mapCtx.map.view.constraints;

    let startX = view.current.x;

    if (startX - (view.current.width * view.panRate) <= constraints.left) {
      startX += 16000;
    }

    let startView: string = `${startX} ${view.current.y} ${view.current.width} ${view.current.height}`;
    let endView: string = `${startX - (view.current.width * view.panRate)} ${view.current.y} ${view.current.width} ${view.current.height}`;

    gsap.fromTo(mapRef.current,
      { attr: { viewBox: startView } },
      {
        attr: { viewBox: endView },
        ease: 'power2.inOut',
        duration: 1
      }
    );

    view.current.x = startX - (view.current.width * view.panRate);
    view.current.center[0] = view.current.x + (view.current.width / 2);
    }

  const panRight = () => {
    const view = mapCtx.map.view;
    const constraints = mapCtx.map.view.constraints;

    let startX = view.current.x;

    if (startX + view.current.width + (view.current.width * view.panRate) >= constraints.right) {
      startX -= 16000;
    }

    let startView: string = `${startX} ${view.current.y} ${view.current.width} ${view.current.height}`;
    let endView: string = `${startX + (view.current.width * view.panRate)} ${view.current.y} ${view.current.width} ${view.current.height}`;
    view.current.x = startX + (view.current.width * view.panRate);
    view.current.center[0] = view.current.x + (view.current.width / 2);

    gsap.fromTo(mapRef.current,
      { attr: { viewBox: startView } },
      {
        attr: { viewBox: endView },
        ease: 'power2.inOut',
        duration: 1
      }
    );
  }

  const reset = () => {
    const view = mapCtx.map.view.current;

    let startX = view.x;

    // Too far right
    if (view.center[0] >= 16000) {
      startX -= 16000;
    }

    // Too far left
    if (view.center[0] <= 0) {
      startX += 16000;
    }

    let startView: string = `${startX} ${view.y} ${view.width} ${view.height}`;
    let endView: string = '0 0 16000 10000';

    gsap.fromTo(mapRef.current,
      { attr: { viewBox: startView } },
      {
        attr: { viewBox: endView },
        ease: 'power2.inOut',
        duration: 1
      }
    );

    view.x = 0;
    view.y = 0;
    view.width = 16000;
    view.height = 10000;
    view.center = [8000, 5000];
    view.zoom = 1;
    setZoomed(false);
    setAtTop(true);
    setAtBottom(true);
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
        <GameMap renderData={renderData} mapRef={mapRef}/>
        <g transform='translate(14500 8500)'>
          <ViewControls viewOps={viewOps}/>
        </g>
      </svg>
    </div>
  )
}