export class Pin {
  pin: string | undefined;
  node: string | undefined;
  city: string | undefined;
  name: string | undefined;
  province: string | undefined;
  label: string | undefined;
  text: string | undefined;
  loc: number[];
  adj: string[] | undefined;

  constructor() {
    this.loc = [];
  }

  isValidNode(): boolean {
    let acceptedKeys: string[] = [
      'pin',
      'node',
      'city',
      'name',
      'province',
      'label',
      'text',
      'loc',
      'adj'
    ];

    for (let key in this) {
      if (!acceptedKeys.includes(key)) {
        return false;
      }
    }

    return true;
  }

  isValidLabel(): boolean {
    let acceptedKeys: string[] = [
      'name',
      'province',
      'loc',
      'pin',
      'node',
      'adj',
      'city',
      'label',
      'text'
    ];

    for (let key in this) {
      if (!acceptedKeys.includes(key)) {
        return false;
      }
    }

    return true;
  }
}