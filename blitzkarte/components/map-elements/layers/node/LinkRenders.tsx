import { link } from 'fs';
import { FC } from 'react';
import { NodeLink } from '../../../../utils/parsing/classes/nodeLink';

interface LinkRenderProps {
  links: {
    land: NodeLink[];
    sea: NodeLink[];
    air: NodeLink[];
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
                  x1={link.alpha.x} y1={link.alpha.y}
                  x2={link.omega.x} y2={link.omega.y}
                  stroke={link.stroke}
                  strokeWidth={15}
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
                  x1={link.alpha.x} y1={link.alpha.y}
                  x2={link.omega.x} y2={link.omega.y}
                  stroke={link.stroke}
                  strokeWidth={15}
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
                  x1={link.alpha.x} y1={link.alpha.y}
                  x2={link.omega.x} y2={link.omega.y}
                  stroke={link.stroke}
                  strokeWidth={15}
                />
              )
            })
          }
        </g>
      }
    </g>
  )
}