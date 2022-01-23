import React, { FC } from 'react';
import { SupplyCenterLayer } from './SupplyCenterLayer';
import { VotingCenterLayer } from './VotingCenterLayer';

interface Props {
  cityData: any
}

export const CityLayer: FC<Props> = ({cityData}: Props) => {
  return (
    <React.Fragment>
      <SupplyCenterLayer supplyCenters={cityData.supplyCenters}/>
      <VotingCenterLayer votingCenters={cityData.votingCenters}/>
    </React.Fragment>
  )
}