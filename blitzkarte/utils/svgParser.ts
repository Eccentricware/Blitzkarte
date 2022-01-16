import { Country } from './country';
// Likely Unnecessary During Map Parsing, which is an important detail when parsing the map
import { Unit } from './unit';
import { Province } from './province';
import { Pin } from './pin';
import { RenderElement } from './renderElement';

export class Parser {
  provinces: Province[];
  countries: Country[];
  pins: Pin[];
  renderElements: RenderElement[];
  errors: string[];
  constructor() {
    // Imediate Pull
    this.provinces = [];
    this.countries = [];
    this.pins = [];
    this.renderElements = [];
    this.errors = [];

    // Display

    // DB insert format
  }

  parse(fileString: string) {
    let elements : string[] = fileString.split('><');
    console.log(elements);
    elements.forEach(element => {
      let elementType = this.identifyElementType(element);
      this.parseElement(element, elementType);
    });
    console.log('Provinces are: ', this.provinces);
    console.log('Errors and Warnings:', this.errors);
  }

  identifyElementType(element: string): string {
    let firstClause : string | undefined = element.split(' ')[0];

    switch (firstClause) {
      case 'g':
        return 'province';
      case 'polyline':
        return 'renderElement';
      case 'polygon':
        return 'renderElement';
      case 'circle':
        return 'coordinate';
      case 'text':
        return 'country';
      default:
        return 'other';
    }
  }

  parseElement(element: string, elementType: string) {
    switch (elementType) {
      case 'province':
        this.parseProvince(element);
        break;
    }
  }

  parseProvince(provinceString: string) {
    let province = new Province();

    let provinceProperties = provinceString.split(' ');
    if (provinceProperties.length >= 3) {
      let data: string = provinceString.split(' ')[2];
      let dataArray : string[] = data.slice(11, data.length - 1).split(',');

      dataArray.forEach(property => {
        let properKey : string = property.split('=')[0];
        let value: string = property.split('=')[1];
        // @ts-ignore
        province[properKey] = value;
      });
      if (province.isValidProvince()) {
        this.provinces.push(province);
      } else {
        this.errors.push(`Invalid key detected in province ${province}`);
      }
    } else {
      this.errors.push(`Missing province data for ${provinceString.slice(5, provinceString.length - 1)}`);
    }
  }


}