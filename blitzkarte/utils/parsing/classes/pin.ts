export class Pin {
  name!: string;

  province!: string;
  pinType!: string | undefined;

  type!: string;

  text: string | undefined;
  number: string | undefined;
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

  //Abbreviations
  p: string | undefined; // pinType
  t: string | undefined; // type
  n: string | undefined; // name
  a: string | undefined; // adj
  u: string | undefined; // unit
  c: string | undefined; // country
  r: string | undefined; // rank
  f: string | undefined; // color
  nr: string | undefined; // nuke

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
      this.name = `Pin_in_${provinceName}`;
    }

    this.applyAbbreviations();

    this.valid = this.validate();
  }

  applyAbbreviations() {
    if (this.p) {
      this.pinType = this.p
    }

    if (this.t) {
      this.type = this.t;
    }

    if (this.n) {
      this.name = this.n;
    }

    if (this.a) {
      this.adj = this.a;
    }

    if (this.u) {
      this.unit = this.u;
    }

    if (this.c) {
      this.country = this.c;
    }

    if (this.r && !this.rank) {
      this.rank = this.r;
    }

    if (this.f) {
      this.color = this.f;
    }

    if (this.nr) {
      this.nuke = Number(this.nr);
    }

    switch(this.pinType) {
      case 'n':
        this.pinType = 'node';
        break;
      case 'l':
        this.pinType = 'label';
        break;
      case 'c':
        this.pinType = 'city';
        break;
    }

    switch(this.unit) {
      case 'a':
        this.unit = 'army';
        break;
      case 'f':
        this.unit = 'fleet';
        break;
      case 'w':
        this.unit = 'wing';
        break;
      case 'n':
        this.unit = 'nuke';
        break;
      case 'g':
        this.unit = 'garrison';
        break;
    }
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