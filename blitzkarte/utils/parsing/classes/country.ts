import { Pin } from "./pin";
import {
  convertSnakeToTitleCase,
  convertSnakeToCamelCase
} from "../../general/utils";

export class Country {
  name: string;
  keyName: string;
  rank: string;
  color: string;
  nuke: number;
  bankedBuilds: number;
  provinces: string[] = [];
  votes: number = 1;
  cities: number = 0;
  units: string[] = [];
  adjustments: number = 0;
  valid: boolean;
  errors: string[] = [];

  constructor(pin: Pin) {
    this.name = this.setName(pin);
    this.keyName = this.setKey(pin);
    this.rank = this.setRank(pin);
    this.color = this.setColor(pin);
    this.nuke = this.setNuke(pin);
    this.bankedBuilds = this.setBankedBuilds(pin);
    this.valid = this.validate(pin);
  }

  setName(pin: Pin): string {
    let name: string = '';
    if (pin.country) {
      name = convertSnakeToTitleCase(pin.country);
    }
    return name;
  }

  setKey(pin: Pin): string {
    let keyName: string = '';
    if (pin.country) {
      keyName = convertSnakeToCamelCase(pin.country);
    }
    return keyName;
  }

  setRank(pin: Pin): string {
    let rank: string = '';
    if (pin.rank) {
      rank = pin.rank;
    }
    return rank;
  }

  setColor(pin: Pin): string {
    let color: string = '';
    if (pin.color) {
      color = pin.color;
    }
    return color;
  }

  setNuke(pin: Pin): number {
    let nuke: number = 0;
    if (pin.nuke) {
      nuke = Number(pin.nuke);
    }
    return nuke;
  }

  setBankedBuilds(pin: Pin): number {
    let bankedBuilds: number = 0;
    if (pin.bankedBuilds) {
      bankedBuilds = Number(pin.bankedBuilds);
    }
    return bankedBuilds;
  }

  validate(pin: Pin): boolean {
    let nameValid: boolean = this.validateName(pin);
    let rankValid: boolean = this.validateRank(pin);
    let colorValid: boolean = this.validateColor(pin);

    return nameValid && rankValid && colorValid;
  }

  validateName(pin: Pin): boolean {
    if (!this.name) {
      this.errors.push(`No Country Name: ${pin.name}`);
      return false;
    }
    return true;
  }

  validateRank(pin: Pin): boolean {
    let validRanks: string[] = ['a', 'b', 'c', 'd', 'e', 'n'];
    if (!validRanks.includes(this.rank)) {
      this.errors.push(`Invalid Rank: ${this.name ? this.name : pin.name}`);
      return false;
    }
    return true;
  }

  validateColor(pin: Pin): boolean {
    if (!this.color) {
      this.errors.push(`No color: ${this.name ? this.name : pin.name}`);
      return false;
    }
    return true;
  }
}