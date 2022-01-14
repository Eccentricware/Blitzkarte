import { BKNode } from './bknode';

export class Province {
  provinceName : string | undefined;
  provinceType : string | undefined;
  voteType : string | undefined;
  controllerName : string | undefined;
  labelLoc : string | undefined;
  landNode : BKNode | undefined;
  seaNode1 : BKNode | undefined;
  seaNode2 : BKNode | undefined;
  airNode : BKNode | undefined;
  irLoc : string | undefined;
  unit : string | undefined;

  constructor() {}
}