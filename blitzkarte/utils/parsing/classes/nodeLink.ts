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

    let firstNode: NodePin;
    let secondNode: NodePin;
    if (node.name < adjNode.name) {
      firstNode = node;
      secondNode = adjNode;
    } else {
      firstNode = adjNode;
      secondNode = node;
    }

    if (Math.abs(node.loc[0] - adjNode.loc[0]) > 8000) {
      let nudgeNode: NodePin;
      if (node.loc[0] < adjNode.loc[0]) {
        nudgeNode = adjNode;
      } else {
        nudgeNode = node;
      }
      nudgeNode.loc[0] -= 16000;
    }

    this.alpha = {
      x: firstNode.loc[0],
      y: firstNode.loc[1]
    };
    this.omega = {
      x: secondNode.loc[0],
      y: secondNode.loc[1]
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