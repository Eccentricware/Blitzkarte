import { link } from 'fs';
import { FC } from 'react';
import { Link } from '../../../../utils/parsing/classes/link';

interface LinkRenderProps {
  links: {
    land: Link[];
    sea: Link[];
    air: Link[];
    display: {
      land: boolean;
      sea: boolean;
      air: boolean;
    };
  }
}

export const LinkRenders: FC<LinkRenderProps> = ({links}: LinkRenderProps) => {
  return (
    <g className="node-links">
      {
        links.display.land &&
        <g className="land-links">
          {
            links.land.map(link => {
              return (
                <line key={link.name}
                  x1={link.origin.x} y1={link.origin.y}
                  x2={link.destination.x} y2={link.destination.y}
                  stroke={link.stroke}
                />
              )
            })
          }
        </g>
      }
      {
        links.display.sea &&
        <g className="sea-links">
          {
            links.sea.map(link => {
              return (
                <line key={link.name}
                  x1={link.origin.x} y1={link.origin.y}
                  x2={link.destination.x} y2={link.destination.y}
                  stroke={link.stroke}
                />
              )
            })
          }
        </g>
      }
      {
        links.display.air &&
        <g className="air-links">
          {
            links.air.map(link => {
              return (
                <line key={link.name}
                  x1={link.origin.x} y1={link.origin.y}
                  x2={link.destination.x} y2={link.destination.y}
                  stroke={link.stroke}
                />
              )
            })
          }
        </g>
      }
    </g>
  )
}