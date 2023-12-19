import React, { FC, useContext } from 'react';
import { City } from '../../../../utils/parsing/classes/city';

interface Props {
  votingCenters: City[]
}

export const VotingCenterLayer: FC<Props> = ({votingCenters}: Props) => {
  return (
    <g className="voting-center-layer">
      {
        votingCenters.map((city, i) => {
          return (
            <g key={i}>
              <g className={`${city.name}_left`} transform={`translate(${city.loc[0] - 16080} ${city.loc[1] - 75})`}>
                <svg width="160" height="150" viewBox="0 0 79.53 75.63">
                  <polygon className={`vote-star-base`} points="39.76 1.63 48.72 29.48 77.97 29.39 54.25 46.52 63.37 74.31 39.76 57.05 16.15 74.31 25.27 46.52 1.55 29.39 30.8 29.48 39.76 1.63"
                    fill={city.voteColor} stroke={city.strokeColor} strokeWidth={5}
                  />
                  <polygon className={`vote-star-left`} points="39.76 57.05 39.76 1.63 30.8 29.48 1.55 29.39 25.27 46.52 16.15 74.31 39.76 57.05"
                    fill={city.voteColor}
                  />
                  {/* <polygon className={`vote-start-right`} points="77.97 29.39 48.72 29.48 39.76 1.63 39.76 57.05 63.37 74.31 54.25 46.52 77.97 29.39"
                    fill={city.statusColor}
                  /> */}
                </svg>
              </g>
              <g className={`${city.name}_center`} transform={`translate(${city.loc[0] - 80} ${city.loc[1] - 75})`}>
                <svg width="160" height="150" viewBox="0 0 79.53 75.63">
                  <polygon className={`vote-star-base`} points="39.76 1.63 48.72 29.48 77.97 29.39 54.25 46.52 63.37 74.31 39.76 57.05 16.15 74.31 25.27 46.52 1.55 29.39 30.8 29.48 39.76 1.63"
                    fill={city.voteColor} stroke={city.strokeColor} strokeWidth={5}
                  />
                  <polygon className={`vote-star-left`} points="39.76 57.05 39.76 1.63 30.8 29.48 1.55 29.39 25.27 46.52 16.15 74.31 39.76 57.05"
                    fill={city.voteColor}
                  />
                  {/* <polygon className={`vote-star-right`} points="77.97 29.39 48.72 29.48 39.76 1.63 39.76 57.05 63.37 74.31 54.25 46.52 77.97 29.39"
                    fill={city.statusColor}
                  /> */}
                </svg>
              </g>
              <g className={`${city.name}_right`} transform={`translate(${city.loc[0] + 15930} ${city.loc[1] - 75})`}>
                <svg width="160" height="150" viewBox="0 0 79.53 75.63">
                  <polygon className={`vote-star-base`} points="39.76 1.63 48.72 29.48 77.97 29.39 54.25 46.52 63.37 74.31 39.76 57.05 16.15 74.31 25.27 46.52 1.55 29.39 30.8 29.48 39.76 1.63"
                    fill={city.voteColor} stroke={city.strokeColor} strokeWidth={5}
                  />
                  <polygon className={`vote-star-left`} points="39.76 57.05 39.76 1.63 30.8 29.48 1.55 29.39 25.27 46.52 16.15 74.31 39.76 57.05"
                    fill={city.voteColor}
                  />
                  {/* <polygon className={`vote-star-right`} points="77.97 29.39 48.72 29.48 39.76 1.63 39.76 57.05 63.37 74.31 54.25 46.52 77.97 29.39"
                    fill={city.statusColor}
                  /> */}
                </svg>
              </g>
            </g>
          )
        })
      }
    </g>
  )
}