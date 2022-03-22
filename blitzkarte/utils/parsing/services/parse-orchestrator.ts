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
      nodePins: {},
      countries: {},
      units: {},
      labels: {}
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
    console.log('elementStrings', elementStrings);
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
      this.errors.push(`Invalid province association for render data ${coordinateString}`);
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
    }

    // if (newPin.pinType === 'node' && (newPin.name && newPin.adj)) {

    //   if (newPin.valid) {
    //     let newNode = new NodePin(
    //       newPin.name,
    //       province.name,
    //       newPin.type,
    //       newPin.adj,
    //       newPin.loc,
    //     );
    //     this.nodes.push(newNode);
    //   }
    //   if (newPin.name && newPin.adj) {
    //     let newNodePin = new NodePin(
    //       newPin.name,
    //       province.name,
    //       newPin.type,
    //       newPin.adj,
    //       newPin.loc,
    //     );
    //     this.nodePins.push(newNodePin);

    //     if (newPin.unit && province.country) {
    //       let newUnit = new Unit(
    //         newPin.unit,
    //         province.country,
    //         newPin.name
    //       );
    //       this.units.push(newUnit);
    //       this.nameToIndexLibraries.units[newUnit.name] = this.units.length - 1;
    //     }
    //   }
    // } else
    if (newPin.pinType === 'label') {
      let newLabelPin = new LabelPin(
        newPin.type,
        province.name,
        newPin.loc
      );
      this.renderElements.labels.push(newLabelPin);
    } else if (newPin.pinType === 'city') {
      let newCityPin = new City(
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

  collectErrors(errors: string[]) {
    errors.forEach(error => {
      this.errors.push(error);
    });
  }
}