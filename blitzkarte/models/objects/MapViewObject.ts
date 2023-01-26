export interface MapViewObject {
  view: {
    panRate: number,
    zoomRate: number,
    default: {
      x: number,
      y: number,
      width: number,
      height: number,
      center: number[]
    },
    current: {
      x: number,
      y: number,
      width: number,
      height: number,
      center: number[]
      zoom: number,
    }
    constraints: {
      left: number,
      right: number,
      top: number,
      bottom: number
    }
  },
  scaling: {
    node: {
      radius: number;
    },
    linkLine: {
      width: number;
      defaultWidth: number;
    },
    label: {
      size: number,
      land: number,
      sea: number,
      coast: number
    },
    unit: number,
    supplyCenter: {
      r: number,
      strokeWidth: number
    },
    orderCircle: {
      r: number,
      strokeWidth: number
    },
    orderLine: {
      strokeWidth: number
    },
    votingCenter: {
      width: number,
      height: number,
      strokeWidth: number
    }
  },
  unitSizing: {
    army: {
      width: number,
      baseWidth: number,
      height: number,
      baseHeight: number,
      modifier: number
    },
    fleet: {
      width: number,
      baseWidth: number,
      height: number,
      baseHeight: number,
      modifier: number
    },
    wing: {
      width: number,
      baseWidth: number,
      height: number,
      baseHeight: number,
      modifier: number
    },
    nuke: {
      width: number,
      baseWidth: number,
      height: number,
      baseHeight: number,
      modifier: number
    },
    detonation: {
      width: number,
      baseWidth: number,
      height: number,
      baseHeight: number,
      modifier: number
    },
    garrison: {
      width: number,
      baseWidth: number,
      height: number,
      baseHeight: number,
      modifier: number
    }
  },
  flagSizing: {
    width: number,
    height: number,
    modifier: number,
    offset: {
      army: {
        x: number,
        y: number
      },
      fleet: {
        x: number,
        y: number
      },
      wing: {
        x: number,
        y: number
      },
      nuke: {
        x: number,
        y: number
      },
      detonation: {
        x: number,
        y: number
      },
      garrison: {
        x: number,
        y: number
      }
    }
  }
}

export const mapViewDefault: MapViewObject = {
  view: {
    zoomRate: 0.8,
    panRate: 0.25,
    default: {
      x: 0,
      y: 0,
      width: 16000,
      height: 10000,
      center: [8000, 5000]
    },
    current: {
      x: 0,
      y: 0,
      width: 16000,
      height: 10000,
      center: [8000, 5000],
      zoom: 1,
    },
    constraints: {
      left: -12000,
      right: 32000,
      top: 0,
      bottom: 10000
    }
  },
  scaling: {
    node: {
      radius: 25
    },
    linkLine: {
      width: 15,
      defaultWidth: 15
    },
    label: {
      size: 100,
      land: 100,
      sea: 100,
      coast: 64
    },
    unit: 145,
    supplyCenter: {
      r: 40,
      strokeWidth: 4
    },
    orderCircle: {
      r: 135,
      strokeWidth: 4
    },
    orderLine: {
      strokeWidth: 20
    },
    votingCenter: {
      width: 160,
      height: 150,
      strokeWidth: 5
    }
  },
  unitSizing: {
    army: {
      width: 291.05,
      height: 265.77,
      baseWidth: 291.05,
      baseHeight: 265.77,
      modifier: 0.5
    },
    fleet: {
      width: 294.66,
      height: 256.8,
      baseWidth: 294.66,
      baseHeight: 256.8,
      modifier: 0.5
    },
    wing: {
      width: 291.8,
      height: 222.97,
      baseWidth: 291.8,
      baseHeight: 222.97,
      modifier: 0.5
    },
    nuke: {
      width: 296.62,
      height: 296.04,
      baseWidth: 296.62,
      baseHeight: 296.04,
      modifier: 0.5
    },
    detonation: {
      width: 300,
      height: 300,
      baseWidth: 300,
      baseHeight: 300,
      modifier: 0.5
    },
    garrison: {
      width: 301.05,
      height: 300.92,
      baseWidth: 301.05,
      baseHeight: 300.92,
      modifier: 0.5
    }
  },
  flagSizing: {
    width: 500,
    height: 300,
    modifier: 1,
    offset: {
      army: {
        x: -50,
        y: -50
      },
      fleet: {
        x: -27,
        y: 15
      },
      wing: {
        x: -50,
        y: -50
      },
      nuke: {
        x: -50,
        y: -50
      },
      detonation: {
        x: -50,
        y: -50
      },
      garrison: {
        x: -50,
        y: -50
      }
    }
  }
}