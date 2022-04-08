import { Pin } from "./pin";

export class LabelPin {
  name: string;
  type!: string;
  text!: string | undefined;
  size: number = 100;
  fill?: string;
  province!: string;
  loc!: number[];
  valid: boolean;
  errors: string[] = [];

  constructor(pin: Pin, provinceType: string) {
    this.type = pin.type ? pin.type : this.setType(provinceType);
    this.setSizeAndColor(pin.type);

    this.text = pin.text ? pin.text : pin.province;
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
      return 'L';
    } else {
      return 'S';
    }
  }

  setSizeAndColor() {
    if (this.type === 'c' || this.type === 'C') {
      this.size = 64;
    } else {
      this.size = 100;
    }

    if (this.type === 's' || this.type === 'S') {
      this.fill = 'white';
    } else {
      this.fill = 'black';
    }
  }

  validate(): boolean {
    const typeValid: boolean = this.validateType();
    const textValid: boolean = this.validateText();

    return typeValid && textValid;
  }

  validateType(): boolean {
    const validLabelTypes: string[] = ['s', 'S', 'l', 'L', 'c', 'C'];

    if (!validLabelTypes.includes(this.type)) {
      this.errors.push(`Invalid Label Type: ${this.name}`);
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