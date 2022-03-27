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
    modifier: number
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
        modifier: 1
  }
}