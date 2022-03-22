import { Pin } from "./pin";

export class NodePin {
  name?: string;
  province!: string;
  type!: string;
  adj!: string[];
  loc!: number[];

  constructor(pin: Pin) {
    //this.name = pin.name +
    console.log('pin', pin);
  }
}