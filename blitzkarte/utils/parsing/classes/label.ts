import { Pin } from "./pin";

export class LabelPin {
  name: string;
  type!: string;
  text!: string | undefined;
  size: number = 100;
  fill?: 'black';
  province!: string;
  loc!: number[];
  valid: boolean;
  errors: string[] = [];

  constructor(pin: Pin, provinceType: string) {
    this.text = pin.text ? pin.text : pin.province;
    this.type = this.setType(provinceType);
    this.setSizeAndColor();

    this.name = `${pin.province}_label`;
    if (pin.number) {
      this.name += `_${pin.number}`;
    }
    this.province = pin.province;
    this.loc = pin.loc;

    this.valid = this.validate();
  }

  setType(provinceType: string): string {
    let landTypes: string[] = ['coast', 'inland', 'island', 'pole'];
    if (landTypes.includes(provinceType)) {
      return 'land';
    } else if (provinceType === 'sea') {
      return 'sea';
    } else {
      return 'coast';
    }
  }

  setSizeAndColor() {
    if (this.type === 'coast') {
      this.size = 64;
    }

    if (this.type === 'sea') {
      this.fill = 'white';
    }
  }

  validate(): boolean {
    const typeValid: boolean = this.validateType();
    const textValid: boolean = this.validateText();

    return typeValid && textValid;
  }

  validateType(): boolean {
    const validLabelTypes: string[] = ['land', 'sea', 'coast'];

    if (!this.type) {
      this.errors.push(`Label ${this.name} has no label type`);
      return false;
    }

    if (!validLabelTypes.includes(this.type)) {
      this.errors.push(`${this.name} has invalid label type: ${this.type}`);
      return false;
    }

    return true;
  }

  validateText(): boolean {
    if (!this.text) {
      this.errors.push(`Missing Label Text: ${this.name}`);
      return false;
    }
    return true;
  }
}