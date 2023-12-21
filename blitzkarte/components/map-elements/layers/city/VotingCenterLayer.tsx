import React, { FC, useContext } from 'react';
import { City } from '../../../../models/objects/CityObject';
import { CityType, ProvinceStatus } from '../../../../models/enumeration/ProvinceEnums';
import { CountryStatus } from '../../../../models/enumeration/CountryEnumns';

interface Props {
  votingCenters: City[]
}

export const VotingCenterLayer: FC<Props> = ({votingCenters}: Props) => {
  return (
    <g className="voting-center-layer">
      {
        votingCenters.map((city: City, index: number) => {
          const voteType = city.type[0] === 'c' && city.capitalOwnerStatus !== CountryStatus.ELIMINATED
            ? 'capital'
            : 'voting-center';

          const capitalStatus = city.type[0] === 'c' && city.controllerId !== city.capitalOwnerId
            ? 'occupied '
            : city.type[0] === 'c' && city.controllerId === city.capitalOwnerId
              ? 'original'
              : '';

          const claimedStatus = city.status !== ProvinceStatus.DORMANT ? 'claimed' : 'unclaimed';

          let outlineClasses = `vote-star-outline ${capitalStatus} ${city.status} ${voteType}`;
          let leftClasses = `vote-star-left ${claimedStatus} ${voteType}`;
          let rightClasses = `vote-star-right ${capitalStatus} ${city.status} ${voteType}`;

          return (
            <g key={index}>
              <g className={`${city.name}_left`} transform={`translate(${city.loc[0] - 16080} ${city.loc[1] - 75})`}>
                <svg width="160" height="150" viewBox="0 0 79.53 75.63">
                  <polygon className={outlineClasses} points="39.76 1.63 48.72 29.48 77.97 29.39 54.25 46.52 63.37 74.31 39.76 57.05 16.15 74.31 25.27 46.52 1.55 29.39 30.8 29.48 39.76 1.63"/>
                  <polygon className={leftClasses} points="39.76 57.05 39.76 1.63 30.8 29.48 1.55 29.39 25.27 46.52 16.15 74.31 39.76 57.05"/>
                  <polygon className={rightClasses} points="77.97 29.39 48.72 29.48 39.76 1.63 39.76 57.05 63.37 74.31 54.25 46.52 77.97 29.39"/>
                </svg>
              </g>
              <g className={`${city.name}_center`} transform={`translate(${city.loc[0] - 80} ${city.loc[1] - 75})`}>
                <svg width="160" height="150" viewBox="0 0 79.53 75.63">
                <polygon className={outlineClasses} points="39.76 1.63 48.72 29.48 77.97 29.39 54.25 46.52 63.37 74.31 39.76 57.05 16.15 74.31 25.27 46.52 1.55 29.39 30.8 29.48 39.76 1.63"/>
                  <polygon className={leftClasses} points="39.76 57.05 39.76 1.63 30.8 29.48 1.55 29.39 25.27 46.52 16.15 74.31 39.76 57.05"/>
                  <polygon className={rightClasses} points="77.97 29.39 48.72 29.48 39.76 1.63 39.76 57.05 63.37 74.31 54.25 46.52 77.97 29.39"/>
                </svg>
              </g>
              <g className={`${city.name}_right`} transform={`translate(${city.loc[0] + 15930} ${city.loc[1] - 75})`}>
                <svg width="160" height="150" viewBox="0 0 79.53 75.63">
                <polygon className={outlineClasses} points="39.76 1.63 48.72 29.48 77.97 29.39 54.25 46.52 63.37 74.31 39.76 57.05 16.15 74.31 25.27 46.52 1.55 29.39 30.8 29.48 39.76 1.63"/>
                  <polygon className={leftClasses} points="39.76 57.05 39.76 1.63 30.8 29.48 1.55 29.39 25.27 46.52 16.15 74.31 39.76 57.05"/>
                  <polygon className={rightClasses} points="77.97 29.39 48.72 29.48 39.76 1.63 39.76 57.05 63.37 74.31 54.25 46.52 77.97 29.39"/>
                </svg>
              </g>
            </g>
          )
        })
      }
    </g>
  )
}