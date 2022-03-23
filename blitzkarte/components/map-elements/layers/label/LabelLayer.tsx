import React, { FC } from 'react';
import { LabelPin } from '../../../../utils/parsing/classes/label';

interface Props {
  labelRenderData: LabelPin[];
}

export const LabelLayer: FC<Props> = ({labelRenderData}: Props) => {
  return (
    <React.Fragment>
      {
        labelRenderData.map((label, i) => (
          <g key={i}>
            <text className={`label label-type-${label.type}`}
              transform={`translate(${label.loc[0] - 16000} ${label.loc[1]})`}
              pointerEvents="none"
            >
              {label.text}
            </text>
            <text className={`label label-type-${label.type}`}
              transform={`translate(${label.loc[0]} ${label.loc[1]})`}
              pointerEvents="none"
            >
              {label.text}
            </text>
            <text className={`label label-type-${label.type}`}
              transform={`translate(${label.loc[0] + 16000} ${label.loc[1]})`}
              pointerEvents="none"
            >
              {label.text}
            </text>
          </g>
        ))
      }
    </React.Fragment>
  )
}