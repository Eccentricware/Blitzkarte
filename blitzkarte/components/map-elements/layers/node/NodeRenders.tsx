import { FC } from "react";
import { NodePin } from '../../../../utils/parsing/classes/node';

interface NodeRenderProps {
  pins: {
    land: NodePin[];
    sea: NodePin[];
    air: NodePin[];
    display: {
      land: boolean;
      sea: boolean;
      air: boolean;
    };
  }
}

export const NodeRenders: FC<NodeRenderProps> = ({pins}: NodeRenderProps) => {
  return (
    <g className="node-render">
      {
        pins.display.land &&
        <g className="land-pins">
          {
            pins.land.map(node => {
              return <circle key={node.name}
                cx={node.loc[0] - 16000} cy={node.loc[1]}
                fill={node.fill} r="22.5"
              />
            })
          }
          {
            pins.land.map(node => {
              return <circle key={node.name}
                cx={node.loc[0]} cy={node.loc[1]}
                fill={node.fill} r="22.5"
              />
            })
          }
          {
            pins.land.map(node => {
              return <circle key={node.name}
                cx={node.loc[0] + 16000} cy={node.loc[1]}
                fill={node.fill} r="22.5"
              />
            })
          }
        </g>
      }
      {
        pins.display.sea &&
        <g className="sea-pins">
          {
            pins.sea.map(node => {
              return <circle key={node.name}
                cx={node.loc[0] - 16000} cy={node.loc[1]}
                fill={node.fill} r="22.5"
              />
            })
          }
          {
            pins.sea.map(node => {
              return <circle key={node.name}
                cx={node.loc[0]} cy={node.loc[1]}
                fill={node.fill} r="22.5"
              />
            })
          }
          {
            pins.sea.map(node => {
              return <circle key={node.name}
                cx={node.loc[0] + 16000} cy={node.loc[1]}
                fill={node.fill} r="22.5"
              />
            })
          }
        </g>
      }
      {
        pins.display.air &&
        <g className="air-pins">
          {
            pins.air.map(node => {
              return <circle key={node.name}
                cx={node.loc[0] - 16000} cy={node.loc[1]}
                fill={node.fill} r="22.5"
              />
            })
          }
          {
            pins.air.map(node => {
              return <circle key={node.name}
                cx={node.loc[0]} cy={node.loc[1]}
                fill={node.fill} r="22.5"
              />
            })
          }
          {
            pins.air.map(node => {
              return <circle key={node.name}
                cx={node.loc[0] + 16000} cy={node.loc[1]}
                fill={node.fill} r="22.5"
              />
            })
          }
        </g>
      }
    </g>
  )
}