import { Pin } from "./pin";

export class City {
  type: string;
  name: string;
  province!: string;
  //status!: string;
  loc!: number[];
  voteColor: string | undefined;
  statusColor: string | undefined;
  strokeColor: string = 'black';
  renderCategory: string;
  valid: boolean;
  errors: string[] = [];

  constructor(pin: Pin) {
    this.type = pin.type ? pin.type[0].toLowerCase() : '';
    this.province = pin.province;
    this.name = `${this.province}_${this.type}`;
    this.loc = pin.loc;

    if (this.type === 'c') {
      this.voteColor = 'gold';
      this.statusColor = 'gold';
      this.renderCategory = 'votingCenters';
    } else if (this.type === 'v') {
      this.voteColor = 'gray';
      this.statusColor = 'gray';
      this.renderCategory = 'votingCenters';
      this.strokeColor = 'red';
    } else if (this.type === 's') {
      this.statusColor = 'white';
      this.renderCategory = 'supplyCenters';
    } else if (this.type === 'd') {
      this.statusColor = 'gray';
      this.renderCategory = 'supplyCenters';
    } else {
      this.renderCategory = 'errorLayer'
    }

    this.valid = this.validate();
  }

  validate(): boolean {
    const typeValid: boolean = this.validateType();

    return typeValid;
  }

  validateType(): boolean {
    if (this.type) {
      const validTypes: string[] = ['c', 'v', 's', 'd'];
      if (!validTypes.includes(this.type)) {
        this.errors.push(`Invalid City Type: ${this.name}`);
        return false;
      }
    } else {
      this.errors.push(`No city type ${this.name}`);
      return false;
    }

    return true;
  }
}