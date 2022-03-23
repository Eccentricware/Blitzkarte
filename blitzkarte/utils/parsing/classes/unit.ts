import { NodePin } from "./node";
export class Unit {
  name: string;
  type: string | undefined;
  node: string;
  loc: string[] | undefined;
  country: string | undefined;
  valid: boolean;
  errors: string[] = [];

  constructor(node: NodePin, country: string | undefined) {
    this.name = `${country}_${node.unit}_${node.name}`;
    this.type = node.unit;
    this.country = country;
    this.node = node.name;

    this.valid = this.validate();
  }

  validate(): boolean {
    // node.name is validated in Node
    let typeValid: boolean = this.validateType();
    let countryValid: boolean = this.validateCountry();

    return typeValid && countryValid;
  }

  validateType(): boolean {
    let validUnitTypes: string[] = ['a', 'army', 'f', 'fleet', 'w', 'wing', 'n', 'nuke', 'g', 'garrison'];
    if (this.type && !validUnitTypes.includes(this.type)) {
      this.errors.push(`Invalid Unit Type: ${this.name}`);
      return false;
    }
    return true;
  }

  validateCountry(): boolean {
    if (!this.country) {
      this.errors.push(`Invalid Country: ${this.name}`);
      return false;
    }
    return true;
  }
}