export class Pin {
  pinType: string | undefined;
  nodeType: string | undefined;
  name: string | undefined;
  province: string | undefined;
  labelType: string | undefined;
  text: string | undefined;
  loc: number[];
  adj: string[] | undefined;

  constructor() {
    this.loc = [];
  }

  isValidNode(): boolean {
    let acceptedKeys: string[] = [
      'pinType',
      'nodeType',
      'name',
      'province',
      'labelType',
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
      'pinType',
      'nodeType',
      'name',
      'province',
      'labelType',
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
}