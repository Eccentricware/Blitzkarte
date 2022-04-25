import { NodePin } from "./node";

export class NodeLink {
  name: string;
  type: string;
  alpha: {
    x: number,
    y: number
  };
  omega: {
    x: number,
    y: number
  };
  stroke: string | undefined;

  constructor(node: NodePin, adjNode: NodePin) {
    this.name = [node.name, adjNode.name].sort().join('-');
    this.type = node.type;


    let mainPoint: number[];
    let adjPoint: number[];
    if (node.name < adjNode.name) {
      mainPoint = [
        node.loc[0],
        node.loc[1]
      ];
      adjPoint = [
        adjNode.loc[0],
        adjNode.loc[1]
      ];
    } else {
      mainPoint = [
        adjNode.loc[0],
        adjNode.loc[1]
      ];
      adjPoint = [
        node.loc[0],
        node.loc[1]
      ];
    }

    if (Math.abs(mainPoint[0] - adjPoint[0]) > 8000) {
      let nudgePoint: number[];
      if (mainPoint[0] > adjPoint[0]) {
        nudgePoint = mainPoint;
      } else {
        nudgePoint = adjPoint;
      }
      nudgePoint[0] -= 16000;
    }

    this.alpha = {
      x: mainPoint[0],
      y: mainPoint[1]
    };
    this.omega = {
      x: adjPoint[0],
      y: adjPoint[1]
    };

    this.stroke = this.initializeStroke();
  }

  initializeStroke() {
    switch (this.type) {
      case 'land':
        return 'green';
      case 'sea':
        return 'blue';
      case 'air':
        return 'gold';
    }
  }

  setStroke(color: string) {
    this.stroke = color;
  }
}