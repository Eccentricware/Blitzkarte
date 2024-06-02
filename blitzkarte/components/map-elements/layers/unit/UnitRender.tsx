import React, { FC, useState } from 'react';
import { FlagSVGs } from '../../../icons/FlagSVGs';
import { UnitSVGs } from '../../../icons/UnitSVGs';
import Blitzkontext from '../../../../utils/Blitzkontext';
import { UnitType } from '../../../../models/enumeration/unit-enumerations';

interface Props {
  unit: any;
}

export const UnitRender: FC<Props> = ({unit}: Props) => {
  const unitType = unit.status === 'Fallout' ? 'detonation' : unit.type.toLowerCase();
  const unitName = unit.name.split(' ').join('_');
  const unitSVG = UnitSVGs[unit.status === 'Fallout' ? 'detonation' : unitType];
  const flagSVG = unit.status !== 'Fallout' && FlagSVGs[unit.countryKey];

  return (
    <Blitzkontext.Consumer>
      {({map}) => {
        return (
          <g className={unitName} key={unitName}>
            {
              unit.status === 'Retreat'
                &&
              <g>
                <circle className="order-circle"
                  cx={unit.loc[0] - 16000}
                  cy={unit.loc[1]}
                  r={135}
                  fill="yellow"
                  stroke="black"
                  strokeWidth={4}
                />
                <circle className="order-circle"
                  cx={unit.loc[0]}
                  cy={unit.loc[1]}
                  r={135}
                  fill="yellow"
                  stroke="black"
                  strokeWidth={4}
                />
                <circle className="order-circle"
                  cx={unit.loc[0] + 16000}
                  cy={unit.loc[1]}
                  r={135}
                  fill="yellow"
                  stroke="black"
                  strokeWidth={4}
                />
              </g>
            }
            <g className={unitName + '_left'} transform={
              `translate(
              ${unit.loc[0] - map.unitSizing[unitType].width / 2 - 16000}
              ${unit.status === 'Fallout'
                ? unit.loc[1]
                : unit.loc[1] - map.unitSizing[unitType].height / 2
              }
            )`}
            >
              <g transform={
                `translate(
                ${map.flagSizing.offset[unitType].x}
                ${map.flagSizing.offset[unitType].y}
              )

              scale(${0.5})
              `}
              >
                {flagSVG}
              </g>

              {unitSVG}

            </g>
            <g className={unitName + '_center'} transform={
                `translate(
                ${unit.loc[0] - map.unitSizing[unitType].width / 2} ${unit.status === 'Fallout'
                  ? unit.loc[1]
                  : unit.loc[1] - map.unitSizing[unitType].height / 2
                })`}
              >
                <g transform={
                  `translate(
                    ${map.flagSizing.offset[unitType].x}
                    ${map.flagSizing.offset[unitType].y}
                  )

                  scale(${0.5})
                `}
                >
                  {flagSVG}
                </g>

                {unitSVG}
            </g>
            <g className={unitName + '_right'} transform={
              `translate(
              ${unit.loc[0] - map.unitSizing[unitType].width / 2 + 16000}
              ${unit.status === 'Fallout'
                ? unit.loc[1]
                : unit.loc[1] - map.unitSizing[unitType].height / 2
              }
            )`}
            >
              <g transform={
                `translate(
                ${map.flagSizing.offset[unitType].x}
                ${map.flagSizing.offset[unitType].y}
              )

              scale(${0.5})
              `}
              >
                {flagSVG}
              </g>

              {unitSVG}

            </g>
          </g>
        )
      }}
    </Blitzkontext.Consumer>
  )
}