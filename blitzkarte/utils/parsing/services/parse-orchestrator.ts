import { Element } from '../classes/element';
import { Province } from '../classes/province';
import { Pin } from '../classes/pin';
import { City } from '../classes/city';
import { LabelPin } from '../classes/label';
import { NodePin } from '../classes/node';
import { Country } from '../classes/country';
import { Unit } from '../classes/unit';
import { Terrain } from '../classes/terrain';
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
  warnings: string[] = [];
  errors: string[] = [];

  // Rendering
  renderElements: {
    terrain: {
      sea: Terrain[],
      bridge: Terrain[],
      land: Terrain[],
      canal: Terrain[],
      poles: Terrain[],
      impassible: Terrain[]
    },
    cities: {
      supplyCenters: City[],
      votingCenters: City[]
    },
    units: Unit[]
    labels: LabelPin[],
  };

  constructor() {
    // Rendering
    this.renderElements = {
      terrain: {
        sea: [],
        bridge: [],
        land: [],
        canal: [],
        poles: [],
        impassible: []
      },
      cities: {
        supplyCenters: [],
        votingCenters: []
      },
      units: [],
      labels: [],
    }
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
        this.registerElement(newPin, 'nodes');
        if (newNode.unit) {
          let newUnit: Unit = new Unit(newPin, province.country);
          if (newUnit.valid) {
            this.registerElement(newUnit, 'units');
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
        this.registerElement(newLabel, 'labels');
      } else {
        this.collectErrors(newLabel.errors);
      }

    } else if (newPin.pinType === 'city') {
      let newCity = new City(newPin);
      if (newCity.valid) {
        this.registerElement(newCity, 'cities', newCity.renderCategory);
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
      this.registerElement(newTerrain, 'terrain', newTerrain.type);
    } else {
      this.collectErrors(newTerrain.errors);
    }
  }

  finishProvince() {
    this.activeProvince = false;
  }

  registerElement(element: any, elementType: string, renderCategory?: string) {
    this[elementType].push(element);
    this.nameToIndexLibraries[elementType][element.name] = this[elementType].length - 1;
    if (elementType === 'labels' || elementType === 'units') {
      this.renderElements[elementType].push(element);
    } else if (renderCategory) {
      this.renderElements[elementType][renderCategory].push(element);
    }
  }

  paintTerrainOwnerColors() {
    this.terrain.forEach(terrain => {
      let province: Province = this.nameToIndexLibraries.provinces[terrain.province];
      if (province.country) {
        let country = this.nameToIndexLibraries.countries[province.country];
        terrain.setFill(country.color);
      }
    });
  }

  collectErrors(errors: string[]) {
    errors.forEach(error => {
      this.errors.push(error);
    });
  }
}