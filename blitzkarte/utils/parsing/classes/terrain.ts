export class Terrain {
  name: string = '';
  province: string | undefined;
  type!: string;
  points: string | undefined;
  fill: string | undefined;
  valid: boolean;
  errors: string[] = [];

  constructor(terrain: string, provinceName: string) {
    this.province = provinceName;

    let dataStartIndex: number = terrain.indexOf('data-name');
    let pointsStartIndex: number = terrain.indexOf('points');
    let pointsEndIndex: number = terrain.indexOf('\" fill');



    let dataArray: string[] = terrain.slice(dataStartIndex + 11, pointsStartIndex - 2).split(',');
    dataArray.forEach(property => {
      let keyValuePair: string[] = property.split('=');
      this[keyValuePair[0]] = keyValuePair[1];

      if (keyValuePair[0] === '#') {
        this.name += ` ${keyValuePair[1]}`;
      }
    });

    this.name = `${this.province}_${this.type}` + this.name;

    this.points = terrain.slice(pointsStartIndex + 8, pointsEndIndex);

    this.valid = this.validate();
  }

  validate(): boolean {
    let typeValid: boolean = this.validateType();

    return typeValid;
  }

  validateType(): boolean {
    const validTypes: string[] = ['l', 's', 'b', 'c', 'p', 'o'];

    if (!validTypes.includes(this.type[0].toLowerCase())) {
      this.errors.push(`Invalid Terrain Type: ${this.name}`);
      return false;
    }

    return true;
  }
}