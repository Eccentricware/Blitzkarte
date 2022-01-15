export class Pin {
  nodeName: string | undefined;
  nodeType: string | undefined;
  coordinates: number[] | undefined;
  adjacentNodes: string[] | undefined;
  constructor(
      name: string,
      type: string,
      coordinates: number[],
      adjacentNodes: string[]) {
    this.nodeName = name;
    this.nodeType = type;
    this.coordinates = coordinates;
    this.adjacentNodes = adjacentNodes;
  }
}