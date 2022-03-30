import { FC } from "react";
import { NodePin } from '../../../../utils/parsing/classes/node';

interface Props {
  nodes: NodePin[]
}

export const NodeRenders: FC<Props> = ({nodes}: Props) => {
  return (
    <g className="node-render">
      {
        nodes.map(node => {
          return <circle key={node.name}
            cx={node.loc[0]} cy={node.loc[1]}
            fill={node.fill}
          />
        })
      }
    </g>
  )
}