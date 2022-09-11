import { Pin } from "./pin";
import { convertSpaceToCamelCase } from "../../general/formatters";

export class Unit {
  name: string;
  fullName: string | undefined;
  type: string;
  node: string;
  loc: number[];
  country: string;
  countryKey!: string;
  valid: boolean;
  errors: string[] = [];

  constructor(node: Pin, country: string) {
    this.name = `${country}_${node.unit}_${node.name}`;
    this.name = this.name.replace(' ', '_');
    this.type = `${node.unit}`;
    this.country = country;
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