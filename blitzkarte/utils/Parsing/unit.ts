export class Unit {
  name: string;
  type!: string;
  nodePin!: string;
  loc: string[] | undefined;
  country!: string;

  constructor(name: string, type: string, country: string, nodePin: string) {
    this.name = name;
    this.type = type;
    this.country = country;
    this.nodePin = nodePin;
  }
}