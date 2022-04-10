import { Pin } from "./pin";
import { convertSnakeToCamelCase, convertSpaceToCamelCase } from "../../general/utils";

export class Unit {
  name: string;
  type: string;
  node: string;
  loc: number[];
  countryKey!: string;
  valid: boolean;
  errors: string[] = [];

  constructor(node: Pin, country: string) {
    this.name = `${country}_${node.unit}_${node.name}`;
    this.type = `${node.unit}`;
    this.countryKey = convertSpaceToCamelCase(country);
    this.node = node.name;
    this.loc = node.loc;
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
    if (!this.countryKey) {
      this.errors.push(`Invalid Country: ${this.name}`);
      return false;
    }
    return true;
  }
}