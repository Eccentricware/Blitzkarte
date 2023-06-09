import React, { FC, Fragment } from 'react';
import { SupplyCenterLayer } from './SupplyCenterLayer';
import { VotingCenterLayer } from './VotingCenterLayer';

interface Props {
  cityData: any
}

export const CityLayer: FC<Props> = ({cityData}: Props) => {
  return (
    <g className="city-layer">
      {
        cityData
          ?
        <Fragment>
          <SupplyCenterLayer supplyCenters={cityData.supplyCenters}/>
          <VotingCenterLayer votingCenters={cityData.votingCenters}/>
        </Fragment>
          :
        <text x="10" y="10" className="error">CityLayer: No cityData</text>
      }
    </g>
  )
}