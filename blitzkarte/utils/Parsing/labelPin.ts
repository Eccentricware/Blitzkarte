export class LabelPin {
  type!: string;
  //text!: string;
  province!: string;
  loc!: number[];

  constructor(type: string, province: string, loc: number[]) {
    this.type = type;
    //this.text = text;
    this.province = province;
    this.loc = loc;
  }

  isValidLabel(): boolean {
    let acceptedKeys: string[] = [
      'type',
      //'text',
      'province',
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