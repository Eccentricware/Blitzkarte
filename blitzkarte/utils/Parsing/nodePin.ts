export class NodePin {
  name: string;
  province!: string;
  type!: string;
  adj!: string[];
  loc!: number[];

  constructor(name: string, province: string, type: string, adj: string[], loc: number[]) {
    this.name = name;
    this.province = province;
    this.type = type;
    this.adj = adj;
    this.loc = loc;
  }

  isValidNodePin(): boolean {
    let acceptedKeys: string[] = [
      'name',
      'province',
      'type',
      'adj',
      'loc'
    ];

    for (let key in this) {
      if (!acceptedKeys.includes(key)) {
        return false;
      }
    }

    return true;
  }
}