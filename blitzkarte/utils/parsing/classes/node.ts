import { Pin } from "./pin";

export class NodePin {
  name!: string;
  province!: string;
  type!: string;
  adj!: string[] | undefined;
  loc!: number[];
  unit?: string;
  errors: string[] = [];
  valid: boolean;

  constructor(pin: Pin) {
    this.name = pin.name;
    this.province = pin.province;
    this.type = pin.type;
    this.loc = pin.loc;
    this.adj = pin.adj?.split('/');
    this.unit = pin.unit;

    this.valid = this.validate();
  }

  validate(): boolean {
    let typeValid: boolean = this.validateType();
    let adjValid: boolean = this.validateAdj();
    // Province and Loc are validated in passed in generic Pin

    return typeValid && adjValid;
  }

  validateType(): boolean {
    let validTypes: string[] = ['l', 'land', 's', 'sea', 'a', 'air', 'o', 'other'];
    if (this.type) {
      if (!validTypes.includes(this.type)) {
        this.errors.push(`Invalid Node Type: ${this.name}`);
        return false;
      }
    } else {
      this.errors.push(`Missing Node Type: ${this.name}`);
      return false;
    }
    return true;
  }

  validateAdj(): boolean {
    if (this.adj) {
      let type: string = this.name.split('_')[1];
      this.adj.forEach(node => {
        if (node.split('_')[1] !== type) {
          this.errors.push(`Incompatible Adjacent Node ${node} in ${this.name}`);
          return false;
        }
      });
    } else {
      this.errors.push(`Missing Adj Array: ${this.name}`);
      return false;
    }
    return true;
  }
}