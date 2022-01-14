import { Province } from './province';
import { BKNode } from './bknode';

export class Parser {
  constructor() {
    interface Province {
      name?: string | undefined;
      provinceType?: string | undefined;
      voteType?: string | undefined;
      controllerName?: string | undefined;
      unit?: string | undefined;
    }

    let provinces = [];
    let correntProvince : Province | undefined = {}

    let provinceName;
    let provinceType;
    let voteType;
    let controllerName;
    let labelLoc;
    let landNodeLoc;
    let seaNodeLoc1;
    let seaNodeLoc2;
    let airNodeLoc;
    let irLoc;
    let unit;
  }

  parse(fileString: string) {
    let currentProvince = new Province();
    currentProvince.provinceName = 'SVG';
    let currentNode = new BKNode('ABC', 'Land', [0, 0], ['BCD', 'ECF']);
    currentProvince.landNode = currentNode;
    console.log(currentProvince);
    let elements : string[] = this.splitBrackets(fileString);
    console.log(elements);
    elements.forEach(element => {
      //console.log('Full:', element);
      let elementType: string = this.identifyElementType(element);
      //console.log('Type:', elementType);
    });
  }

  splitBrackets(fileString: string): string[] {
    let elementsArray : string[] = fileString.split('><');
    return elementsArray;
  }

  identifyElementType(element: string): string {
    let elementType: string = element.split(' ')[0];
    return elementType;
  }

  // identifyElementName(element: string): string {
  //     let elementName: string = element.split(' ')[2];
  //     elementName = elementName.slice(9);
  //     return elementName;
  // }
}