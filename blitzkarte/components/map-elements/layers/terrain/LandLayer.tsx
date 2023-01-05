import React, { FC } from 'react';
import { Terrain } from '../../../../utils/parsing/classes/terrain';

interface Props {
  landRenderData: Terrain[]
}

const LandLayer: FC<Props> = ({landRenderData}: Props) => {
  return (
    <g className="land-layer">
      {
        landRenderData.map((land: Terrain) => {
          let stroke = '';
          let fill = '';

          switch (land.type) {
            case 'land':
            case 'l':
              fill = '#83a584';
              stroke = 'black';
              break;
            case 'pole':
              fill = '#fdfdfd';
              stroke = '#fdfdfd';
              break;
            case 'impassible':
            case 'i':
              fill = '#460002';
              stroke = 'black';
              break;

            // Decorative terrain
            case 'ice':
              fill = '#fdfdfd';
              stroke = 'none';
              break;
            case 'isle':
              fill = '#83a584';
              stroke = 'none';
              break;
          }

          return (
            <g key={land.province}>
              <polygon
                points={land.points}
                fill={land.fill ? land.fill : fill}
                strokeMiterlimit="1"
                stroke={stroke}
                strokeWidth="4"
                transform={`translate(-16000 0)`}
              />
              <polygon
                points={land.points}
                fill={land.fill ? land.fill : fill}
                strokeMiterlimit="1"
                stroke={stroke}
                strokeWidth="4"
              />
              <polygon
                points={land.points}
                fill={land.fill ? land.fill : fill}
                strokeMiterlimit="1"
                stroke={stroke}
                strokeWidth="4"
                transform={`translate(16000 0)`}
              />
            </g>
          )
        })
      }
    </g>
  )
}

export default LandLayer;