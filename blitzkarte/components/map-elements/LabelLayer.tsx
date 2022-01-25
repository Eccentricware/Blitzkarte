import React, { FC } from 'react';
import { LabelPin } from '../../utils/Parsing/labelPin';

interface Props {
  labelRenderData: LabelPin[];
}

export const LabelLayer: FC<Props> = ({labelRenderData}: Props) => {
  return (
    <React.Fragment>
      {
        labelRenderData.map((label, i) => (
          <text key={i} className={`label label-type-${label.type}`}
            transform={`translate(${label.loc[0]} ${label.loc[1]})`}
            pointerEvents="none"
          >
            {label.province}
          </text>
        ))
      }
    </React.Fragment>
  )
}