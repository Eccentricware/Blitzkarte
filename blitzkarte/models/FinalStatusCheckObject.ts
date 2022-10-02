export interface FinalStatusCheck {
  provinces: {
    pass: string[],
    fail: string[]
  };
  terrain: {
    pass: string[],
    fail: string[]
  };
  nodes: {
    pass: string[],
    fail: string[]
  };
  links: {
    pass: string[],
    fail: string[]
  }
  cities: {
    pass: string[],
    fail: string[]
  };
  labels: {
    pass: string[],
    fail: string[]
  };
  countries: {
    pass: string[],
    fail: string[]
  };
  units: {
    pass: string[],
    fail: string[]
  };
}

export const initialFinalStatusCheck = {
  provinces: {
    pass: [],
    fail: []
  },
  terrain: {
    pass: [],
    fail: []
  },
  nodes: {
    pass: [],
    fail: []
  },
  links: {
    pass: [],
    fail: []
  },
  cities: {
    pass: [],
    fail: []
  },
  labels: {
    pass: [],
    fail: []
  },
  countries: {
    pass: [],
    fail: []
  },
  units: {
    pass: [],
    fail: []
  }
}