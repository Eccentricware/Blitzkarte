import { FC } from "react";
import { NodePin } from '../../../../utils/parsing/classes/node';

interface NodeRenderProps {
  pins: {
    land: NodePin[];
    sea: NodePin[];
    air: NodePin[];
    event: NodePin[];
    display: {
      land: boolean;
      sea: boolean;
      air: boolean;
      event: boolean;
    };
  }
}

export const NodeRenders: FC<NodeRenderProps> = ({pins}: NodeRenderProps) => {
  const defaultRadius = 22.5;

  return (
    <g className="node-render">
      {
        pins.display.land &&
        <g className="land-pins">
          {
            pins.land.map(node => {
              return <circle id={node.name} key={node.name} className="node"
                cx={node.loc[0] - 16000} cy={node.loc[1]}
                fill={node.fill} r={defaultRadius}
              />
            })
          }
          {
            pins.land.map(node => {
              return <circle id={node.name} key={node.name} className="node"
                cx={node.loc[0]} cy={node.loc[1]}
                fill={node.fill} r={defaultRadius}
              />
            })
          }
          {
            pins.land.map(node => {
              return <circle id={node.name} key={node.name} className="node"
                cx={node.loc[0] + 16000} cy={node.loc[1]}
                fill={node.fill} r={defaultRadius}
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
              return <circle id={node.name} key={node.name} className="node"
                cx={node.loc[0] - 16000} cy={node.loc[1]}
                fill={node.fill} r={defaultRadius}
              />
            })
          }
          {
            pins.sea.map(node => {
              return <circle id={node.name} key={node.name} className="node"
                cx={node.loc[0]} cy={node.loc[1]}
                fill={node.fill} r={defaultRadius}
              />
            })
          }
          {
            pins.sea.map(node => {
              return <circle id={node.name} key={node.name} className="node"
                cx={node.loc[0] + 16000} cy={node.loc[1]}
                fill={node.fill} r={defaultRadius}
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
              return <circle id={node.name} key={node.name} className="node"
                cx={node.loc[0] - 16000} cy={node.loc[1]}
                fill={node.fill} r={defaultRadius}
              />
            })
          }
          {
            pins.air.map(node => {
              return <circle id={node.name} key={node.name} className="node"
                cx={node.loc[0]} cy={node.loc[1]}
                fill={node.fill} r={defaultRadius}
              />
            })
          }
          {
            pins.air.map(node => {
              return <circle id={node.name} key={node.name} className="node"
                cx={node.loc[0] + 16000} cy={node.loc[1]}
                fill={node.fill} r={defaultRadius}
              />
            })
          }
        </g>
      }
      {
        pins.display.event &&
        <g className="events-pins">
          {
            pins.event.map(node => {
              return <circle id={node.name} key={node.name} className="node"
                cx={node.loc[0] - 16000} cy={node.loc[1]}
                fill={node.fill} r={defaultRadius}
              />
            })
          }
          {
            pins.event.map(node => {
              return <circle id={node.name} key={node.name} className="node"
                cx={node.loc[0]} cy={node.loc[1]}
                fill={node.fill} r={defaultRadius}
              />
            })
          }
          {
            pins.event.map(node => {
              return <circle id={node.name} key={node.name} className="node"
                cx={node.loc[0] + 16000} cy={node.loc[1]}
                fill={node.fill} r={defaultRadius}
              />
            })
          }
        </g>
      }
    </g>
  )
}