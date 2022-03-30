export class Link {
  name: string;
  origin: {
    x: number,
    y: number
  };
  destination: {
    x: number,
    y: number
  };
  stroke: string;

  constructor() {
    this.name = '';
    this.origin = {
      x: 0,
      y: 0
    };
    this.destination = {
      x: 0,
      y: 0
    };
    this.stroke = '#ffffff';
  }
}