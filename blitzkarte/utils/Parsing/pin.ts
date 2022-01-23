export class Pin {
  name: string | undefined;
  province: string | undefined;
  pinType: string | undefined;
  nodeType: string | undefined;
  adj: string[] | undefined;
  cityType: string | undefined;
  voteColor: string | undefined;
  statusColor: string | undefined;
  labelType: string | undefined;
  labelText: string | undefined;
  loc: number[];

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