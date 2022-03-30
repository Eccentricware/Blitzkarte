import { link } from 'fs';
import { FC } from 'react';
import { Link } from '../../../../utils/parsing/classes/link';

interface Props {
  links: Link[]
}

export const LinkRenders: FC<Props> = ({links}: Props) => {
  return (
    <g className="node-links">
      {
        links.map(link => {
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
  )
}