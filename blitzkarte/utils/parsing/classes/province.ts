export class Province {
  name!: string;
  type: string | undefined;
  city: string | undefined;
  fullName: string | undefined;
  country: string | undefined;
  isTracemap: boolean = false;
  valid: boolean;
  errors: string[] = [];
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

      this.valid = this.validate(provinceString);

    } else {
      this.valid = false;
      if (provinceString.slice(5, provinceString.length - 1) !== 'Tracemap') {
        this.errors.push(`Missing province data for ${provinceString.slice(5, provinceString.length - 1)}`);
      }
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
      'fogland',
      'fogwater',
      'fogOther',
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
}