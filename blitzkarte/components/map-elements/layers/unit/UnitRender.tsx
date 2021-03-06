import React, { FC } from 'react';
import { FlagSVGs } from '../../../icons/FlagSVGs';
import { UnitSVGs } from '../../../icons/UnitSVGs';
import Blitzkontext from '../../../../utils/Blitzkontext';

interface Props {
  unit: any;
}

export const UnitRender: FC<Props> = ({unit}: Props) => {
  const unitSVG = UnitSVGs[unit.type];
  const flagSVG = FlagSVGs[unit.countryKey];

  return (
    <Blitzkontext.Consumer>
      {({map}) => {
        return (
          <g className={unit.name} key={unit.name}>
            <g className={unit.name + '_left'} transform={
              `translate(
              ${unit.loc[0] - map.unitSizing[unit.type].width / 2 - 16000}
              ${unit.loc[1] - map.unitSizing[unit.type].height / 2}
            )`}
            >
              <g transform={
                `translate(
                ${map.flagSizing.offset[unit.type].x}
                ${map.flagSizing.offset[unit.type].y}
              )

              scale(${0.5})
              `}
              >
                {flagSVG}
              </g>

              {unitSVG}

            </g>
            <g className={unit.name + '_center'} transform={
                `translate(
                ${unit.loc[0] - map.unitSizing[unit.type].width / 2}
                ${unit.loc[1] - map.unitSizing[unit.type].height / 2}
              )`}
              >
                <g transform={
                  `translate(
                    ${map.flagSizing.offset[unit.type].x}
                    ${map.flagSizing.offset[unit.type].y}
                  )

                  scale(${0.5})
                `}
                >
                  {flagSVG}
                </g>

                {unitSVG}
            </g>
            <g className={unit.name + '_right'} transform={
              `translate(
              ${unit.loc[0] - map.unitSizing[unit.type].width / 2 + 16000}
              ${unit.loc[1] - map.unitSizing[unit.type].height / 2}
            )`}
            >
              <g transform={
                `translate(
                ${map.flagSizing.offset[unit.type].x}
                ${map.flagSizing.offset[unit.type].y}
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