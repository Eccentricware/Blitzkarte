import { FC, useContext, useEffect, useRef, useState } from 'react';
import { GameMap } from './GameMap';
import { ViewControls } from './ViewControls';
import { gsap } from 'gsap'
import React from 'react';
import Blitzkontext from '../../../utils/Blitzkontext';
import { RenderData } from '../../../models/objects/RenderDataObject';
import { UseQueryResult } from 'react-query';
import { Unit } from '../../../utils/parsing/classes/unit';
import { TurnOrders } from '../../../models/objects/OrdersObjects';

interface Props {
  renderData: RenderData;
  turnOrdersResult: UseQueryResult<any> | undefined;
  orderSet: TurnOrders | undefined;
  nudge: any;
}

export const MapContainer: FC<Props> = ({ renderData, turnOrdersResult, orderSet, nudge }: Props) => {
  // const [viewBox, setViewBox] = useState('0 0 16000 10000');
  const [zoomed, setZoomed] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(true);

  const mapCtx = useContext(Blitzkontext);

  const mapRef = React.createRef<SVGSVGElement>();
  const llRef = React.createRef<SVGLineElement>();
  const s = gsap.utils.selector(llRef);
  const ease: string = 'power2.inOut';

  useEffect(() => {
    const view = mapCtx.map.view;
    const scaling = mapCtx.map.scaling;
    const endOrderCircleR = scaling.orderCircle.r * view.current.zoom;
    const endOrderCircleStrokeWidth = scaling.orderCircle.strokeWidth * view.current.zoom;
    const endOrderLineStrokeWidth = scaling.orderLine.strokeWidth * view.current.zoom;

    renderData.units.forEach((unit: any) => {
      const unitType = unit.type.toLowerCase();
      const unitName = unit.name.split(' ').join('_');

      gsap.to(s(`.${unitName}_left`), {
        attr: {
          'transform': `translate (${unit.loc[0] - 16000 - (mapCtx.map.unitSizing[unitType].baseWidth / 2 * view.current.zoom)}
            ${unit.loc[1] - (mapCtx.map.unitSizing[unitType].baseHeight / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 0
      });

      gsap.to(s(`.${unitName}_center`), {
        attr: {
          'transform': `translate (${unit.loc[0] - (mapCtx.map.unitSizing[unitType].baseWidth / 2 * view.current.zoom)}
            ${unit.loc[1] - (mapCtx.map.unitSizing[unitType].baseHeight / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 0
      });

      gsap.to(s(`.${unitName}_right`), {
        attr: {
          'transform': `translate (${unit.loc[0] + 16000 - (mapCtx.map.unitSizing[unitType].baseWidth / 2 * view.current.zoom)}
            ${unit.loc[1] - (mapCtx.map.unitSizing[unitType].baseHeight / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 0
      });
    });

    renderData.cities.votingCenters.forEach((city: any) => {
      gsap.to(s(`.${city.name}_left`), {
        attr: {
          'transform': `translate (${city.loc[0] - 16000 - (scaling.votingCenter.width / 2 * view.current.zoom)}
            ${city.loc[1] - (scaling.votingCenter.height / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 0
      });

      gsap.to(s(`.${city.name}_center`), {
        attr: {
          'transform': `translate (${city.loc[0] - (scaling.votingCenter.width / 2 * view.current.zoom)}
            ${city.loc[1] - (scaling.votingCenter.height / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 0
      });

      gsap.to(s(`.${city.name}_right`), {
        attr: {
          'transform': `translate (${city.loc[0] + 16000 - (scaling.votingCenter.width / 2 * view.current.zoom)}
            ${city.loc[1] - (scaling.votingCenter.height / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 0
      });
    });

    gsap.to(s('.order-circle'), {
      attr: {
        'r': endOrderCircleR,
        'stroke-width': endOrderCircleStrokeWidth
      },
      ease: ease,
      duration: 0
    });

    gsap.to(s('.order-line'), {
      attr: {
        'stroke-width': endOrderLineStrokeWidth
      },
      ease: ease,
      duration: 0
    });
  }, [nudge]);

  const zoomIn = () => {
    const view = mapCtx.map.view;
    const scaling = mapCtx.map.scaling;

    view.current.zoom *= view.zoomRate;

    const endWidth = view.default.width * view.current.zoom;
    const endHeight = view.default.height * view.current.zoom;
    const endX = view.current.center[0] - (endWidth / 2);
    const endY = view.current.center[1] - (endHeight / 2);

    const endViewBox = `${endX} ${endY} ${endWidth} ${endHeight}`;

    const endLineWidth = scaling.linkLine.width * view.current.zoom;
    const endNodeRadius = scaling.node.radius * view.current.zoom;
    const endLabelSize = scaling.label.size * view.current.zoom;
    const endSupplyCenterR = scaling.supplyCenter.r * view.current.zoom;
    const endSupplyCenterStrokeWidth = scaling.supplyCenter.strokeWidth * view.current.zoom;
    const endOrderCircleR = scaling.orderCircle.r * view.current.zoom;
    const endOrderCircleStrokeWidth = scaling.orderCircle.strokeWidth * view.current.zoom;
    const endOrderLineStrokeWidth = scaling.orderLine.strokeWidth * view.current.zoom;

    gsap.to(mapRef.current, {
      attr: { viewBox: endViewBox },
      ease: ease,
      duration: 1
    });

    gsap.to(s('.link-line'), {
      attr: { 'stroke-width': endLineWidth },
      ease: ease,
      duration: 0
    });

    gsap.to(s('.node'), {
      attr: { 'r': endNodeRadius },
      ease: ease,
      duration: 0
    });

    gsap.to(s('.label'), {
      attr: { 'font-size': endLabelSize },
      ease: ease,
      duration: 1
    });

    gsap.to(s('.supply-center'), {
      attr: {
        'r': endSupplyCenterR,
        'stroke-width': endSupplyCenterStrokeWidth
      },
      ease: ease,
      duration: 1
    });

    gsap.to(s('.order-circle'), {
      attr: {
        'r': endOrderCircleR,
        'stroke-width': endOrderCircleStrokeWidth
      },
      ease: ease,
      duration: 1
    });

    gsap.to(s('.order-line'), {
      attr: {
        'stroke-width': endOrderLineStrokeWidth
      },
      ease: ease,
      duration: 1
    });

    renderData.cities.votingCenters.forEach((city: any) => {
      gsap.to(s(`.${city.name}_left`), {
        attr: {
          'transform': `translate (${city.loc[0] - 16000 - (scaling.votingCenter.width / 2 * view.current.zoom)}
            ${city.loc[1] - (scaling.votingCenter.height / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 1
      });

      gsap.to(s(`.${city.name}_center`), {
        attr: {
          'transform': `translate (${city.loc[0] - (scaling.votingCenter.width / 2 * view.current.zoom)}
            ${city.loc[1] - (scaling.votingCenter.height / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 1
      });

      gsap.to(s(`.${city.name}_right`), {
        attr: {
          'transform': `translate (${city.loc[0] + 16000 - (scaling.votingCenter.width / 2 * view.current.zoom)}
            ${city.loc[1] - (scaling.votingCenter.height / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 1
      });
    });

    renderData.units.forEach((unit: any) => {
      const unitType = unit.type.toLowerCase();
      const unitName = unit.name.split(' ').join('_');

      gsap.to(s(`.${unitName}_left`), {
        attr: {
          'transform': `translate (${unit.loc[0] - 16000 - (mapCtx.map.unitSizing[unitType].baseWidth / 2 * view.current.zoom)}
            ${unit.loc[1] - (mapCtx.map.unitSizing[unitType].baseHeight / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 1
      });
      gsap.to(s(`.${unitName}_center`), {
        attr: {
          'transform': `translate (${unit.loc[0] - (mapCtx.map.unitSizing[unitType].baseWidth / 2 * view.current.zoom)}
            ${unit.loc[1] - (mapCtx.map.unitSizing[unitType].baseHeight / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 1
      });
      gsap.to(s(`.${unitName}_right`), {
        attr: {
          'transform': `translate (${unit.loc[0] + 16000 - (mapCtx.map.unitSizing[unitType].baseWidth / 2 * view.current.zoom)}
            ${unit.loc[1] - (mapCtx.map.unitSizing[unitType].baseHeight / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 1
      });
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
    const scaling = mapCtx.map.scaling;

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

    const endLineWidth = scaling.linkLine.width * view.current.zoom;
    const endNodeRadius = scaling.node.radius * view.current.zoom;
    const endLabelSize = scaling.label.size * view.current.zoom;
    const endSupplyCenterR = scaling.supplyCenter.r * view.current.zoom;
    const endSupplyCenterStrokeWidth = scaling.supplyCenter.strokeWidth * view.current.zoom;
    const endOrderCircleR = scaling.orderCircle.r * view.current.zoom;
    const endOrderCircleStrokeWidth = scaling.orderCircle.strokeWidth * view.current.zoom;

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
        ease: ease,
        duration: 1
      }
    );

    gsap.to(s('.link-line'), {
      attr: { 'stroke-width': endLineWidth },
      ease: ease,
      duration: 0
    });

    gsap.to(s('.node'), {
      attr: { 'r': endNodeRadius },
      ease: ease,
      duration: 0
    });

    gsap.to(s('.label'), {
      attr: { 'font-size': endLabelSize },
      ease: ease,
      duration: 1
    });

    gsap.to(s('.supply-center'), {
      attr: {
        'r': endSupplyCenterR,
        'stroke-width': endSupplyCenterStrokeWidth
      },
      ease: ease,
      duration: 1
    });

    gsap.to(s('.order-circle'), {
      attr: {
        'r': endOrderCircleR,
        'stroke-width': endOrderCircleStrokeWidth
      },
      ease: ease,
      duration: 1
    });

    renderData.units.forEach((unit: Unit) => {
      const unitType = unit.type.toLowerCase();
      const unitName = unit.name.split(' ').join('_');

      gsap.to(s(`.${unitName}_left`), {
        attr: {
          'transform': `translate (${unit.loc[0] - 16000 - (mapCtx.map.unitSizing[unitType].baseWidth / 2 * view.current.zoom)}
            ${unit.loc[1] - (mapCtx.map.unitSizing[unitType].baseHeight / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 1
      });
      gsap.to(s(`.${unitName}_center`), {
        attr: {
          'transform': `translate (${unit.loc[0] - (mapCtx.map.unitSizing[unitType].baseWidth / 2 * view.current.zoom)}
            ${unit.loc[1] - (mapCtx.map.unitSizing[unitType].baseHeight / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 1
      });
      gsap.to(s(`.${unitName}_right`), {
        attr: {
          'transform': `translate (${unit.loc[0] + 16000 - (mapCtx.map.unitSizing[unitType].baseWidth / 2 * view.current.zoom)}
            ${unit.loc[1] - (mapCtx.map.unitSizing[unitType].baseHeight / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 1
      });
    });

    renderData.cities.votingCenters.forEach((city: any) => {
      gsap.to(s(`.${city.name}_left`), {
        attr: {
          'transform': `translate (${city.loc[0] - 16000 - (scaling.votingCenter.width / 2 * view.current.zoom)}
            ${city.loc[1] - (scaling.votingCenter.height / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 1
      });

      gsap.to(s(`.${city.name}_center`), {
        attr: {
          'transform': `translate (${city.loc[0] - (scaling.votingCenter.width / 2 * view.current.zoom)}
            ${city.loc[1] - (scaling.votingCenter.height / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 1
      });

      gsap.to(s(`.${city.name}_right`), {
        attr: {
          'transform': `translate (${city.loc[0] + 16000 - (scaling.votingCenter.width / 2 * view.current.zoom)}
            ${city.loc[1] - (scaling.votingCenter.height / 2 * view.current.zoom)})
            scale(${view.current.zoom})`
        },
        ease: ease,
        duration: 1
      });
    });

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
      ease: ease,
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
      ease: ease,
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
        ease: ease,
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
        ease: ease,
        duration: 1
      }
    );
  }

  const reset = () => {
    const view = mapCtx.map.view.current;
    const scaling = mapCtx.map.scaling;

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
        ease: ease,
        duration: 1
      }
    );

    gsap.to(s('.link-line'), {
      attr: { 'stroke-width': scaling.linkLine.width },
      ease: ease,
      duration: 1
    });

    gsap.to(s('.node'), {
      attr: { 'r': scaling.node.radius },
      ease: ease,
      duration: 0
    });

    gsap.to(s('.label'), {
      attr: { 'font-size': scaling.label.size },
      ease: ease,
      duration: 0
    });

    gsap.to(s('.supply-center'), {
      attr: {
        'r': scaling.supplyCenter.r,
        'stroke-width': scaling.supplyCenter.strokeWidth
      },
      ease: ease,
      duration: 1
    });

    gsap.to(s('.order-circle'), {
      attr: {
        'r': scaling.orderCircle.r,
        'stroke-width': scaling.orderCircle.strokeWidth
      },
      ease: ease,
      duration: 1
    });

    renderData.units.forEach((unit: any) => {
      const unitType = unit.type.toLowerCase();
      const unitName = unit.name.split(' ').join('_');

      gsap.to(s(`.${unitName}_left`), {
        attr: {
          'transform': `translate (${unit.loc[0] - 16000 - mapCtx.map.unitSizing[unitType].baseWidth / 2}
            ${unit.loc[1] - mapCtx.map.unitSizing[unitType].baseHeight / 2})
            scale(1)`
        },
        ease: ease,
        duration: 1
      });
      gsap.to(s(`.${unitName}_center`), {
        attr: {
          'transform': `translate (${unit.loc[0] - mapCtx.map.unitSizing[unitType].baseWidth / 2}
            ${unit.loc[1] - mapCtx.map.unitSizing[unitType].baseHeight / 2})
            scale(1)`
        },
        ease: ease,
        duration: 1
      });
      gsap.to(s(`.${unitName}_right`), {
        attr: {
          'transform': `translate (${unit.loc[0] + 16000 - mapCtx.map.unitSizing[unitType].baseWidth / 2}
            ${unit.loc[1] - mapCtx.map.unitSizing[unitType].baseHeight / 2})
            scale(1)`
        },
        ease: ease,
        duration: 1
      });
    });

    renderData.cities.votingCenters.forEach((city: any) => {
      gsap.to(s(`.${city.name}_left`), {
        attr: {
          'transform': `translate (${city.loc[0] - 16000 - scaling.votingCenter.width / 2}
            ${city.loc[1] - scaling.votingCenter.height / 2})
            scale(1)`
        },
        ease: ease,
        duration: 1
      });

      gsap.to(s(`.${city.name}_center`), {
        attr: {
          'transform': `translate (${city.loc[0] - scaling.votingCenter.width / 2}
            ${city.loc[1] - scaling.votingCenter.height / 2})
            scale(1)`
        },
        ease: ease,
        duration: 1
      });

      gsap.to(s(`.${city.name}_right`), {
        attr: {
          'transform': `translate (${city.loc[0] + 16000 - scaling.votingCenter.width / 2}
            ${city.loc[1] - scaling.votingCenter.height / 2})
            scale(1)`
        },
        ease: ease,
        duration: 1
      });
    });

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
    <div className="map-container" style={{height: window.innerHeight - 55}}>
      <GameMap renderData={renderData}
        turnOrdersResult={turnOrdersResult}
        orderSet={orderSet}
        mapRef={mapRef}
        refs={llRef}
      />
      <div className='view-controls'>
        <ViewControls viewOps={viewOps}/>
      </div>
    </div>
  )
}