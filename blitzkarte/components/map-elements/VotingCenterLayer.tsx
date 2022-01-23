import React, { FC } from 'react';
import { Pin } from '../../utils/Parsing/pin';

interface Props {
  votingCenters: Pin[]
}

export const VotingCenterLayer: FC<Props> = ({votingCenters}: Props) => {
  return (
    <React.Fragment>
      {
        votingCenters.map((votingCenter, i) => {
          return <polygon key={i}/>
        })
      }
    </React.Fragment>
  )
}