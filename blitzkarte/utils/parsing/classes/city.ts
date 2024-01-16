import { Pin } from "./pin";

export class City {
  type: string;
  name: string;
  province!: string;
  // status!: string;
  loc!: number[];
  status: string;
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
      this.status = 'active';
      this.voteColor = 'gold';
      this.statusColor = 'gold';
      this.renderCategory = 'votingCenters';
    } else if (this.type === 'v') {
      this.status = 'dormant';
      this.voteColor = 'gray';
      this.statusColor = 'gray';
      this.renderCategory = 'votingCenters';
      this.strokeColor = 'red';
    } else if (this.type === 's') {
      this.status = 'active';
      this.statusColor = 'white';
      this.renderCategory = 'supplyCenters';
    } else if (this.type === 'd') {
      this.status = 'dormant';
      this.statusColor = 'gray';
      this.renderCategory = 'supplyCenters';
    } else {
      this.status = 'error';
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