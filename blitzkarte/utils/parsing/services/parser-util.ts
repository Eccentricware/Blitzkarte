import { Element } from '../classes/element';
import { Province } from '../classes/province';
import { Pin } from '../classes/pin';
import { City } from '../classes/city';
import { LabelPin } from '../classes/label';
import { NodePin } from '../classes/node';
import { Country } from '../classes/country';
import { Unit } from '../classes/unit';
import { RenderElement } from '../classes/render-element';
export class Parser {
  // Logic
  provinces: Province[];
  nodes: NodePin[];
  cityPins: City[];
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
      supplyCenters: City[],
      votingCenters: City[]
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
      provinces: {},
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
    let elementStrings : string[] = fileString.split('><');
    elementStrings.forEach(elementString => {
      let element = new Element(elementString);
      this.parseElement(element);
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

  parseElement(element: Element) {
    switch (element.type) {
      case 'province':
        this.parseProvince(element.fullString);
        break;
      case 'renderElement':
        this.parseRenderElement(element.fullString);
        break;
      case 'coordinate':
        this.parseCoordinate(element.fullString);
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
      let dataArray: string[] = data.slice(11, data.length - 1).split(',');

      dataArray.forEach(property => {
        let properKey: string = property.split('=')[0];
        let value: string = property.split('=')[1];
        province[properKey] = value;
      });

      if (province.type) {
        this.activeProvince = true;
        this.provinces.push(province);
        this.nameToIndexLibraries.provinces[province.name] = this.provinces.length - 1;
      }
    } else {
      this.errors.push(`Missing province data for ${provinceString.slice(5, provinceString.length - 1)}`);
    }
  }

  parseCoordinate(coordinateString: string) {
    let province: Province = this.provinces[this.provinces.length - 1];
    let newCoordinate: Pin = new Pin();

      if (newCoordinate.pinType === 'node' && (newCoordinate.name && newCoordinate.adj)) {

        if (newCoordinate.validNode) {
          let newNode = new NodePin(
            newCoordinate.name,
            province.name,
            newCoordinate.type,
            newCoordinate.adj,
            newCoordinate.loc,
          );
          this.nodes.push(newNode);
        }
        if (newCoordinate.name && newCoordinate.adj) {
          let newNodePin = new NodePin(
            newCoordinate.name,
            province.name,
            newCoordinate.type,
            newCoordinate.adj,
            newCoordinate.loc,
          );
          this.nodePins.push(newNodePin);

          if (newCoordinate.unit && province.country) {
            let newUnit = new Unit(
              newCoordinate.unit,
              province.country,
              newCoordinate.name
            );
            this.units.push(newUnit);
            this.nameToIndexLibraries.units[newUnit.name] = this.units.length - 1;
          }
        }
      } else if (newCoordinate.pinType === 'label') {
        let newLabelPin = new LabelPin(
          newCoordinate.type,
          province.name,
          newCoordinate.loc
        );
        this.renderElements.labels.push(newLabelPin);
      } else if (newCoordinate.pinType === 'city') {
        let newCityPin = new City(
          newCoordinate.type,
          province.name,
          newCoordinate.loc
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
      console.log(`Processing render data ${data}`);
      renderElement.type = data.slice(16, data.length - 1);

      let pointIndexStart = renderString.indexOf('points=');
      let pointIndexEnd = renderString.indexOf('\" fill');
      renderElement.points = renderString.slice(pointIndexStart + 8, pointIndexEnd);

      renderElement.wrapFactor = 0;

      this.renderElements.terrain[renderElement.type].push(renderElement);
    } else {
      this.errors.push(`Missing render type for element in ${renderElement.province}`);
    }
  }

  finishProvince() {
    this.activeProvince = false;
  }
}