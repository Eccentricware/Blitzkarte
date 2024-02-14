import React, { FC, useContext } from 'react';
import Blitzkontext from '../../../../utils/Blitzkontext';
import { LabelPin } from '../../../../utils/parsing/classes/label';

interface LabelPinRendersProps {
  labelPinData: LabelPin[];
}

export const LabelPinRenders: FC<LabelPinRendersProps> = ({labelPinData}: LabelPinRendersProps) => {
  const mapCtx = useContext(Blitzkontext);
  const labelScaling = mapCtx.map.scaling.label;
  return (
  <Blitzkontext.Consumer>
    {({map}) => {
      return (
        <g className="label-pins">
          {
            labelPinData.map((label) => (
              <g key={label.name} className={label.province}>
                <text className={`label ${label.type}-label`}
                  transform={`translate(${label.loc[0] - 16000} ${label.loc[1]})`}
                  pointerEvents="none"
                  fontSize={label.type === 'coast' ? 96 : 125}
                  fill={label.fill}
                >
                  {label.text}
                </text>
                <text className={`label ${label.type}-label`}
                  transform={`translate(${label.loc[0]} ${label.loc[1]})`}
                  pointerEvents="none"
                  fontSize={label.type === 'coast' ? 96 : 125}
                  fill={label.fill}
                >
                  {label.text}
                </text>
                <text className={`label ${label.type}-label`}
                  transform={`translate(${label.loc[0] + 16000} ${label.loc[1]})`}
                  pointerEvents="none"
                  fontSize={label.type === 'coast' ? 96 : 125}
                  fill={label.fill}
                >
                  {label.text}
                </text>
              </g>
            ))
          }
        </g>
      )
    }}
  </Blitzkontext.Consumer>
  )
}