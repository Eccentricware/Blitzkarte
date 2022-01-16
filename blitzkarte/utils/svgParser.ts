import { Country } from './country';
// Likely Unnecessary During Map Parsing, which is an important detail when parsing the map
import { Unit } from './unit';
import { Province } from './province';
import { Pin } from './pin';
import { RenderElement } from './renderElement';

export class Parser {
  provinces: Province[];
  countries: {};
  pins: Pin[];
  renderElements: {
    sea: RenderElement[],
    land: RenderElement[],
    bridge: RenderElement[],
    canal: RenderElement[]
  };
  errors: string[];
  activeProvince: boolean;
  constructor() {
    // Imediate Pull
    this.provinces = [];
    this.countries = {};
    this.pins = [];
    this.renderElements = {
      sea: [],
      land: [],
      bridge: [],
      canal: []
    }
    this.errors = [];
    this.activeProvince = false;

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
    //this.colorLand();
    console.log('Provinces: ', this.provinces);
    console.log('Render Elements:', this.renderElements);
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
      case '/g':
        return 'finishProvince';
      default:
        return 'other';
    }
  }

  parseElement(element: string, elementType: string) {
    switch (elementType) {
      case 'province':
        this.parseProvince(element);
        break;
      case 'renderElement':
        this.parseRenderElement(element);
        break;
      case 'finishProvince':
        this.finishProvince();
        break;
      default:
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
        // @ts-ignore
        this.provinces.push(province);
        this.activeProvince = true;
      } else {
        this.errors.push(`Invalid property detected in province ${province}`);
      }
    } else {
      this.errors.push(`Missing province data for ${provinceString.slice(5, provinceString.length - 1)}`);
    }
  }

  parseRenderElement(renderString: string) {
    let renderElement = new RenderElement();
    if (this.activeProvince) {
      renderElement.province = this.provinces[this.provinces.length - 1].name;
    } else {
      this.errors.push(`Invalid province association for render data ${renderString}`);
      return;
    }

    let renderProperties = renderString.split(' ');

    let data: string = renderString.split(' ')[2];


    if (renderProperties.length >= 3) {
      renderElement.type = data.slice(16, data.length - 1);

      let pointIndexStart = renderString.indexOf('points=');
      let pointIndexEnd = renderString.indexOf('\" fill');
      renderElement.points = renderString.slice(pointIndexStart + 8, pointIndexEnd);

      console.log(`trying to use key ${renderElement.type}`);
      console.log(renderElement);

      // @ts-ignore
      this.renderElements[renderElement.type].push(renderElement);
    } else {
      this.errors.push(`Missing render type for element in ${renderElement.province}`);
    }

    console.log(renderElement);
  }

  finishProvince() {
    this.activeProvince = false;
  }

  // colorLand() {
  //   this.renderElements.land.forEach(land => {
  //     // @ts-ignore
  //     if (this.provinces[land.province].country && land.province) {
  //       // @ts-ignore
  //       let country: string = this.provinces[land.province].country;
  //       // @ts-ignore
  //       land.fill = this.countries[country].fill;
  //     }
  //   });
  // }
}