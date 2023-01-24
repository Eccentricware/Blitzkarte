import { FC} from 'react';

interface ViewControlProps {
  viewOps: {
    zoomIn: Function;
    zoomOut: Function;
    panUp: Function;
    panDown: Function;
    panLeft: Function;
    panRight: Function;
    reset: Function;
    zoomed: boolean;
    atTop: boolean;
    atBottom: boolean;
  };
}

export const ViewControls: FC<ViewControlProps> = ({
  viewOps
}: ViewControlProps) => {
  const handlePanUp = () => {
    viewOps.panUp();
    console.log('Pan Up Clicked!');
  }

  const handlePanDown = () => {
    viewOps.panDown();
    console.log('Pan Down Clicked!');
  }

  const handlePanLeft = () => {
    viewOps.panLeft();
    console.log('Pan Left Clicked!');
  }

  const handlePanRight = () => {
    viewOps.panRight();
    console.log('Pan Right Clicked!');
  }

  const handleZoomIn = () => {
    viewOps.zoomIn();
    console.log('Zoom In Clicked!');
  }

  const handleZoomOut = () => {
    viewOps.zoomOut();
    console.log('Zoom Out Clicked!');
  }

  const handleReset = () => {
    viewOps.reset();
    console.log('Handle View Reset');
  }

  return (
    <svg width="150" height="150" viewBox="0 0 500 500">
      <g id="Globe" className="map-view-button" onClick={handleReset}>
        <circle cx="251.12" cy="251.12" r="109.83" fill={viewOps.zoomed ? "aqua" : 'darkgray'} stroke="black" strokeMiterlimit="10" strokeWidth={5}/>
        <polygon points="196.6 158.47 205.75 167.07 202.98 185.37 214.9 182.87 231.53 182.59 235.69 193.96 227.1 204.49 225.16 223.62 227.38 236.1 221.28 236.1 217.95 228.06 209.08 223.62 209.63 237.49 216.15 249.13 227.1 253.29 237.36 272.42 241.51 296.54 231.26 321.76 224.05 337.57 216.29 343.11 213.24 331.19 214.35 293.49 196.6 287.94 184.68 266.04 188.56 243.58 175.81 227.23 165.28 215.86 166.66 227.78 160.84 231.94 158.07 210.59 156.47 195.38 162.16 189.05 189.69 164 196.6 158.47" fill={viewOps.zoomed ? 'lime' : 'gray'} stroke="#000" strokeMiterlimit="10" />
        <polygon points="264.7 241.44 264.7 248.34 268.96 258.28 283.37 260.31 299.4 258.28 308.54 258.69 314.63 263.56 316.65 280.4 317.87 292.17 319.5 305.16 328.83 312.67 335.33 308.81 340.81 291.36 342.43 273.7 341.42 256.05 342.43 247.93 332.69 240.22 333.09 227.84 339.99 224.18 353.19 226.82 356.43 228.85 348.92 205.92 338.37 189.28 324.98 180.35 309.35 183.19 308.74 192.12 307.93 207.95 300.42 216.07 289.87 212.01 282.76 219.92 272.21 223.17 272.01 230.07 282.15 228.24 291.89 226.42 297.17 233.32 287.84 240.22 279.11 233.93 271.19 234.53 264.7 241.44" fill={viewOps.zoomed ? 'lime' : 'gray'} stroke="#000" strokeMiterlimit="10" />
      </g>
      <g id="Zoom_Out" className="map-view-button" data-name="Zoom Out" onClick={() => handleZoomOut()}>
        <circle cx="404.46" cy="405.09" r="80.84" fill="rgba(0, 0, 0, 0.001)" stroke="none" strokeMiterlimit="10" />
        <rect x="323.62" y="387.62" width="161.68" height="32.88" fill={viewOps.zoomed ? 'lime' : 'gray'} stroke="#000" strokeMiterlimit="10" strokeWidth={5}/>
      </g>
      <g id="Zoom_In" className="map-view-button" data-name="Zoom In" onClick={handleZoomIn} strokeWidth={5}>
        <circle cx="404.46" cy="98.29" r="80.84" fill="rgba(0, 0, 0, 0.001)" stroke="none" strokeMiterlimit="10" />
        <polygon points="323.62 81.85 323.62 114.73 388.02 114.73 388.02 179.13 420.89 179.13 420.89 114.73 485.3 114.73 485.3 81.85 420.89 81.85 420.89 17.45 388.02 17.45 388.02 81.85 323.62 81.85" fill="lime" stroke="#000" strokeMiterlimit="10" />
      </g>
      <g id="Pan_Right" className="map-view-button" data-name="Pan Right" onClick={handlePanRight} strokeWidth="5">
        <path d="M350.41,324.8,500,250,349.18,174.59a124.52,124.52,0,0,1,1.23,150.21Z" transform="translate(1.12 1.12)" fill="lime" stroke="#000" strokeMiterlimit="10" />
      </g>
      <g id="Pan_Left" className="map-view-button" data-name="Pan Left" onClick={handlePanLeft} strokeWidth={5}>
        <path d="M125.5,249.67a123.9,123.9,0,0,1,25.11-75L0,250l151.42,75.71A123.92,123.92,0,0,1,125.5,249.67Z" transform="translate(1.12 1.12)" fill="lime" stroke="#000" strokeMiterlimit="10" />
      </g>
      <g id="Pan_Down" className="map-view-button" data-name="Pan Down" onClick={handlePanDown} strokeWidth={5}>
        <path d="M250,374.5A124,124,0,0,1,174.49,349L250,500l75.51-151A124,124,0,0,1,250,374.5Z" transform="translate(1.12 1.12)" fill={viewOps.atBottom ? 'gray' : 'lime'} stroke="#000" strokeMiterlimit="10" />
      </g>
      <g id="Pan_Up" className="map-view-button" data-name="Pan Up" onClick={handlePanUp} strokeWidth={5}>
        <path d="M250,126a123.92,123.92,0,0,1,75.91,25.82L250,0,174.09,151.82A123.92,123.92,0,0,1,250,126Z" transform="translate(1.12 1.12)" fill={viewOps.atTop ? 'gray' : 'lime'} stroke="#000" strokeMiterlimit="10" />
      </g>
    </svg>
  )
}

