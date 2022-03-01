export class RenderElement {
  province: string | undefined;
  type: string | undefined;
  points: string | undefined;
  fill: string | undefined;
  wrapFactor: number | undefined;
  constructor() {}

  isValidRenderElement(): boolean {
    let acceptedKeys: string[] = [
      'province',
      'type',
      'points',
      'fill'
    ];

    for (let key in this) {
      if (!acceptedKeys.includes(key)) {
        return false;
      }
    }

    return true;
  }
}