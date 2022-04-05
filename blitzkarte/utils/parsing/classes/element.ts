export class Element {
  type: string;
  fullString: string;
  errors: string[] = [];

  constructor(elementString: string) {
    this.fullString  = elementString;
    let svgElement: string = elementString.split(' ')[0];

    this.type = this.identifyElementType(svgElement);
  }

  identifyElementType(element: string): string {
    let firstClause: string = element.split(' ')[0];

    switch (firstClause) {
      case 'g':
        return 'province';
      case 'polyline':
        return 'renderElement';
      case 'polygon':
        return 'renderElement';
      case 'circle':
        return 'coordinate';
      case 'line':
        return 'labelLine';
      case '/g':
        return 'finishProvince';
      default:
        return 'other';
    }
  }
}