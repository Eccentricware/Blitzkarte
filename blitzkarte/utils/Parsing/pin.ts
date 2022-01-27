export class Pin {
  id: number | undefined;
  name: string | undefined;
  province!: string;
  pinType: string | undefined;
  type!: string;
  nodeType: string | undefined;
  adj: string[] | undefined;
  cityType: string | undefined;
  cityStatus: string | undefined;
  status: string | undefined;
  voteColor: string | undefined;
  statusColor: string | undefined;
  labelType: string | undefined;
  unit: string | undefined;
  text: string | undefined;
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
      'unit',
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