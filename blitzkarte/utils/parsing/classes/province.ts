import { convertSnakeToCamelCase, convertSnakeToTitleCase } from "../../general/utils";

interface TerrainApproval {
  land: string[];
  sea: string[];
  canal: string[];
  bridge: string[];
  pole: string[];
  impassible: string[];
  decorative: string[];
}

interface NodeApproval {
  event: string[];
  land: string[];
  sea: string[];
  air: string[];
}

interface UnitApproval {
  name: string,
  type: string
}

export class Province {
  name!: string;
  type: string = '';
  city: string | undefined;
  fullName: string | undefined;
  country: string | undefined;
  isTracemap: boolean = false;
  terrainApproval: TerrainApproval = {
    land: [],
    sea: [],
    canal: [],
    bridge: [],
    pole: [],
    impassible: [],
    decorative: []
  };
  nodeApproval: NodeApproval = {
    event: [],
    land: [],
    sea: [],
    air: []
  };
  labelApproval: string[] = [];
  cities: string[] = [];
  unit: UnitApproval[] = [];
  valid: boolean;
  approved: boolean = true;
  errors: string[] = [];

  // Abbreviations
  n: string | undefined; // name
  f: string | undefined; // fullName
  t: string | undefined; // type
  c: string | undefined; // country

  constructor(provinceString: string) {
    let properties = provinceString.split(' ');

    if (properties.length >= 3) {
      let data: string = properties[2];
      let dataArray: string[] = data.slice(11, data.length - 1).split(',');

      dataArray.forEach(property => {
        let properKey: string = property.split('=')[0];
        let value: string = property.split('=')[1];
        this[properKey] = value;
      });

      this.applyAbbreviations();

      if (this.country && this.country.indexOf('_') > 0) {
        this.country = convertSnakeToTitleCase(this.country);
      }

      this.valid = this.validate(provinceString);
      if (this.valid && this.fullName) {
        this.fullName = this.fullName.replace('_', ' ');
      }

    } else {
      this.valid = false;
      if (provinceString.slice(6, provinceString.length - 1) !== 'Tracemap') {
        this.errors.push(`Missing province data for ${provinceString.slice(6, provinceString.length - 1)}`);
      }
    }
  }

  applyAbbreviations() {
    if (this.n) {
      this.name = this.n;
    }

    if (this.f) {
      this.fullName = this.f;
    }

    if (this.t) {
      this.type = this.t;
    }

    if (this.c) {
      this.country = this.c;
    }

    switch(this.type) {
      case 'c':
        this.type = 'coast';
        return;
      case 's':
        this.type = 'sea';
        return;
      case 'i':
        this.type = 'inland';
        return;
      case 'is':
        this.type = 'island';
        return;
      case 'im':
        this.type = 'impassible';
        return;
      case 'd':
        this.type = 'decorative';
        return;
    }
  }

  validate(provinceString: string): boolean {
    let nameValid: boolean = this.validateName(provinceString);
    let typeValid: boolean = this.validateType(provinceString);

    let provinceValid: boolean = nameValid && typeValid;
    return provinceValid;
  }

  validateName(provinceString: string): boolean {
    if (this.name) {
      return true;
    } else {
      this.errors.push(`No Province Name: ${provinceString}`);
      return false;
    }
  }

  validateType(provinceString: string): boolean {
    let validProvinceTypes: string[] = [
      'coast',
      'decorative',
      'impassible',
      'inland',
      'island',
      'pole',
      'sea'
    ];

    if (this.type) {
      if (!validProvinceTypes.includes(this.type.toLowerCase())) {
        this.errors.push(`Invalid Province Type: ${provinceString}`)
        return false;
      }
    } else {
      this.errors.push(`No Province Type: ${provinceString}`);
    }

    return true;
  }

  attemptApproval() {
    let terrainApproved: boolean = this.approveTerrain();
    let nodesApproved: boolean = this.approveNodes();
    let labelsApproved: boolean = this.approveLabels();
    let cityApproved: boolean = this.approveCity();
    let unitApproved: boolean = this.approveUnit();

    this.approved = terrainApproved
      && nodesApproved
      && labelsApproved
      && cityApproved
      && unitApproved;
  }

  approveTerrain(): boolean {
    let terrainApproved: boolean = true;

    let expectsLandTerrain: string[] = ['coast', 'impassible', 'inland', 'island'];
    if (expectsLandTerrain.includes(this.type) && this.terrainApproval.land.length === 0) {
      this.errors.push(`${this.type} province ${this.name} expects at least 1 land terrain`);
      terrainApproved = false;
    }

    let expectsSeaTerrain: string[] = ['island', 'sea'];
    if (expectsSeaTerrain.includes(this.type) && this.terrainApproval.sea.length === 0) {
      this.errors.push(`${this.type} province ${this.name} expects at least 1 sea terrain`);
      terrainApproved = false;
    }

    let expectsNoLandTerrain: string[] = ['pole', 'sea']
    if (expectsNoLandTerrain.includes(this.type) && this.terrainApproval.land.length > 0) {
      this.errors.push(`${this.type} province ${this.name} should not have land terrain`);
      terrainApproved = false;
    }

    let expectsNoSeaTerrain: string[] = ['coast', 'impassible', 'inland', 'pole'];
    if (expectsNoSeaTerrain.includes(this.type) && this.terrainApproval.sea.length > 0) {
      this.errors.push(`${this.type} province ${this.name} should not have sea terrain`);
      terrainApproved = false;
    }

    return terrainApproved;
  }

  approveNodes(): boolean {
    let nodesApproved: boolean = true;

    if (this.type !== 'decorative') {


      if (this.nodeApproval.event.length === 0) {
        this.errors.push(`${this.type} province ${this.name} has no event node`);
        nodesApproved = false;
      } else if (this.nodeApproval.event.length > 1) {
        this.errors.push(`${this.type} province ${this.name} has more than 1 event node`);
        nodesApproved = false;
      }

      let expectsLandNode: string[] = ['coast', 'inland', 'island'];
      if (expectsLandNode.includes(this.type)) {
        if (this.nodeApproval.land.length === 0) {
          this.errors.push(`${this.type} province ${this.name} has no land node`);
          nodesApproved = false;
        } else if (this.nodeApproval.land.length > 1) {
          this.errors.push(`${this.type} province ${this.name} has more than 1 land node`);
          nodesApproved = false;
        }
      }

      let expectsSeaNode: string[] = ['coast', 'island', 'pole', 'sea'];
      if (expectsSeaNode.includes(this.type) && this.nodeApproval.sea.length === 0) {
        this.errors.push(`${this.type} province expects at least 1 sea node`);
        nodesApproved = false;
      }

      if (this.nodeApproval.air.length === 0) {
        this.errors.push(`${this.type} province ${this.name} has no air node`);
        nodesApproved = false;
      } else if (this.nodeApproval.air.length > 1) {
        this.errors.push(`${this.type} province ${this.name} has more than 1 air node`);
        nodesApproved = false;
      }

      let expectsNoLandNode: string[] = ['decorative', 'impassible', 'pole', 'sea'];
      if (expectsNoLandNode.includes(this.type) && this.nodeApproval.land.length > 0) {
        this.errors.push(`${this.type} province ${this.name} should not have a land node`);
        nodesApproved = false;
      }

      let expectsNoSeaNode: string[] = ['decorative', 'impassible', 'inland'];
      if (expectsNoSeaNode.includes(this.type) && this.nodeApproval.land.length > 0) {
        this.errors.push(`${this.type} province ${this.name} should not have a sea node`);
        nodesApproved = false;
      }
    } else {
      if (this.nodeApproval.event.length > 0
      || this.nodeApproval.land.length > 0
      || this.nodeApproval.sea.length > 0
      || this.nodeApproval.air.length > 0) {
        this.errors.push(`${this.type} province ${this.name} has at least one standard node`);
        nodesApproved = false;
      }
    }

    return nodesApproved;
  }

  approveLabels(): boolean {
    let labelsApproved: boolean = true;

    if (this.type !== 'decorative') {
      if (this.labelApproval.length === 0) {
        this.errors.push(`${this.type} province ${this.name} expects at least 1 label`);
        labelsApproved = false;
      }
    } else {
      if (this.labelApproval.length > 0) {
        this.errors.push(`${this.type} province ${this.name} should not have any labels`);
        labelsApproved = false;
      }
    }

    return labelsApproved;
  }

  approveCity(): boolean {
    let cityApproved: boolean = true;

    let noCityExpected: string[] = ['docorative', 'impassible', 'pole', 'sea'];
    if (noCityExpected.includes(this.type) && this.cities.length > 0) {
      this.errors.push(`${this.type} province should not have a city`);
      cityApproved = false;
    }

    if (this.cities.length > 1) {
      this.errors.push(`Province ${this.name} has more than 1 city`);
      cityApproved = false;
    }

    return cityApproved;
  }

  approveUnit(): boolean {
    let unitApproved: boolean = true;

    if (this.type === 'decorative' && this.unit.length > 0) {
      this.errors.push(`${this.type} province ${this.name} should never have a unit. Make province non-decorative or fix the unit's node`);
      unitApproved = false;
    }

    if (this.unit.length > 1) {
      this.errors.push(`More than 1 unit is in ${this.name}`);
      unitApproved = false;
    }

    let noLandUnits: string[] = ['decorative', 'impassible', 'pole', 'sea'];
    if (noLandUnits.includes(this.type)
    && this.unit.length === 1
    && (this.unit[0].type === 'army' || this.unit[0].type === 'nuke')) {
      this.errors.push(`Land unit ${this.unit[0].name} can not occupy ${this.type} province ${this.name}`);
    }

    let noSeaUnits: string[] = ['decorative', 'impassible', 'inland'];
    if (noSeaUnits.includes(this.type)
      && this.unit.length === 1
      && this.unit[0].type === 'fleet') {
      this.errors.push(`Sea unit ${this.unit[0].name} can not occupy ${this.type} province ${this.name}`);
    }

    return unitApproved;
  }
}