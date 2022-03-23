import { Pin } from "./pin";

export class LabelPin {
  name: string;
  type!: string;
  text!: string | undefined;
  province!: string;
  loc!: number[];
  valid: boolean;
  errors: string[] = [];

  constructor(pin: Pin) {
    this.type = pin.type[0].toLowerCase();


    this.text = pin.text ? pin.text : pin.province;
    this.name = `${pin.province}_label_${this.text}`;
    this.province = pin.province;
    this.loc = pin.loc;

    this.valid = this.validate();
  }

  validate(): boolean {
    const typeValid: boolean = this.validateType();
    const textValid: boolean = this.validateText();

    return typeValid && textValid;
  }

  validateType(): boolean {
    const validLabelTypes: string[] = ['s', 'l', 'c'];

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