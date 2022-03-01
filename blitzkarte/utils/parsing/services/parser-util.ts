import { Province } from '../classes/province';
import { Pin } from '../classes/pin';
import { CityPin } from '../classes/city-pin';
import { LabelPin } from '../classes/label-pin';
import { NodePin } from '../classes/node-pin';
import { Country } from '../classes/country';
import { Unit } from '../classes/unit';
import { RenderElement } from '../classes/render-element';
// import { City } from './city';

export class Parser {
  // Logic
  provinces: Province[];
  nodes: Node[];
  cityPins: CityPin[];
  labelPins: LabelPin[];
  nodePins: NodePin[];
  countries: Country[];
  units: Unit[];
  nameToIndexLibraries: {
    provinces: {},
    nodes: {},
    cityPins: {},
    labelPins: {},
    nodePins: {},
    countries: {},
    units: {},
    labels: {}
  }
  activeProvince: boolean;
  warnings: string[];
  errors: string[];

  // Rendering
  renderElements: {
    terrain: {
      sea: RenderElement[],
      bridge: RenderElement[],
      land: RenderElement[],
      canal: RenderElement[]
    },
    cities: {
      supplyCenters: CityPin[],
      votingCenters: CityPin[]
    },
    units: Unit[]
    labels: LabelPin[],
  };

  // DB Format


  constructor() {
    // Logic
    this.provinces = [];
    this.nodes = [];
    this.cityPins = [];
    this.labelPins = [];
    this.nodePins = [];
    this.countries = [];
    this.units = [];
    this.nameToIndexLibraries = {
      provinces: { },
      nodes: {},
      cityPins: {},
      labelPins: {},
      nodePins: { },
      countries: { },
      units: { },
      labels: { }
    }
    this.activeProvince = false;
    this.warnings = [];
    this.errors = [];

    // Rendering
    this.renderElements = {
      terrain: {
        sea: [],
        bridge: [],
        land: [],
        canal: []
      },
      cities: {
        supplyCenters: [],
        votingCenters: []
      },
      units: [],
      labels: [],
    }

    // DB Format
  }

  parse(fileString: string) {
    let elements : string[] = fileString.split('><');
    console.log('Elements:', elements);
    elements.forEach(element => {
      let elementType = this.identifyElementType(element);
      this.parseElement(element, elementType);
    });

    // Feedback
    console.log('Provinces: ', this.provinces);
    console.log('Nodes:', this.nodes);
    console.log('CityPins:', this.cityPins);
    console.log('LabelPins:', this.labelPins);
    console.log('NodePins:', this.nodePins);
    console.log('Countries:', this.countries);
    console.log('Units:', this.units);
    console.log('Name To Index Libraries:', this.nameToIndexLibraries);
    console.log('Render Elements:', this.renderElements);
    // console.log('Warnings:', this.warnings);
    console.log('Errors:', this.errors);
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

      if (province.type) {
        this.activeProvince = true;
        this.provinces.push(province);
      }
      this.nameToIndexLibraries.provinces[province.name] = this.provinces.length - 1;
    } else {
      this.errors.push(`Missing province data for ${provinceString.slice(5, provinceString.length - 1)}`);
    }
  }

  parseCoordinate(coordinateString: string) {
    let newPin: Pin = new Pin();
    let coordinateProperties = coordinateString.split(' ');
    if (coordinateProperties.length >= 3 && coordinateString.indexOf('type') > -1) {
      let data: string = coordinateProperties[2];
      let dataArray: string[] = data.slice(11, data.length - 1).split(',');

      dataArray.forEach(property => {
        let properKey: string = property.split('=')[0];
        if (properKey === 'adj') {
          newPin[properKey] = property.split('=')[1].split('/');
        } else {
          newPin[properKey] = property.split('=')[1];
        }
      });

      let x: number = Number(coordinateProperties[3].slice(4, coordinateProperties[3].length - 1));
      let y: number = Number(coordinateProperties[4].slice(4, coordinateProperties[4].length - 1));
      newPin.loc = [x, y];

      let province: Province = this.provinces[this.provinces.length - 1];

      if (newPin.pinType === 'node' && (newPin.name && newPin.adj)) {
        if (newPin.name && newPin.adj) {
          let newNodePin = new NodePin(
            newPin.name,
            province.name,
            newPin.type,
            newPin.adj,
            newPin.loc,
          );
          this.nodePins.push(newNodePin);

          if (newPin.unit && province.country) {
            let newUnit = new Unit(
              newPin.unit,
              province.country,
              newPin.name
            );
            this.units.push(newUnit);
            this.nameToIndexLibraries.units[newUnit.name] = this.units.length - 1;
          }
        }
      } else if (newPin.pinType === 'label') {
        let newLabelPin = new LabelPin(
          newPin.type,
          province.name,
          newPin.loc
        );
        this.renderElements.labels.push(newLabelPin);
      }

      else if (newPin.pinType === 'city') {
        let newCityPin = new CityPin(
          newPin.type,
          province.name,
          newPin.loc
        );

        if (newCityPin.type === 'c' || newCityPin.type === 'v') {
          this.renderElements.cities.votingCenters.push(newCityPin);
        } else if (newCityPin.type === 's' || newCityPin.type === 'd') {
          this.renderElements.cities.supplyCenters.push(newCityPin);
        } else {
          this.errors.push(`Invalid city type detected in ${province.name}`);
        }
      } else {
        this.errors.push(`Invalid Pin at ${coordinateString}}`);
      }

    } else {
      this.errors.push(`Missing pin data for ${coordinateString.slice(5, coordinateString.length - 1)}`);
    }
  }

  parseRenderElement(renderString: string) {
    let renderElement = new RenderElement();
    let renderElementRight = new RenderElement();
    let renderElementLeft = new RenderElement();
    if (this.activeProvince) {
      renderElement.province = this.provinces[this.provinces.length - 1].name;
      renderElementRight.province = renderElement.province;
      renderElementLeft.province = renderElement.province;
    } else {
      this.errors.push(`Invalid province association for render data ${renderString}`);
      return;
    }

    let renderProperties = renderString.split(' ');
    let data: string = renderString.split(' ')[2];

    if (renderProperties.length >= 3) {
      console.log(`Processing render data ${data}`);
      renderElement.type = data.slice(16, data.length - 1);

      let pointIndexStart = renderString.indexOf('points=');
      let pointIndexEnd = renderString.indexOf('\" fill');
      renderElement.points = renderString.slice(pointIndexStart + 8, pointIndexEnd);
      renderElementRight.points = renderElement.points;
      renderElementLeft.points = renderElement.points;

      renderElement.wrapFactor = 0;
      renderElementRight.wrapFactor = 1;
      renderElementLeft.wrapFactor = -1;

      this.renderElements.terrain[renderElement.type].push(renderElement);
      this.renderElements.terrain[renderElement.type].push(renderElementRight);
      this.renderElements.terrain[renderElement.type].push(renderElementLeft);
    } else {
      this.errors.push(`Missing render type for element in ${renderElement.province}`);
    }
  }

  finishProvince() {
    this.activeProvince = false;
  }
}