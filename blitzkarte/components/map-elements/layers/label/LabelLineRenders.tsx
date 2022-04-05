import React, { FC} from 'react';
import { LabelLine } from '../../../../utils/parsing/classes/labelLine';

interface LabelLineRendersProps {
  labelLineData: LabelLine[];
}

export const LabelLineRenders: FC<LabelLineRendersProps> = ({labelLineData}: LabelLineRendersProps) => {
  return (
    <g className="label-lines">
      {
        labelLineData.map(line => (
          <g key={line.name}>
            <line x1={line.x1 - 16000} y1={line.y1}
              x2={line.x2 - 16000} y2={line.y2}
              stroke={line.stroke}
              strokeWidth="8"
            />
            <line x1={line.x1} y1={line.y1}
              x2={line.x2} y2={line.y2}
              stroke={line.stroke}
              strokeWidth="8"
            />
            <line x1={line.x1 + 16000} y1={line.y1}
              x2={line.x2 + 16000} y2={line.y2}
              stroke={line.stroke}
              strokeWidth="8"
            />
          </g>
        ))
      }
    </g>
  )
}