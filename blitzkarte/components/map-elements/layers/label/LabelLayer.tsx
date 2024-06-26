import React, { FC } from 'react';
import { LabelPin } from '../../../../utils/parsing/classes/label';
import { LabelLine } from '../../../../utils/parsing/classes/labelLine';
import { LabelLineRenders } from './LabelLineRenders';
import { LabelPinRenders } from './LabelPinRenders';

interface Props {
  labelPinData: LabelPin[];
  labelLineData: LabelLine[];
  labelSize: number;
}

export const LabelLayer: FC<Props> = ({labelPinData, labelLineData, labelSize}: Props) => {
  return (
    <g className="label-layer">
      <LabelPinRenders labelPinData={labelPinData} labelSize={labelSize}/>
      <LabelLineRenders labelLineData={labelLineData} />
    </g>

  )
}