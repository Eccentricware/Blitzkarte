export class Terrain {
  name: string = '';
  province!: string;
  type!: string;
  start: string | undefined;
  end: string | undefined;
  renderCategory!: string;
  points: string | undefined;
  bounds: {
    top: number | undefined,
    bottom: number | undefined,
    left: number | undefined,
    right: number | undefined
  } = {
    top: undefined,
    bottom: undefined,
    left: undefined,
    right: undefined
  };
  fill: string | undefined;
  stroke: string | undefined;
  valid: boolean;
  errors: string[] = [];

  //Abbreviations
  t: string | undefined; // type
  s: string | undefined; // start
  e: string | undefined; // end

  constructor(terrain: string, provinceName: string) {
    this.province = provinceName;

    let dataStartIndex: number = terrain.indexOf('data-name');
    let pointsStartIndex: number = terrain.indexOf('points');
    let pointsEndIndex: number = terrain.indexOf('\" fill');

    let dataArray: string[] = terrain.slice(dataStartIndex + 11, pointsStartIndex - 2).split(',');
    dataArray.forEach(property => {
      let keyValuePair: string[] = property.split('=');
      this[keyValuePair[0]] = keyValuePair[1];

      if (keyValuePair[0] === 'type' || keyValuePair[0] === 't') {
        this.setType(keyValuePair[1]);
      }
    });

    if (this.s) {
      this.start = this.s;
    }

    if (this.e) {
      this.end = this.e;
    }

    this.name = this.setName();

    this.points = terrain.slice(pointsStartIndex + 8, pointsEndIndex);

    this.findBounds();

    this.valid = this.validate();
  }

  setType(type: string): void {
    switch (type) {
      case 'land':
      case 'l':
        this.type = 'land';
        this.fill = '#83a584';
        this.stroke = 'black';
        this.renderCategory = 'land';
        break;
      case 'sea':
      case 's':
        this.type = 'sea';
        this.fill = '#42cafe';
        this.stroke = 'white';
        this.renderCategory = 'sea';
        break;
      case 'bridge':
      case 'b':
        this.type = 'bridge';
        this.fill = 'none';
        this.stroke = 'red';
        this.renderCategory = 'line';
        break;
      case 'border':
        this.type = 'border';
        this.fill = 'none';
        this.stroke = 'darkgray';
        this.renderCategory = 'line';
        break;
      case 'canal':
      case 'c':
        this.type = 'canal';
        this.fill = '#42cafe';
        this.stroke = 'white';
        this.renderCategory = 'canal';
        break;
      case 'pole':
        this.type = 'pole';
        this.fill = '#fdfdfd';
        this.stroke = '#fdfdfd';
        this.renderCategory = 'land';
        break;
      case 'impassible':
      case 'i':
        this.type = 'impassible';
        this.fill = '#460002';
        this.stroke = 'black';
        this.renderCategory = 'land';
        break;

      // Decorative terrain
      case 'ice':
        this.type = 'decorative';
        this.fill = '#fdfdfd';
        this.stroke = 'none';
        this.renderCategory = 'land';
        break;
      case 'isle':
        this.type = 'decorative';
        this.fill = '#83a584';
        this.stroke = 'none';
        this.renderCategory = 'land';
        break;
      case 'lake':
        this.type = 'decorative';
        this.fill = '#c5e6c5';
        this.stroke = 'black';
        this.renderCategory = 'sea';
        break;

      // Never
      default:
        this.type = 'fail';
        this.renderCategory = 'This does not mean you are a bad person, necessarily'
    }
  }

  setName() {
    if (this.type === 'bridge') {
      return `${this.start}_${this.end}_bridge`;
    } else {
      return `${this.province}_${this.type}` + this.name;
    }
  }

  setFill(color: string) {
    this.fill = color;
  }

  findBounds() {
    const points = this.points?.split(' ');
    points?.forEach((point: string, index: number) => {
      let value: number = Number(point);
      if (index % 2 === 0) {

        if (this.bounds.left === undefined) {
          this.bounds.left = value;
        }

        if (this.bounds.right === undefined) {
          this.bounds.right = value;
        }

        if (value < this.bounds.left) {
          this.bounds.left = value;
        }


        if (value > this.bounds.right) {
          this.bounds.right = value;
        }
      } else {
        if (this.bounds.top === undefined) {
          this.bounds.top = value;
        }

        if (value < this.bounds.top) {
          this.bounds.top = value;
        }

        if (this.bounds.bottom === undefined) {
          this.bounds.bottom = value;
        }

        if (value > this.bounds.bottom) {
          this.bounds.bottom = value;
        }
      }
    })
  }

  validate(): boolean {
    let typeValid: boolean = this.validateType();
    let bridgeValid: boolean = this.validateBridge();

    return typeValid && bridgeValid;
  }

  validateType(): boolean {
    const validTypes: string[] = ['l', 's', 'b', 'o', 'c', 'p', 'i', 'd'];

    if (!this.type) {
      this.errors.push(`${this.name} has inavlid type`);
      return false;
    }

    if (!validTypes.includes(this.type[0].toLowerCase())) {
      this.errors.push(`Invalid Terrain Type: ${this.name}`);
      return false;
    }

    return true;
  }

  validateBridge(): boolean {
    if (this.type === 'bridge' && (!this.start || !this.end)) {
      this.errors.push(`Bridge ${this.name} is missing at least 1 linked province.`)
      return false;
    }
    return true;
  }
}