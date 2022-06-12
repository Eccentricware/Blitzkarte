import { FC } from "react";

interface StallGlobeProps {
  mode: string;
  message: string;
}

const StallGlobe: FC<StallGlobeProps> = ({mode, message}: StallGlobeProps) => {
  console.log('message', message);
  return (
    <div id="stall-globe-container">
      <svg id="stall-globe" width="500" height="500" viewBox="0 0 503 503">
        <defs>
          <clipPath id="stall-globe-circle">
            <circle cx="251.5" cy="251.5" r="250" strokeMiterlimit="10"
              stroke={mode === 'error' ? 'red' : 'green'}
              strokeWidth="3"
            />
          </clipPath>
        </defs>
        <circle cx="251.5" cy="251.5" r="250" strokeMiterlimit="10"
          stroke={mode === 'error' ? 'red' : 'green'}
          clipPath="url(#stall-globe-circle)"
          strokeWidth="9"
        />
        <path d="M290.77,496.69c66.67-42.54,112.53-131.3,112.53-233.93,0-140.59-86-254.14-193.75-259.5"
          transform="translate(1.5 1.5)" fill="none" strokeMiterlimit="10"
          clipPath="url(#stall-globe-circle)"
          stroke={mode !== 'error' ? 'green' : 'red'}
          strokeWidth={mode === 'authenticating' ? 9 : 3}
        />
        <path d="M209.16,496.69C142.5,454.15,96.64,365.39,96.64,262.75c0-140.59,86-254.13,193.74-259.5" transform="translate(1.5 1.5)" fill="none" strokeMiterlimit="10"
          clipPath="url(#stall-globe-circle)"
          stroke={mode !== 'error' ? 'green' : 'red'}
          strokeWidth={mode === 'authenticating' ? 9 : 3}
        />
        <line x1="251.5" y1="1.5" x2="251.5" y2="501.5" fill="none" strokeMiterlimit="10"
          clipPath="url(#stall-globe-circle)"
          stroke={mode !== 'error' ? 'green' : 'red'}
          strokeWidth={mode === 'authenticating' ? 9 : 3}
        />
        <path d="M38,117.42A25.13,25.13,0,0,0,34.38,130c0,38.22,96.54,69.21,215.62,69.21s215.62-31,215.62-69.21A25.13,25.13,0,0,0,462,117.42"
          transform="translate(1.5 1.5)" fill="none" strokeMiterlimit="10"
          clipPath="url(#stall-globe-circle)"
          stroke={mode !== 'error' ? 'green' : 'red'}
          strokeWidth={mode === 'querying' ? 9 : 3}
        />
        <path d="M500,250c0,44.32-111.93,80.25-250,80.25S0,294.32,0,250"
          transform="translate(1.5 1.5)" fill="none"
          clipPath="url(#stall-globe-circle)"
          strokeMiterlimit="10"
          stroke={mode !== 'error' ? 'green' : 'red'}
          strokeWidth={mode === 'querying' ? 9 : 3}
        />
        <path d="M31,370.56c19,33.29,109.83,58.53,219,58.53s200.05-25.24,219-58.53"
          transform="translate(1.5 1.5)"
          clipPath="url(#stall-globe-circle)"
          fill="none" strokeMiterlimit="10"
          stroke={mode !== 'error' ? 'green' : 'red'}
          strokeWidth={mode === 'querying' ? 9 : 3}
        />
        <path d="M130.78,30a14.1,14.1,0,0,0-2,7.08C128.77,58.52,183.05,76,250,76S371.23,58.52,371.23,37a14.1,14.1,0,0,0-2-7.08"
          transform="translate(1.5 1.5)" fill="none" strokeMiterlimit="10"
          clipPath="url(#stall-globe-circle)"
          stroke={mode !== 'error' ? 'green' : 'red'}
          strokeWidth={mode === 'querying' ? 9 : 3}
        />
      </svg>
      <h2>{message}</h2>
    </div>

  )
}

export default StallGlobe;