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
  cities: City[];
  labels: LabelPin[];
  countries: Country[];
  units: Unit[];
  nameToIndexLibraries: {
    provinces: {},
    nodes: {},
    cities: {},
    labels: {},
    countries: {},
    units: {}
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
    this.cities = [];
    this.labels = [];
    //this.nodePins = [];
    this.countries = [];
    this.units = [];
    this.nameToIndexLibraries = {
      provinces: {},
      nodes: {},
      cities: {},
      labels: {},
      //nodePins: {},
      countries: {},
      units: {}
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
    //console.log('elementStrings', elementStrings);
    console.log('Provinces: ', this.provinces);
    console.log('Nodes:', this.nodes);
    console.log('CityPins:', this.cities);
    console.log('LabelPins:', this.labels);
    //console.log('NodePins:', this.nodePins);
    console.log('Countries:', this.countries);
    console.log('Units:', this.units);
    console.log('Name To Index Libraries:', this.nameToIndexLibraries);
    console.log('Render Elements:', this.renderElements);
    //console.log('Warnings:', this.warnings);
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
    let province = new Province(provinceString);

    if (province.valid) {
      this.activeProvince = true;
      this.provinces.push(province);
      this.nameToIndexLibraries.provinces[province.name] = this.provinces.length - 1;
    } else {
      this.collectErrors(province.errors);
    }
  }

  parseCoordinate(coordinateString: string) {
    if (!this.activeProvince) {
      let props: string[] = coordinateString.split(' ');
      this.errors.push(`Invalid province association: ${props[0]} ${props[1]}`);
      return;
    }

    let province: Province = this.provinces[this.provinces.length - 1];
    let newPin: Pin = new Pin(coordinateString, province.name);

    if (!newPin.valid) {
      this.collectErrors(newPin.errors);
      return;
    }

    if (newPin.pinType === 'node') {
      let newNode: NodePin = new NodePin(newPin);
      if (newNode.valid) {
        this.nodes.push(newNode);
        this.nameToIndexLibraries.nodes[newNode.name] = this.nodes.length - 1;
        if (newNode.unit) {
          let newUnit: Unit = new Unit(newNode, province.country);
          if (newUnit.valid) {
            this.units.push(newUnit);
            this.nameToIndexLibraries.units[newUnit.name] = this.units.length - 1;
          } else {
            this.collectErrors(newUnit.errors);
          }
        }
      } else {
        this.collectErrors(newNode.errors);
      }
    } else if (newPin.pinType === 'label') {
      let newLabel = new LabelPin(newPin);
      if (newLabel.valid) {
        this.labels.push(newLabel);
        this.renderElements.labels.push(newLabel);
        this.nameToIndexLibraries.labels[newLabel.name] = this.labels.length - 1;
      } else {
        this.collectErrors(newLabel.errors);
      }
    } else if (newPin.pinType === 'city') {
      let newCity = new City(newPin);
      if (newCity.valid) {
        this.cities.push(newCity);
        this.nameToIndexLibraries.cities[newCity.name] = this.cities.length - 1;
        if (newCity.renderCategory === 'votingCenter') {
          this.renderElements.cities.votingCenters.push(newCity);
        } else {
          this.renderElements.cities.supplyCenters.push(newCity);
        }
      } else {
        this.collectErrors(newCity.errors);
      }
    }
  }

  parseRenderElement(renderString: string) {
    let renderElement = new RenderElement();
    if (this.activeProvince) {
      renderElement.province = this.provinces[this.provinces.length - 1].name;
    } else {
      const props: string[] = renderString.split(' ');
      this.errors.push(`Invalid province association: ${props[0]} ${props[1]}`);
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

  collectErrors(errors: string[]) {
    errors.forEach(error => {
      this.errors.push(error);
    });
  }
}