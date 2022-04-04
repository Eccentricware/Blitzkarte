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
import { FinalStatusCheck, initialFinalStatusCheck } from '../../../models/FinalStatusCheck';
import Link from 'next/link';
import { NodeLink } from '../classes/nodeLink';

export class Parser {
  // Logic
  provinces: Province[] = [];
  terrain: Terrain[] = [];
  nodes: NodePin[] = [];
  links: NodeLink[] = [];
  linkNames: string[] = [];
  cities: City[] = [];
  labels: LabelPin[] = [];
  countries: Country[] = [];
  units: Unit[] = [];
  nameToIndexLibraries = {
    provinces: {},
    terrain: {},
    nodes: {},
    links: {},
    cities: {},
    labels: {},
    countries: {},
    units: {}
  }
  activeProvince: boolean = false;
  warnings: string[] = [];
  errors: string[] = [];
  critical: string[] = [];
  finalStatusCheck: FinalStatusCheck = initialFinalStatusCheck;



  // Rendering
  renderElements: RenderData = initialRenderData;

  constructor() {}

  parse(fileString: string) {
    let elementStrings : string[] = fileString.split('><');
    elementStrings.forEach(elementString => {
      let element = new Element(elementString);
      this.parseElement(element);
    });

    // Registers terrain on province
    // Assigns controller country color to fill value
    this.terrainReferences();
    this.nodeReferences();
    this.labelReferences();
    this.cityReferences();
    this.unitReferences();
    this.validateProvinces();

    // Feedback
    console.log('Provinces: ', this.provinces);
    console.log('Nodes:', this.nodes);
    console.log('Cities', this.cities);
    console.log('Labels:', this.labels);
    console.log('Countries:', this.countries);
    console.log('Units:', this.units);
    console.log('Name To Index Libraries:', this.nameToIndexLibraries);
    console.log('Render Elements:', this.renderElements);
    //console.log('Warnings:', this.warnings);
    console.log('Errors:', this.errors);
    console.log('Critical:', this.critical);
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
        if (newNode.type !== 'other' && newNode.type !== 'o') {
          this.registerElement(newNode, 'nodes', ['nodes', 'pins', newNode.type]);
        } else {
          this.registerElement(newNode, 'nodes');
        }
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
      this.registerElement(newTerrain, 'terrain', ['terrain', newTerrain.renderCategory]);
    } else {
      this.collectErrors(newTerrain.errors);
    }
  }

  finishProvince() {
    this.activeProvince = false;
  }



  registerElement(element: any, elementType: string, renderPath?: string[]) {
    if (this.nameToIndexLibraries[elementType][element.name]) {
      this.critical.push(`ELEMENT ${element.name} IS ALREADY REGISTERED!`);
    }
    this[elementType].push(element);
    this.nameToIndexLibraries[elementType][element.name] = this[elementType].length - 1;

    let renderProp: any = this.renderElements;
    if (renderPath) {
      renderPath.forEach(level => {
        renderProp = renderProp[level];
      });
      renderProp.push(element);
    }
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

  terrainReferences() {
    this.terrain.forEach(terrain => {
      let province: Province = this.referenceElement('provinces', terrain.province);
      province.terrainApproval[terrain.type].push(terrain.name);
      if (terrain.type === 'land' && province.country) {
        let country: Country | undefined = this.referenceElement('countries', province.country);
        if (country) {
          terrain.setFill(country.color);
        } else {
          this.errors.push(`Province ${province.name} country ${province.country} is not created!`);
        }
      }
    });
  }

  nodeReferences() {
    this.nodes.forEach(node => {
      let province: Province = this.referenceElement('provinces', node.province);
      province.nodeApproval[node.type].push(node.name);
      if (node.adj) {
        node.adj.forEach(adjNodeName => {
          if (!this.nameToIndexLibraries.nodes[adjNodeName]) {
            this.errors.push(`${node.name}'s adjacent node ${adjNodeName} does not exist!`);
            node.revokeApproval();
          } else {
            let adjNode: NodePin = this.referenceElement('nodes', adjNodeName);
            let newNodeLink: NodeLink = new NodeLink(node, adjNode);
            if (adjNode.adj?.includes(node.name)) {
              if (!this.linkNames.includes(newNodeLink.name)) {
                this.registerElement(newNodeLink, 'links', ['nodes', 'links', newNodeLink.type]);
                this.linkNames.push(newNodeLink.name);
              }
            } else {
              node.revokeApproval();
              newNodeLink.setStroke('red');
              this.registerElement(newNodeLink, 'links', ['nodes', 'links', newNodeLink.type]);
              this.errors.push(`Node ${adjNode.name} does not reciprocate ${node.name}'s adjacency!`);
            }
          }
        });

        if (node.approved) {
          this.finalStatusCheck.nodes.pass.push(node.name);
        } else {
          this.finalStatusCheck.nodes.fail.push(node.name);
        }
      }
    });
  }

  labelReferences() {
    this.labels.forEach(label => {
      let province: Province = this.referenceElement('provinces', label.province);
      province.labelApproval.push(label.name);
    });
  }

  cityReferences() {
    this.cities.forEach(city => {
      let province: Province = this.referenceElement('provinces', city.province);
      province.cities.push(city.name);
    })
  }

  unitReferences() {
    this.units.forEach(unit => {
      let node: NodePin = this.referenceElement('nodes', unit.node);
      let province: Province = this.referenceElement('provinces', node.province);
      province.unit.push({
        name: unit.name,
        type: unit.type
      });
    });
  }

  validateProvinces() {
    this.provinces.forEach(province => {
      province.attemptApproval();
      if (!province.approved) {
        this.collectErrors(province.errors);
      }
    });
  }
}