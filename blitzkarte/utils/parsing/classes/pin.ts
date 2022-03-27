export class Pin {
  name!: string;
  province!: string;
  pinType!: string | undefined;
  type!: string;
  text: string | undefined;
  unit: string | undefined;
  country: string | undefined;
  key: string | undefined;
  rank: string | undefined;
  color: string | undefined;
  nuke: number | undefined;
  bankedBuilds: number | undefined;
  cx: string | undefined;
  cy: string | undefined;
  loc!: number[];
  adj: string | undefined;
  valid: boolean | undefined;
  errors: string[] = [];

  constructor(pinString: string, provinceName: string) {
    this.province = provinceName;
    let pinProperties: string[] = pinString.split(' ');
    pinProperties.forEach(property => {
      if (property.indexOf('data-name') > -1) {
        let data: string[] = property.slice(11, property.length - 1).split(',');
        data.forEach(property => {
          let keyValuePair: string[] = property.split('=');
          this[keyValuePair[0]] = keyValuePair[1];
        });
      } else {
        let keyValuePair: string[] = property.split('=');
        this[keyValuePair[0]] = keyValuePair[1];
      }
    });

    if (this.cx && this.cy) {
      let x: string = this.cx.slice(1, this.cx.length - 1);
      let y: string = this.cy.slice(1, this.cy.length - 1);
      this.loc = [Number(x), Number(y)];
    }

    if (!this.name) {
      this.name = pinString;
    }

    this.valid = this.validate();
  }

  validate(): boolean {
    let pinTypeValid: boolean = this.validatePinType();
    let locValid: boolean = this.validateLoc();

    return pinTypeValid && locValid;
  }

  validateLoc(): boolean {
    if (!this.loc) {
      this.errors.push(`Invalid Loc: ${this.name}`);
    }
    return true;
  }

  validatePinType(): boolean {
    let validTypes: string[] = ['n', 'node', 'l', 'label', 'c', 'city'];
    if (this.pinType) {
      if (!validTypes.includes(this.pinType)) {
        this.errors.push(`Invalid Pin Type: ${this.name}`);
        return false;
      }
    } else {
      this.errors.push(`Missing Pin Type: ${this.name}`);
      return false;
    }

    return true;
  }
}