export class Unit {
  name: string;
  type!: string;
  nodePin!: string;
  loc: string[] | undefined;
  country!: string;

  constructor(type: string, country: string, nodePin: string) {
    this.name = `${country}_${type}_${nodePin}`;
    this.type = type;
    this.country = country;
    this.nodePin = nodePin;
  }
}