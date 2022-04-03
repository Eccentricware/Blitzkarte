export interface MapView {
  zoom: number,
  unitSizing: {
    army: {
      width: number,
      height: number,
      modifier: number
    },
    fleet: {
      width: number,
      height: number,
      modifier: number
    },
    wing: {
      width: number,
      height: number,
      modifier: number
    },
    nuke: {
      width: number,
      height: number,
      modifier: number
    },
    detonation: {
      width: number,
      height: number,
      modifier: number
    },
    garrison: {
      width: number,
      height: number,
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

export const mapViewDefault = {
  zoom: 1,
    unitSizing: {
    army: {
      width: 291.05,
      height: 265.77,
      modifier: 1
    },
    fleet: {
      width: 294.66,
      height: 256.8,
      modifier: 1
    },
    wing: {
      width: 291.8,
      height: 222.97,
      modifier: 1
    },
    nuke: {
      width: 296.62,
      height: 296.04,
      modifier: 1
    },
    detonation: {
      width: 300,
      height: 300,
      modifier: 1
    },
    garrison: {
      width: 301.05,
      height: 300.92,
      modifier: 1
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