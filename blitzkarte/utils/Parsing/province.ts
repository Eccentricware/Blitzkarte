export class Province {
  name : string | undefined;
  fullName: string | undefined;
  terrain: string | undefined;
  city: string | undefined;
  country: string | undefined;
  unit: string | undefined;
  nuke: number | undefined;
  constructor() {}

  isValidProvince(): boolean {
    let acceptedKeys: string[] = [
      'name',
      'fullName',
      'terrain',
      'city',
      'country',
      'unit',
      'nuke'
    ];

    for (let key in this) {
      if (!acceptedKeys.includes(key)) {
        return false;
      }
    }

    return true;
  }
}