import { Country } from './country';
import { Unit } from './unit';
import { Province } from './province';
import { Pin } from './pin';

export class Parser {
  constructor() {
    let countries: Country[] = [];
    let units: Unit[] = [];
    let provinces: Province[] = [];
    let pins: Pin[] = [];
  }

  parse(fileString: string) {
    let elements : string[] = fileString.split('><');
    console.log(elements);
    elements.forEach(element => {
      this.processElement(element);

    });
  }

  // identifyElementType(element: string): string {

  //   return elementType;
  // }

  processElement(elementString: string) {
    let elementSignature: string = elementString.split(' ')[0];
    if (elementSignature === 'g') {
      this.prepareProvince(elementString);
    }
  }

  prepareProvince(province: Province) {

  }
}