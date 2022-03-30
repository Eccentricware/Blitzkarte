import { FC } from 'react';
import { LinkRenders } from './LinkRenders';
import { NodeRenders } from './NodeRenders';

interface Props {
  nodeData: any
}

export const NodeLayer: FC<Props> = ({nodeData}: Props) => {
  return (
    <g className="Node-Layer">
      <LinkRenders links={nodeData.links}/>
      <NodeRenders nodes={nodeData.nodes}/>
    </g>
  )
}