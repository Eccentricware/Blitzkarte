export class Unit {
  type!: string;
  province!: string;
  loc: string[] | undefined;
  country!: string;

  constructor(type: string, country: string, province: string) {
    this.type = type;
    this.country = country;
    this.province = province;
  }
}