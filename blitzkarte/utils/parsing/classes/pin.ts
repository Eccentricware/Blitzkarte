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
  validNode: boolean | undefined;

  constructor() {
    this.loc = [];
  }

  validateAsNode() {
    this.validNode = true;
  }
}