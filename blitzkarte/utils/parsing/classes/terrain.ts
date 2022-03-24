export class Terrain {
  name: string = '';
  province: string | undefined;
  type!: string;
  renderCategory!: string;
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

      if (keyValuePair[0] === 'type') {
        this.setType(keyValuePair[1]);
      }
    });

    this.name = `${this.province}_${this.type}` + this.name;

    this.points = terrain.slice(pointsStartIndex + 8, pointsEndIndex);

    this.valid = this.validate();
  }

  setType(input: string): void {
    let firstLetter: string = input.charAt(0).toLocaleLowerCase();
    switch (firstLetter) {
      case 'l':
        this.type = 'land';
        this.renderCategory = 'land';
        break;
      case 's':
        this.type = 'sea';
        this.renderCategory = 'sea';
        break;
      case 'b':
        this.type = 'bridge';
        this.renderCategory = 'bridge';
        break;
      case 'c':
        this.type = 'canal';
        this.renderCategory = 'canal';
        break;
      case 'p':
        this.type = 'pole';
        this.renderCategory = 'pole';
        break;
      case 'i':
        this.type = 'impassible';
        this.renderCategory = 'impassible';
        break;
      default:
        this.type = 'fail';
        this.renderCategory = 'This does not mean you are a bad person, necessarily'
    }
  }

  validate(): boolean {
    let typeValid: boolean = this.validateType();

    return typeValid;
  }

  validateType(): boolean {
    const validTypes: string[] = ['l', 's', 'b', 'c', 'p', 'i'];

    if (!validTypes.includes(this.type[0].toLowerCase())) {
      this.errors.push(`Invalid Terrain Type: ${this.name}`);
      return false;
    }

    return true;
  }
}