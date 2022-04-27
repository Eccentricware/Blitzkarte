import { FC } from 'react';
import { LinkRenders } from './LinkRenders';
import { NodeRenders } from './NodeRenders';

interface Props {
  nodeData: any,
  nodeRefs:  any;
}

export const NodeLayer: FC<Props> = ({nodeData, nodeRefs}: Props) => {
  return (
    <g className="Node-Layer">
      <LinkRenders links={nodeData.links} lineRefs={nodeRefs}/>
      <NodeRenders pins={nodeData.pins}/>
    </g>
  )
}