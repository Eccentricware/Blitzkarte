import { Country } from './country';
import { Unit } from './unit';
import { Province } from './province';
import { Pin } from './pin';
import { RenderElement } from './renderElement';

export class Parser {
  provinces: Province[];
  countries: Country[];
  nodes: Pin[];
  renderElements: {
    terrain: {
      sea: RenderElement[],
      land: RenderElement[],
      bridge: RenderElement[],
      canal: RenderElement[]
    },
    labels: Pin[],
    units: Unit[]
  };
  errors: string[];
  activeProvince: boolean;
  constructor() {
    // Imediate Pull
    this.provinces = [];
    this.countries = [];
    this.nodes = [];
    this.renderElements = {
      terrain: {
        sea: [],
        land: [],
        bridge: [],
        canal: []
      },
      labels: [],
      units: []
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
    console.log('Nodes:', this.nodes);
    console.log('Countries:', this.countries);
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
      case 'coordinate':
        this.parseCoordinate(element);
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
      let data: string = provinceProperties[2];
      let dataArray : string[] = data.slice(11, data.length - 1).split(',');

      dataArray.forEach(property => {
        let properKey : string = property.split('=')[0];
        let value: string = property.split('=')[1];
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

  parseCoordinate(coordinateString: string) {
    let newPin: Pin = new Pin();
    let coordinateProperties = coordinateString.split(' ');
    if (coordinateProperties.length >= 3) {
      let data: string = coordinateProperties[2];
      let dataArray: string[] = data.slice(11, data.length - 1).split(',');
      console.log('Coordinate Data:', data);
      console.log('Coordinate Data Array:', dataArray);

      dataArray.forEach(property => {
        let properKey: string = property.split('=')[0];
        if (properKey === 'adj') {
          newPin[properKey] = property.split('=')[1].split('/');
        } else {
          newPin[properKey] = property.split('=')[1];
        }
      });

      let x: number = Number(coordinateProperties[3].slice(5, coordinateProperties[3].length - 1));
      let y: number = Number(coordinateProperties[4].slice(5, coordinateProperties[4].length - 1));
      newPin.loc = [x, y];

      console.log('Pin at type check', newPin);
      if (newPin.pinType === 'node') {
        if (newPin.isValidNode()) {
          this.nodes.push(newPin);
        } else {
          this.errors.push(`Invalid Node: ${newPin}`);
        }
      } else if (newPin.pinType === 'label') {
        if (newPin.isValidLabel()) {
          newPin.text = this.provinces[this.provinces.length - 1].name;
          this.renderElements.labels.push(newPin);
        } else {
          console.log('Invalid Label:', newPin);
          this.errors.push(`Invalid Label: ${newPin}`);
        }
      } else {
        this.errors.push(`Invalid Pin: ${newPin}`);
      }

    } else {
      this.errors.push(`Missing pin data for ${coordinateString.slice(5, coordinateString.length - 1)}`);
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

      // @ts-ignore
      this.renderElements.terrain[renderElement.type].push(renderElement);
    } else {
      this.errors.push(`Missing render type for element in ${renderElement.province}`);
    }
  }

  finishProvince() {
    this.activeProvince = false;
  }
}