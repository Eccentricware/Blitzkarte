import { Pin } from "./pin";

export class NodePin {
  name!: string;
  province!: string;
  type!: string;
  adj: string[] | undefined;
  loc!: number[];
  fill: string | undefined;
  unit: string | undefined;
  warnings: string[] = [];
  errors: string[] = [];
  valid: boolean;
  approved: boolean = true;

  constructor(pin: Pin) {
    this.name = pin.name;
    this.province = pin.province;
    this.type = pin.type;
    this.applyAbbreviations();
    this.fill = this.initializeFill();
    this.loc = pin.loc;
    this.adj = pin.adj?.split('/');
    if (pin.unit) {
      this.unit = pin.unit;
    }

    this.valid = this.validate();
  }

  processName(pinName: string) {

  }

  applyAbbreviations() {
    switch (this.type) {
      case 'l':
        this.type = 'land';
        return;
      case 's':
        this.type= 'sea';
        return;
      case 'a':
        this.type = 'air';
        return;
      case 'e':
        this.type = 'event';
        return;
    }
  }

  initializeFill() {
    switch (this.type) {
      case 'land':
        return 'green';
      case 'sea':
        return 'blue';
      case 'air':
        return 'gold';
      case 'event':
        return 'purple';
    }
  }

  setFill(fill: string) {
    this.fill = fill;
  }

  validate(): boolean {
    let nameValid: boolean = this.validateName();
    let typeValid: boolean = this.validateType();
    let adjValid: boolean = this.validateAdj();
    // Province and Loc are validated in passed in generic Pin

    return nameValid && typeValid && adjValid;
  }

  validateName(): boolean {
    let nameValid: boolean = true;
    const nameSections: string[] = this.name.split('_');
    const validTypes: string = 'l, s, a, e';

    if (nameSections.length === 1) {
      this.errors.push(`Node ${this.name} type is not defined`);
      nameValid = false;
    } else if (!validTypes.includes(nameSections[1])) {
      this.errors.push(`Node ${this.name} is not a valid type`);
      nameValid = false;
    }

    if (nameSections.length > 3 || (this.type !== 's' && nameSections.length > 2)) {
      this.errors.push(`Node ${this.name} has too many sections`);
      nameValid = false;
    }

    if (nameSections[0].toUpperCase() !== this.province) {
      this.errors.push(`Node name ${this.name} mismatches its province ${this.province}`);
      nameValid = false;
    }

    return nameValid;
  }

  validateType(): boolean {
    let validTypes: string[] = ['land', 'sea','air', 'event'];
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
    let adjValid: boolean = true;

    if (this.adj && (this.adj[0] === 'none' || this.adj[0] === 'n')) {
      return true;
    }

    let typeWithAdjReq = ['land', 'sea', 'air'];
    if (this.adj && typeWithAdjReq.includes(this.type)) {
      let type: string = this.name.split('_')[1];
      this.adj.forEach(node => {
        if (node.split('_')[1] !== type) {
          this.errors.push(`${this.name} has incompatible adjacent node: ${node}`);
          adjValid = false;
        }
      });
    } else if (!this.adj && typeWithAdjReq.includes(this.type)) {
      this.errors.push(`Missing Adj Array: ${this.name}`);
      adjValid = false;
    }

    if (this.adj && this.type === 'event') {
      this.warnings.push(`Event node ${this.name} has an adjacency array`);
    }

    let adjNodes: string[] = [];
    if (this.adj) {
      this.adj.forEach(adjNode => {
        if (!adjNodes.includes(adjNode)) {
          adjNodes.push(adjNode);
        } else {
          this.errors.push(`${this.name} has adjNode ${adjNode} more than once`);
          adjValid = false;
        }
      });
    }

    return adjValid;
  }

  revokeApproval() {
    this.approved = false;
    this.fill = 'red';
  }
}