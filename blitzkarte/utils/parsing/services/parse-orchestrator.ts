import { Element } from '../classes/element';
import { Province } from '../classes/province';
import { Pin } from '../classes/pin';
import { City } from '../classes/city';
import { LabelPin } from '../classes/label';
import { LabelLine } from '../classes/labelLine';
import { NodePin } from '../classes/node';
import { Country } from '../classes/country';
import { Unit } from '../classes/unit';
import { Terrain } from '../classes/terrain';
import { initialRenderData, RenderData } from '../../../models/objects/RenderDataObject';
import { FinalStatusCheck, initialFinalStatusCheck } from '../../../models/objects/FinalStatusCheckObject';
import { NodeLink } from '../classes/nodeLink';
import { CoalitionSchedule, initialOmniBoxData, OmniBoxData } from '../../../models/objects/OmniBoxDataObject';

export class Parser {
  // Logic
  provinces: Province[] = [];
  terrain: Terrain[] = [];
  nodes: NodePin[] = [];
  links: NodeLink[] = [];
  linkNames: string[] = [];
  cities: City[] = [];
  labels: LabelPin[] = [];
  labelLines: LabelLine[] = [];
  countries: Country[] = [];
  coalitionSchedule: CoalitionSchedule = {
    totalVotes: 0,
    baseRequired: 0,
    countriesInCoalition: 3,
    highestCoalition: '',
    rankCounts: {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      g: 0,
    },
    penalties: {
      a: undefined,
      b: undefined,
      c: undefined,
      d: undefined,
      e: undefined,
      f: undefined,
      g: undefined
    },
    highestPenalty: 0
  }
  // For table sorting
  countryNames: string[] = [];
  countryRanks: string[] = [];
  units: Unit[] = [];
  nameToIndexLibraries = {
    provinces: {},
    terrain: {},
    nodes: {},
    links: {},
    cities: {},
    labels: {},
    labelLines: {},
    countries: {},
    units: {},
  }
  dbRows = {
    provinces: {},
    terrain: {},
    nodes: {},
    links: {},
    cities: {},
    labels: {},
    labelLines: {},
    countries: {},
    units: {},

  };
  activeProvince: boolean = false;
  warnings: string[] = [];
  errors: string[] = [];
  criticals: string[] = [];
  finalStatusCheck: FinalStatusCheck = initialFinalStatusCheck;



  // Rendering
  renderElements: RenderData = initialRenderData;

  omniBox: OmniBoxData = initialOmniBoxData;

  constructor() {}

  parse(fileString: string) {
    console.log('Initial:', fileString);
    const minifiedString = fileString.replaceAll(/\>\s+\</g, '><');
    console.log('Minified:', minifiedString);
    const elementStrings : string[] = minifiedString.split('><');
    console.log('Element Strings:', elementStrings);
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
    this.provinceReferences();
    this.countryReferences();
    this.validateProvinces();
    this.validateNodes();
    this.validateCountries();
    this.sortCountries();
    this.setCoalitionSchedule();

    initialOmniBoxData.input.coalitionSchedule = this.coalitionSchedule;
    initialOmniBoxData.debug.warnings = this.warnings;
    initialOmniBoxData.debug.errors = this.errors;
    initialOmniBoxData.debug.criticals = this.criticals;

    // Feedback
    // console.log('Provinces: ', this.provinces);
    // console.log('Nodes:', this.nodes);
    // console.log('Cities', this.cities);
    // console.log('Labels:', this.labels);
    // console.log('Label Lines:', this.labelLines);
    // console.log('Countries:', this.countries);
    // console.log('Units:', this.units);
    // console.log('Name To Index Libraries:', this.nameToIndexLibraries);
    // console.log('Render Elements:', this.renderElements);
    // console.log('Warnings:', this.warnings);
    // console.log('Errors:', this.errors);
    // console.log('Critical:', this.criticals);

    this.prepareDbRows();
  }

  // Save information into their respective classes

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
      case 'labelLine':
        this.parseLabelLine(element.fullString);
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
      this.collectWarnings(province.warnings);
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
          if (province.country) {
            let newUnit: Unit = new Unit(newPin, province.country);
            if (newUnit.valid) {
              this.registerElement(newUnit, 'units', ['units']);
            } else {
              this.collectErrors(newUnit.errors);
            }
          } else {
            this.errors.push(`Unit at ${newPin.name} is in a province not assigned to a country.`);
          }
        }
      } else {
        this.collectErrors(newNode.errors);
      }
      if (newNode.warnings.length > 0) {
        this.collectWarnings(newNode.warnings);
      }
    } else if (newPin.pinType === 'label' && province.type) {
      let newLabel = new LabelPin(newPin, province.type);
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

  parseLabelLine(labelLineString: string) {
    if (!this.activeProvince) {
      let props: string[] = labelLineString.split(' ');
      this.errors.push(`Invalid province association: ${props[0]} ${props[1]}`);
      return;
    }
    let provinceName: string = this.provinces[this.provinces.length - 1].name;
    let newLabelLine = new LabelLine(labelLineString, provinceName);

    if (newLabelLine.valid) {
      this.registerElement(newLabelLine, 'labelLines', ['labelLines']);
    } else {
      this.collectErrors(newLabelLine.errors);
    }
  }

  // General Utilities
  finishProvince() {
    this.activeProvince = false;
  }

  registerElement(element: any, elementType: string, renderPath?: string[]) {
    if (this.nameToIndexLibraries[elementType][element.name]) {
      this.criticals.push(`ELEMENT ${element.name} IS ALREADY REGISTERED!`);
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

    if (element instanceof Country) {
      this.countryNames.push(element.name);
      this.countryRanks.push(element.rank);
    }
  }

  referenceElement(elementType: string, name: string): any {
    let elementIndex: number = this.nameToIndexLibraries[elementType][name];
    return this[elementType][elementIndex];
  }


  collectWarnings(warnings: string[]) {
    warnings.forEach(warning => {
      this.warnings.push(warning);
    });
  }

  collectErrors(errors: string[]) {
    errors.forEach(error => {
      this.errors.push(error);
    });
  }

  collectCriticals(criticals: string[]) {
    criticals.forEach(critical => {
      this.criticals.push(critical);
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
      if (node.adj && node.adj[0] !== 'none' && node.type !== 'event') {
        node.adj.forEach(adjNodeName => {
          if (this.nameToIndexLibraries.nodes[adjNodeName] === undefined) {
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
      province.cityLoc = city.loc;
      switch (city.type) {
        case 'c':
          province.cityType = 'capital';
          province.owner = province.country;
          province.status = 'active';
          this.coalitionSchedule.totalVotes++;
          break;
        case 'v':
          province.cityType = 'vote';
          province.status = 'dormant';
          this.coalitionSchedule.totalVotes++;
          break;
        case 's':
          province.cityType = 'supply';
          province.status = 'active';
          break;
        case 'd':
          province.cityType = 'supply';
          province.status = 'dormant';
          break;
      }
    });
  }

  provinceReferences() {
    this.provinces.forEach(province => {
      if (province.country) {
        let country: Country = this.referenceElement('countries', province.country);
        if (country) {
          country.provinces.push(province.name);
          if (province.cities.length === 1) {
            let city: City = this.referenceElement('cities', province.cities[0]);
            if (city.type === 's' || city.type === 'c') {
              country.cities.push(city.name);
              country.cityCount = country.cities.length;
            }
          }
        } else {
          this.errors.push(`Province ${province.name} country does not exist: ${province.country}`);
        }
      }
    });
  }

  unitReferences() {
    this.units.forEach(unit => {
      let node: NodePin = this.referenceElement('nodes', unit.node);
      let province: Province = this.referenceElement('provinces', node.province);
      const typeCased = unit.type.toLowerCase();
      province.unit.push(unit);
      if (province.country) {
        let country: Country = this.referenceElement('countries', province.country);
        if (country) {
          country.units.push(unit.name);
          country.unitCounts[typeCased]++;
          unit.fullName = `${unit.country} ${unit.type} ${country.unitCounts[typeCased]}`;
        } else {
          this.errors.push(`Unit ${province.name} country does not exist: ${province.country}`);
        }
      }
    });
  }

  countryReferences() {
    this.countries.forEach(country => {
      this.coalitionSchedule.rankCounts[country.rank]++;
    });
  }

  sortCountries() {
    while (this.countryNames.length > 0) {
      let spliceIndex: number = 0;
      let alpha: string = this.countryNames[0];
      let rank: string = this.countryRanks[0];

      for (let countryIndex: number = 0; countryIndex < this.countryNames.length; countryIndex++) {
        if ((this.countryRanks[countryIndex] < rank
          || (this.countryRanks[countryIndex] === rank && this.countryNames[countryIndex] < alpha))) {
          spliceIndex = countryIndex;
          alpha = this.countryNames[countryIndex];
          rank = this.countryRanks[countryIndex];
        }
      }

      this.omniBox.stats.countries.push(this.referenceElement('countries', this.countryNames[spliceIndex]));

      this.countryNames.splice(spliceIndex, 1);
      this.countryRanks.splice(spliceIndex, 1);
    }
  }

  setCoalitionSchedule() {
    if (this.coalitionSchedule.rankCounts['g'] > 0) {
      this.coalitionSchedule.penalties['g'] = 0;
      this.coalitionSchedule.penalties['f'] = 1;
      this.coalitionSchedule.penalties['e'] = 2;
      this.coalitionSchedule.penalties['d'] = 4;
      this.coalitionSchedule.penalties['c'] = 6;
      this.coalitionSchedule.penalties['b'] = 7;
      this.coalitionSchedule.penalties['a'] = 9;

    } else if (this.coalitionSchedule.rankCounts['f'] > 0) {
      this.coalitionSchedule.penalties['f'] = 0;
      this.coalitionSchedule.penalties['e'] = 1;
      this.coalitionSchedule.penalties['d'] = 2;
      this.coalitionSchedule.penalties['c'] = 5;
      this.coalitionSchedule.penalties['b'] = 7;
      this.coalitionSchedule.penalties['a'] = 9;

    } else if (this.coalitionSchedule.rankCounts['e'] > 0) {
      this.coalitionSchedule.penalties['e'] = 0;
      this.coalitionSchedule.penalties['d'] = 1;
      this.coalitionSchedule.penalties['c'] = 3;
      this.coalitionSchedule.penalties['b'] = 6;
      this.coalitionSchedule.penalties['a'] = 9;

    } else if (this.coalitionSchedule.rankCounts['d'] > 0) {
      this.coalitionSchedule.penalties['d'] = 0;
      this.coalitionSchedule.penalties['c'] = 2;
      this.coalitionSchedule.penalties['b'] = 5;
      this.coalitionSchedule.penalties['a'] = 9;

    } else if (this.coalitionSchedule.rankCounts['c'] > 0) {
      this.coalitionSchedule.penalties['c'] = 0;
      this.coalitionSchedule.penalties['b'] = 3;
      this.coalitionSchedule.penalties['a'] = 9;

    } else if (this.coalitionSchedule.rankCounts['b'] > 0) {
      this.coalitionSchedule.penalties['b'] = 0;
      this.coalitionSchedule.penalties['a'] = 9;

    } else {
      this.coalitionSchedule.penalties['a'] = 0;
    }

    this.coalitionSchedule.baseRequired = Math.ceil(this.coalitionSchedule.totalVotes / 2);

    let ranks = Object.keys(this.coalitionSchedule.rankCounts).sort();

    let rankString = '';
    ranks.forEach(rank => {
      if (this.coalitionSchedule.rankCounts[rank] > 0) {
        let rankSubString = '';
        while (rankSubString.length < this.coalitionSchedule.rankCounts[rank]) {
          rankSubString += rank;
        }
        rankString += rankSubString;
      }
    });

    this.coalitionSchedule.highestCoalition = rankString.slice(0, this.coalitionSchedule.countriesInCoalition);
    for (let rankIndex = 0; rankIndex < this.coalitionSchedule.highestCoalition.length; rankIndex++) {
      this.coalitionSchedule.highestPenalty +=
        this.coalitionSchedule.penalties[this.coalitionSchedule.highestCoalition[rankIndex]]!;
    }
  }

  validateProvinces() {
    this.provinces.forEach(province => {
      province.attemptApproval();
      if (!province.approved) {
        this.collectWarnings(province.warnings);
        this.collectErrors(province.errors);
      } else {

      }
    });
  }

  validateNodes() {
    this.nodes.forEach(node => {
      if (!node.valid) {
        this.collectWarnings(node.warnings);
        this.collectErrors(node.errors);
      }
    });
  }

  validateCountries() {
    this.countries.forEach(country => {
      country.approve();
      if (!country.approved) {
        this.collectErrors(country.errors);
        this.collectCriticals(country.critical);
      }
    });
  }

  prepareDbRows() {
    this.countries.forEach((country: Country) => {
      this.dbRows.countries[country.name] = country;
    });

    this.links.forEach((link: any) => {
      this.dbRows.links[link.name] = link;
    });

    this.nodes.forEach((node: NodePin) => {
      this.dbRows.nodes[node.name] = node;
    });

    this.provinces.forEach((province: Province) => {
      this.dbRows.provinces[province.name] = province;
    });

    this.units.forEach((unit: Unit) => {
      if (unit.fullName) {
        this.dbRows.units[unit.fullName] = unit;
      } else {
        this.dbRows.units[unit.name] = unit;
      }
    });

    this.dbRows.terrain = this.terrain;
    this.dbRows.labels = this.labels;
    this.dbRows.labelLines = this.labelLines;
  }
}