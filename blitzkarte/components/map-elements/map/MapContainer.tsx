import { FC, useEffect, useRef, useState } from 'react';
import { GameMap } from './GameMap';
import { ViewControls } from './ViewControls';
import { gsap } from 'gsap'
import React from 'react';

interface Props {
  renderData: any;
}

export const MapContainer: FC<Props> = ({ renderData }: Props) => {
  const [viewBox, setViewBox] = useState('0 0 16000 10000');
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = React.createRef<SVGSVGElement>();
  const q = gsap.utils.selector(containerRef);
  gsap.registerPlugin()

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
        ease: 'power2.out',
        duration: 1
      }
      // {
      //   duration: 1,
      //   attr: {viewBox: '8000 5000 8000 5000'},
      //   ease: 'power2.out'
      // }
    )
  }
  return (
    <div className="map-container" ref={containerRef}>
      <svg id="map-container" className="map-container" width="1488" height="930" viewBox="0 0 16000 10000">
        <GameMap renderData={renderData} viewBox={viewBox} mapRef={mapRef}/>
        <g transform='translate(14500 8500)'>
          <ViewControls setViewBox={setViewBox} animateViewBox={animateViewBox}/>
        </g>
      </svg>
    </div>
  )
}