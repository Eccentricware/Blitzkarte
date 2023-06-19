export class LabelLine {
  name: string;
  province: string;
  type!: string;
  stroke: string;
  x1!: number;
  y1!: number;
  x2!: number;
  y2!: number;
  valid: boolean;
  errors: string[] = [];

  constructor(labelLineString: string, provinceName: string) {
    this.province = provinceName;
    let labelLineProperties: string[] = labelLineString.split(' ');
    let keysToConvertToNumbers: string[] = ['x1', 'y1', 'x2', 'y2'];
    labelLineProperties.forEach(property => {
      if (property.indexOf('data-name') > -1) {
        let data: string[] = property.slice(11, property.length - 1).split(',');
        data.forEach(property => {
          let keyValuePair: string[] = property.split('=');
          this[keyValuePair[0]] = keyValuePair[1];
        });
      } else {
        let keyValuePair: string[] = property.split('=');
        if (keysToConvertToNumbers.includes(keyValuePair[0])) {
          this[keyValuePair[0]] = Math.round(Number(keyValuePair[1].slice(1, keyValuePair[1].length -1)));
        } else {
          this[keyValuePair[0]] = keyValuePair[1];
        }
      }
    });

    this.name = `${this.province}_label_line`;

    this.stroke = this.setStroke();

    this.valid = this.validate();
  }

  setStroke(): string {
    if (this.type === 'land') {
      return 'black';
    } else if (this.type === 'sea') {
      return 'white';
    } else {
      return 'red';
    }
  }

  validate(): boolean {
    let validType: boolean = this.validateType();

    return validType;
  }

  validateType(): boolean {
    let validTypes: string[] = ['land', 'sea'];
    if (!validTypes.includes(this.type)) {
      this.errors.push(`Label Line ${this.name} is not of a valid type`);
      return false;
    }
    return true;
  }
}