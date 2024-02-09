import { Pin } from "./pin";
import { convertSpaceToCamelCase } from "../../general/formatters";
import { UnitType } from "../../../models/enumeration/unit-enumerations";
import { tr } from "date-fns/locale";

export class Unit {
  name: string;
  fullName: string | undefined;
  type: string;
  status: string;
  node: string;
  loc: number[];
  eventLoc: number[];
  country: string;
  countryKey!: string;
  valid: boolean;
  errors: string[] = [];
  validUnitTypes = {
    army: ['a', 'A', 'army', 'Army', 'ARMY'],
    fleet: ['f', 'F', 'fleet', 'Fleet', 'FLEET'],
    wing: ['w', 'W', 'wing', 'Wing', 'WING'],
    nuke: ['n', 'N', 'nuke', 'Nuke', 'NUKE'],
    garrison: ['g', 'G', 'garrison', 'Garrison', 'GARRSION']
  };

  constructor(node: Pin, country: string) {
    this.name = `${country}_${node.unit}_${node.name}`;
    this.name = this.name.replace(' ', '_');
    this.status = 'Active';
    this.type = `${node.unit}`;
    this.country = country;
    this.countryKey = convertSpaceToCamelCase(country);
    this.node = node.name;
    this.loc = node.loc.map((coordinate: number) => Math.round(coordinate));
    this.eventLoc = [];
    this.valid = this.validate();
  }

  validate(): boolean {
    // node.name is validated in Node
    let typeValid: boolean = this.validateType();
    let countryValid: boolean = this.validateCountry();

    return typeValid && countryValid;
  }

  validateType(): boolean {
    if (!this.type) {
      this.errors.push(`Invalid Unit Type: ${this.name}`);
      return false;
    } else if (this.validUnitTypes.army.includes(this.type)) {
      this.type = UnitType.ARMY;
      return true;
    } else if (this.validUnitTypes.fleet.includes(this.type)) {
      this.type = UnitType.FLEET;
      return true;
    } else if (this.validUnitTypes.wing.includes(this.type)) {
      this.type = UnitType.WING;
      return true;
    } else if (this.validUnitTypes.nuke.includes(this.type)) {
      this.type = UnitType.NUKE;
      return true;
    } else if (this.validUnitTypes.garrison.includes(this.type)) {
      this.type = UnitType.GARRISON;
      return true;
    } else {
      this.errors.push(`Invalid Unit Type: ${this.name}`);
      return false;
    }
  }

  validateCountry(): boolean {
    if (!this.countryKey) {
      this.errors.push(`Invalid Country: ${this.name}`);
      return false;
    }
    return true;
  }
}