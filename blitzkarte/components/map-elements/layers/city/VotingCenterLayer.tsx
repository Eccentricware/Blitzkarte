import React, { FC } from 'react';
import { City } from '../../../../utils/parsing/classes/city';

interface Props {
  votingCenters: City[]
}

export const VotingCenterLayer: FC<Props> = ({votingCenters}: Props) => {
  return (
    <g className="supply-center-layer">
      {
        votingCenters.map((city, i) => {
          return (
            <g key={i}>
              <g transform={`translate(${city.loc[0] - 16050} ${city.loc[1] - 50})`}>
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="79.53" height="75.63" viewBox="0 0 79.53 75.63">
                  <polygon points="39.76 1.63 48.72 29.48 77.97 29.39 54.25 46.52 63.37 74.31 39.76 57.05 16.15 74.31 25.27 46.52 1.55 29.39 30.8 29.48 39.76 1.63"
                    fill={city.voteColor} stroke="black" strokeWidth={5}
                  />
                  <polygon points="39.76 57.05 39.76 1.63 30.8 29.48 1.55 29.39 25.27 46.52 16.15 74.31 39.76 57.05"
                    fill={city.voteColor}
                  />
                  <polygon points="77.97 29.39 48.72 29.48 39.76 1.63 39.76 57.05 63.37 74.31 54.25 46.52 77.97 29.39"
                    fill={city.statusColor}
                  />
                </svg>
              </g>
              <g transform={`translate(${city.loc[0] - 50} ${city.loc[1] - 50})`}>
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="79.53" height="75.63" viewBox="0 0 79.53 75.63">
                  <polygon points="39.76 1.63 48.72 29.48 77.97 29.39 54.25 46.52 63.37 74.31 39.76 57.05 16.15 74.31 25.27 46.52 1.55 29.39 30.8 29.48 39.76 1.63"
                    fill={city.voteColor} stroke="black" strokeWidth={5}
                  />
                  <polygon points="39.76 57.05 39.76 1.63 30.8 29.48 1.55 29.39 25.27 46.52 16.15 74.31 39.76 57.05"
                    fill={city.voteColor}
                  />
                  <polygon points="77.97 29.39 48.72 29.48 39.76 1.63 39.76 57.05 63.37 74.31 54.25 46.52 77.97 29.39"
                    fill={city.statusColor}
                  />
                </svg>
              </g>
              <g transform={`translate(${city.loc[0] + 15950} ${city.loc[1] - 50})`}>
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="79.53" height="75.63" viewBox="0 0 79.53 75.63">
                  <polygon points="39.76 1.63 48.72 29.48 77.97 29.39 54.25 46.52 63.37 74.31 39.76 57.05 16.15 74.31 25.27 46.52 1.55 29.39 30.8 29.48 39.76 1.63"
                    fill={city.voteColor} stroke="black" strokeWidth={5}
                  />
                  <polygon points="39.76 57.05 39.76 1.63 30.8 29.48 1.55 29.39 25.27 46.52 16.15 74.31 39.76 57.05"
                    fill={city.voteColor}
                  />
                  <polygon points="77.97 29.39 48.72 29.48 39.76 1.63 39.76 57.05 63.37 74.31 54.25 46.52 77.97 29.39"
                    fill={city.statusColor}
                  />
                </svg>
              </g>
            </g>
          )
        })
      }
    </g>
  )
}