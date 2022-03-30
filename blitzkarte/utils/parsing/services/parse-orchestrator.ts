import { Element } from '../classes/element';
import { Province } from '../classes/province';
import { Pin } from '../classes/pin';
import { City } from '../classes/city';
import { LabelPin } from '../classes/label';
import { NodePin } from '../classes/node';
import { Country } from '../classes/country';
import { Unit } from '../classes/unit';
import { Terrain } from '../classes/terrain';
import { initialRenderData, RenderData } from '../../../models/RenderData';

export class Parser {
  // Logic
  provinces: Province[] = [];
  terrain: Terrain[] = [];
  nodes: NodePin[] = [];
  cities: City[] = [];
  labels: LabelPin[] = [];
  countries: Country[] = [];
  units: Unit[] = [];
  nameToIndexLibraries = {
    provinces: {},
    terrain: {},
    nodes: {},
    cities: {},
    labels: {},
    countries: {},
    units: {}
  }
  activeProvince: boolean = false;
  looseEndNodes: string[] = [];
  warnings: string[] = [];
  errors: string[] = [];

  // Rendering
  renderElements: RenderData = initialRenderData;

  constructor() {}

  parse(fileString: string) {
    let elementStrings : string[] = fileString.split('><');
    elementStrings.forEach(elementString => {
      let element = new Element(elementString);
      this.parseElement(element);
    });

    // 1) Province: fill from controller
    // 2) Units: flagKey from controller
    this.crossReferenceWave1();
    this.validateNodeAdjacencies();

    // Feedback
    //console.log('elementStrings', elementStrings);
    console.log('Provinces: ', this.provinces);
    console.log('Nodes:', this.nodes);
    console.log('Cities', this.cities);
    console.log('Labels:', this.labels);
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
      this.registerElement(province, 'provinces');
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
        this.registerElement(newNode, 'nodes', ['nodes', 'pins', newNode.type]);
        if (newNode.unit) {
          let newUnit: Unit = new Unit(newPin, province.country);
          if (newUnit.valid) {
            this.registerElement(newUnit, 'units', ['units']);
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
        this.registerElement(newLabel, 'labels', ['labels']);
      } else {
        this.collectErrors(newLabel.errors);
      }

    } else if (newPin.pinType === 'city') {
      let newCity = new City(newPin);
      if (newCity.valid) {
        this.registerElement(newCity, 'cities', ['cities', newCity.renderCategory]);
        if (newPin.country) {
          let newCountry = new Country(newPin);
          if (newCountry.valid) {
            this.registerElement(newCountry, 'countries');
          } else {
            this.collectErrors(newCountry.errors);
          }
        }
      } else {
        this.collectErrors(newCity.errors);
      }
    }
  }

  parseRenderElement(terrainString: string) {
    if (!this.activeProvince) {
      const fragments: string[] = terrainString.split(' ');
      this.errors.push(`Invalid province association: ${fragments[0]} ${fragments[1]}`);
      return;
    }
    let provinceName: string = this.provinces[this.provinces.length - 1].name;
    let newTerrain = new Terrain(terrainString, provinceName);

    if (newTerrain.valid) {
      this.registerElement(newTerrain, 'terrain', ['terrain', newTerrain.type]);
    } else {
      this.collectErrors(newTerrain.errors);
    }
  }

  finishProvince() {
    this.activeProvince = false;
  }

  crossReferenceWave1() {
    this.terrainWave1();
    // this.unitWave1();
  }

  terrainWave1() {
    this.renderElements.terrain.land.forEach(land => {
      let province: Province = this.referenceElement('provinces', land.province);
      if (province.country) {
        let country: Country | undefined = this.referenceElement('countries', province.country);
        if (country) {
          land.setFill(country.color);
        } else {
          this.errors.push(`Province ${province.name} country ${province.country} is not created!`);
        }
      }
    });
  }

  validateNodeAdjacencies() {
    this.nodes.forEach(node => {
      if (node.adj) {
        node.adj.forEach(adjNode => {
          if (!this.nodes[adjNode]) {
            this.errors.push(`${node.name}'s adjacent node ${adjNode} does not exist!`);
          } else if (!this.nodes[adjNode].adj.includes(node.name)) {
            this.errors.push(`Node ${adjNode} does not reciprocate ${node.name}'s adjacency!`);
          }
        });
      }
    });
  }

  registerElement(element: any, elementType: string,
      renderPath?: string[],
      // renderCategory?: string, renderSubCategory?: string, renderSubCategory2?: string,
    ) {
    this[elementType].push(element);
    this.nameToIndexLibraries[elementType][element.name] = this[elementType].length - 1;

    let renderProp: any = this.renderElements;
    if (renderPath) {
      renderPath.forEach(level => {
        renderProp = renderProp[level];
      });
      renderProp.push(element);
    }

    // if (renderCategory) {
    //   let renderField = this.renderElements[renderCategory];
    //   if (renderSubCategory) {
    //     renderField = renderField[renderSubCategory];
    //     if (renderSubCategory2) {
    //       renderField = renderField[renderSubCategory2];
    //       renderField.push(element);
    //     } else {
    //       renderField.push(element);
    //     }
    //   } else {
    //     renderField.push(element);
    //   }
    // }
  }

  referenceElement(elementType: string, name: string): any {
    let elementIndex: number = this.nameToIndexLibraries[elementType][name];
    return this[elementType][elementIndex];
  }

  collectErrors(errors: string[]) {
    errors.forEach(error => {
      this.errors.push(error);
    });
  }

  collectWarnings(warnings: string[]) {
    warnings.forEach(warning => {
      this.warnings.push(warning);
    });
  }
}