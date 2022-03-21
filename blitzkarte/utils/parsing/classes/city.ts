export class City {
  type!: string;
  province!: string;
  status!: string;
  loc!: number[];
  voteColor: string | undefined;
  statusColor: string | undefined;

  constructor(type: string, province: string, loc: number[]) {
    this.type = type;
    this.province = province;
    //this.status = status;
    this.loc = loc;

    if (type === 'c') {
      this.voteColor = 'gold';
      this.statusColor = 'gold';
    } else if (type === 'v') {
      this.voteColor = 'red';
      this.statusColor = 'red';
    } else if (type === 's') {
      this.statusColor = 'white';
    } else if (type === 'd') {
      this.statusColor = 'gray';
    }
  }
}