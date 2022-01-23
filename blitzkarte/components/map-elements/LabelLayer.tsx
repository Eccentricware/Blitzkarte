import React, { FC } from 'react';
import { Pin } from '../../utils/Parsing/pin';

interface Props {
  labelRenderData: Pin[];
}

export const LabelLayer: FC<Props> = ({labelRenderData}: Props) => {
  return (
    <React.Fragment>
      {
        labelRenderData.map((label, i) => (
          <text key={i} className={`label label-type-${label.labelType}`}
            transform={`translate(${label.loc[0]} ${label.loc[1]})`}
          >
            {label.labelText}
          </text>
        ))
      }
    </React.Fragment>
  )
}