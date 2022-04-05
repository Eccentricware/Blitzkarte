import React, { FC } from 'react';
import { LabelPin } from '../../../../utils/parsing/classes/label';

interface LabelPinRendersProps {
  labelPinData: LabelPin[];
}

export const LabelPinRenders: FC<LabelPinRendersProps> = ({labelPinData}: LabelPinRendersProps) => {
  return (
    <g className="label-pins">
      {
        labelPinData.map((label) => (
          <g key={label.name}>
            <text className={`label label-type-${label.type}`}
              transform={`translate(${label.loc[0] - 16000} ${label.loc[1]})`}
              pointerEvents="none"
              fontSize={label.size}
              fill={label.fill}
            >
              {label.text}
            </text>
            <text className={`label label-type-${label.type}`}
              transform={`translate(${label.loc[0]} ${label.loc[1]})`}
              pointerEvents="none"
              fontSize={label.size}
              fill={label.fill}
            >
              {label.text}
            </text>
            <text className={`label label-type-${label.type}`}
              transform={`translate(${label.loc[0] + 16000} ${label.loc[1]})`}
              pointerEvents="none"
              fontSize={label.size}
              fill={label.fill}
            >
              {label.text}
            </text>
          </g>
        ))
      }
    </g>
  )
}