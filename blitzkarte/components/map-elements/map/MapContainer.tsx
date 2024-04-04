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
import { set } from 'date-fns';

interface Props {
  renderData: RenderData;
  turnOrdersResult: UseQueryResult<any> | undefined;
  orderSet: TurnOrders | undefined;
  mapWidth: number;
  mapHeight: number;
  labelSize: number;
  // nudge: any;
}

export const MapContainer: FC<Props> = ({
  renderData,
  turnOrdersResult,
  orderSet,
  mapWidth,
  mapHeight,
  labelSize
 }: Props) => {
  // const [viewBox, setViewBox] = useState('0 0 16000 10000');
  const mapCtx = useContext(Blitzkontext);

  const [coordinatesPerPixel, setCoordinatesPerPixel] = useState(10);

  const [zoomed, setZoomed] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(true);

  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDownX, setMouseDownX] = useState(0);
  const [mouseDownY, setMouseDownY] = useState(0);

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

    // renderData.units.forEach((unit: any) => {
    //   const unitType = unit.type.toLowerCase();
    //   const unitName = unit.name.split(' ').join('_');

    //   gsap.to(s(`.${unitName}_left`), {
    //     attr: {
    //       'transform': `translate (${unit.loc[0] - 16000 - (mapCtx.map.unitSizing[unitType].baseWidth / 2 * view.current.zoom)}
    //         ${unit.loc[1] - (mapCtx.map.unitSizing[unitType].baseHeight / 2 * view.current.zoom)})
    //         scale(${view.current.zoom})`
    //     },
    //     ease: ease,
    //     duration: 0
    //   });

    //   gsap.to(s(`.${unitName}_center`), {
    //     attr: {
    //       'transform': `translate (${unit.loc[0] - (mapCtx.map.unitSizing[unitType].baseWidth / 2 * view.current.zoom)}
    //         ${unit.loc[1] - (mapCtx.map.unitSizing[unitType].baseHeight / 2 * view.current.zoom)})
    //         scale(${view.current.zoom})`
    //     },
    //     ease: ease,
    //     duration: 0
    //   });

    //   gsap.to(s(`.${unitName}_right`), {
    //     attr: {
    //       'transform': `translate (${unit.loc[0] + 16000 - (mapCtx.map.unitSizing[unitType].baseWidth / 2 * view.current.zoom)}
    //         ${unit.loc[1] - (mapCtx.map.unitSizing[unitType].baseHeight / 2 * view.current.zoom)})
    //         scale(${view.current.zoom})`
    //     },
    //     ease: ease,
    //     duration: 0
    //   });
    // });

    // renderData.cities.votingCenters.forEach((city: any) => {
    //   gsap.to(s(`.${city.name}_left`), {
    //     attr: {
    //       'transform': `translate (${city.loc[0] - 16000 - (scaling.votingCenter.width / 2 * view.current.zoom)}
    //         ${city.loc[1] - (scaling.votingCenter.height / 2 * view.current.zoom)})
    //         scale(${view.current.zoom})`
    //     },
    //     ease: ease,
    //     duration: 0
    //   });

    //   gsap.to(s(`.${city.name}_center`), {
    //     attr: {
    //       'transform': `translate (${city.loc[0] - (scaling.votingCenter.width / 2 * view.current.zoom)}
    //         ${city.loc[1] - (scaling.votingCenter.height / 2 * view.current.zoom)})
    //         scale(${view.current.zoom})`
    //     },
    //     ease: ease,
    //     duration: 0
    //   });

    //   gsap.to(s(`.${city.name}_right`), {
    //     attr: {
    //       'transform': `translate (${city.loc[0] + 16000 - (scaling.votingCenter.width / 2 * view.current.zoom)}
    //         ${city.loc[1] - (scaling.votingCenter.height / 2 * view.current.zoom)})
    //         scale(${view.current.zoom})`
    //     },
    //     ease: ease,
    //     duration: 0
    //   });
    // });

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
  }, [
    // mapCtx.map.scaling,
    // mapCtx.map.unitSizing,
    // mapCtx.map.view,
    // renderData.cities.votingCenters,
    renderData.units,
    // s,
    // nudge
  ]);

  const zoomIn = (pixelLoc?: {x: number, y: number}) => {
    const view = mapCtx.map.view;
    const constraints = mapCtx.map.view.constraints;
    const scaling = mapCtx.map.scaling;

    view.current.zoom *= view.zoomRate;
    const endWidth = view.default.width * view.current.zoom;
    const endHeight = view.default.height * view.current.zoom;

    const pixelPercentX = pixelLoc ? pixelLoc.x / mapWidth : 0.5;
    const pixelPercentY = pixelLoc ? (pixelLoc.y - 45) / mapHeight : 0.5;

    const newCenterX = pixelPercentX
      ? view.current.x + (pixelPercentX * view.current.width)
      : view.current.center[0];

    const newCenterY = pixelPercentY
      ? view.current.y + (pixelPercentY * view.current.height)
      : view.current.center[1];

    let startX = view.current.x;
    const startY = view.current.center[1] - (view.current.height / 2);
    let endX = newCenterX - (endWidth / 2);
    let endY = newCenterY - (endHeight / 2);

    // Too Left
    if (endX <= constraints.left) {
      startX += 16000;
      endX += 16000;
    }

    // Too Right
    if (endX + endWidth >= constraints.right) {
      startX -= 16000;
      endX -= 16000;
    }

    // Too High
    if (endY <= constraints.top) {
        endY = constraints.top;
        view.current.center[1] = endHeight / 2;
        setAtTop(true);

    // Too Low
    } else if (endY + endHeight >= constraints.bottom) {
      endY = constraints.bottom - endHeight;
      view.current.center[1] = constraints.bottom - (endHeight / 2);
      setAtBottom(true);
    }

    const startView: string = `${startX} ${startY} ${view.current.width} ${view.current.height}`;
    const endViewBox = `${endX} ${endY} ${endWidth} ${endHeight}`;

    const endLineWidth = scaling.linkLine.width * view.current.zoom;
    const endNodeRadius = scaling.node.radius * view.current.zoom;
    const endLabelSize = labelSize * view.current.zoom;
    const endSupplyCenterR = scaling.supplyCenter.r * view.current.zoom;
    const endSupplyCenterStrokeWidth = scaling.supplyCenter.strokeWidth * view.current.zoom;
    const endOrderCircleR = scaling.orderCircle.r * view.current.zoom;
    const endOrderCircleStrokeWidth = scaling.orderCircle.strokeWidth * view.current.zoom;
    const endOrderLineStrokeWidth = scaling.orderLine.strokeWidth * view.current.zoom;

    gsap.fromTo(mapRef.current,
      { attr: { viewBox: startView } },
      { attr: { viewBox: endViewBox },
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

    view.current.x = endX;
    view.current.y = endY;
    view.current.width = endWidth;
    view.current.height = endHeight;
    view.current.center[0] = view.current.x + (view.current.width / 2);
    view.current.center[1] = view.current.y + (view.current.height / 2);

    setZoomed(true);
    setAtTop(false);
    setAtBottom(false);
    calibrateMapElements();
  }

  const zoomOut = (pixelLoc?: {x: number, y: number}) => {
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

    const endWidth = view.default.width * view.current.zoom;
    const endHeight = view.default.height * view.current.zoom;

    const endLineWidth = scaling.linkLine.width * view.current.zoom;
    const endNodeRadius = scaling.node.radius * view.current.zoom;
    const endLabelSize = labelSize * view.current.zoom;
    const endSupplyCenterR = scaling.supplyCenter.r * view.current.zoom;
    const endSupplyCenterStrokeWidth = scaling.supplyCenter.strokeWidth * view.current.zoom;
    const endOrderCircleR = scaling.orderCircle.r * view.current.zoom;
    const endOrderCircleStrokeWidth = scaling.orderCircle.strokeWidth * view.current.zoom;

    const pixelPercentX = pixelLoc ? pixelLoc.x / mapWidth : 0.5;


    const newCenterX = pixelPercentX
      ? view.current.x + (pixelPercentX * view.current.width)
      : view.current.center[0];

    let startX = view.current.x;
    let endX = newCenterX - (endWidth / 2);

    // Too Left
    if (endX <= constraints.left) {
      startX += 16000;
      endX += 16000;
    }

    // Too Right
    if (endX + endWidth >= constraints.right) {
      startX -= 16000;
      endX -= 16000;
    }
    view.current.center[0] = endX + (endWidth / 2);

    const startY = view.current.center[1] - (view.current.height / 2);
    const pixelPercentY = pixelLoc ? (pixelLoc.y - 45) / mapHeight : 0.5;

    const newCenterY = pixelPercentY
    ? view.current.y + (pixelPercentY * view.current.height)
    : view.current.center[1];

    let endY = view.current.center[1] - (endHeight / 2);

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

    calibrateMapElements();
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
      attr: { 'font-size': labelSize },
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

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseDown(true);
    setMouseDownX(e.clientX);
    setMouseDownY(e.clientY);
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    setMouseDown(false);
  }

  const handleMouseDrag = (e: React.MouseEvent) => {
    if (mouseDown) {
      const view = mapCtx.map.view;
      const constraints = mapCtx.map.view.constraints;

      let startCX = view.current.x;
      let startCY = view.current.y;

      const pixelDiffX = e.clientX - mouseDownX;
      const pixelDiffY = e.clientY - mouseDownY;
      setMouseDownX(e.clientX);
      setMouseDownY(e.clientY);

      if (startCX - (view.current.width * view.panRate) <= constraints.left) {
        startCX += 16000;
      }

      if (startCX + view.current.width + (view.current.width * view.panRate) >= constraints.right) {
        startCX -= 16000;
      }

      let endCX = startCX - pixelDiffX * coordinatesPerPixel;
      let endCY = startCY - pixelDiffY * coordinatesPerPixel;

      if (endCY <= constraints.top) {
        endCY = constraints.top;
        setAtTop(true);
      }

      if (endCY + view.current.height >= constraints.bottom) {
        endCY = constraints.bottom - view.current.height;
        setAtBottom(true);
      }

      let endView: string = `${endCX} ${endCY} ${view.current.width} ${view.current.height}`;

      gsap.to(mapRef.current,
        {
          attr: { viewBox: endView },
          ease: 'none',
          duration: 0
        }
      );

      view.current.x = endCX;
      view.current.y = endCY;
      view.current.center[0] = view.current.x - (view.current.width / 2);
      view.current.center[1] = view.current.y - (view.current.height / 2);
    }
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      zoomIn({x: e.clientX, y: e.clientY});
    } else {
      zoomOut({x: e.clientX, y: e.clientY});
    }
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

  const calibrateMapElements = () => {
    const view = mapCtx.map.view;
    let coordinatesPerPixel = view.current.width / mapWidth;

    setCoordinatesPerPixel(coordinatesPerPixel);
  };

  useEffect(() => {
    calibrateMapElements();
  }, []);

  return (
    <div className="map-container" style={{height: window.innerHeight - 45}}>
      <div
        onMouseDown={(e) => { handleMouseDown(e) }}
        onMouseMove={(e) => { handleMouseDrag(e) }}
        onMouseUp={(e) => { handleMouseUp(e) }}
        onMouseLeave={(e) => { handleMouseUp(e) }}
        onWheel={(e) => { handleWheel(e) }}

        onPointerDown={(e) => { handleMouseDown(e) }}
        onPointerMove={(e) => { handleMouseDrag(e) }}
        onPointerUp={(e) => { handleMouseUp(e) }}
        onPointerLeave={(e) => { handleMouseUp(e) }}
      >
        <GameMap renderData={renderData}
          turnOrdersResult={turnOrdersResult}
          orderSet={orderSet}
          mapRef={mapRef}
          refs={llRef}
          mapWidth={mapWidth}
          mapHeight={mapHeight}
          labelSize={labelSize}
        />
      </div>
      <div className='view-controls' style={{left: mapWidth - 155}}>
        <ViewControls viewOps={viewOps}/>
      </div>
    </div>
  )
}