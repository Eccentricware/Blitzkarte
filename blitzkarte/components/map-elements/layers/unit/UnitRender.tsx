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
      {({mapView}) => {
        return (
          <g className={unit.name} key={unit.name}>
            <g transform={
              `translate(
                ${unit.loc[0] - mapView.unitSizing[unit.type].width / 2 - 16000}
                ${unit.loc[1] - mapView.unitSizing[unit.type].height / 2}
              )`}
            >
              <g transform={
                `translate(
                  ${mapView.flagSizing.offset[unit.type].x}
                  ${mapView.flagSizing.offset[unit.type].y}
                )

                scale(${0.5})
                `}
              >
                {flagSVG}
              </g>

              {unitSVG}

            </g>
            <g transform={
              `translate(
                ${unit.loc[0] - mapView.unitSizing[unit.type].width / 2}
                ${unit.loc[1] - mapView.unitSizing[unit.type].height / 2}
              )`}
            >
              <g transform={
                `translate(
                  ${mapView.flagSizing.offset[unit.type].x}
                  ${mapView.flagSizing.offset[unit.type].y}
                )

                scale(${0.5})
                `}
              >
                {flagSVG}
              </g>

              {unitSVG}

            </g>
            <g transform={
              `translate(
                ${unit.loc[0] - mapView.unitSizing[unit.type].width / 2 + 16000}
                ${unit.loc[1] - mapView.unitSizing[unit.type].height / 2}
              )`}
            >
              <g transform={
                `translate(
                  ${mapView.flagSizing.offset[unit.type].x}
                  ${mapView.flagSizing.offset[unit.type].y}
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