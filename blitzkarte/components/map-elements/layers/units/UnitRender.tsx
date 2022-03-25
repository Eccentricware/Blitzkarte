import React, { FC } from 'react';
import { FlagSVGs } from '../../../Icons/FlagSVGs';
import { UnitSVGs } from '../../../Icons/UnitSVGs';

interface Props {
  unit: any;
}

export const UnitRender: FC<Props> = ({unit}: Props) => {
  const unitSVG = UnitSVGs[unit.type];
  const flagSVG = FlagSVGs['australia'];
  return (
    <g transform={`translate(${unit.loc[0] - 150} ${unit.loc[1] - 150})`}>
      <g transform={`translate(${-70} ${-70})`}>{flagSVG}</g>
      {unitSVG}
    </g>
  )
}