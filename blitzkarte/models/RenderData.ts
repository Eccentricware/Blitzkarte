import { City } from "../utils/parsing/classes/city"
import { LabelPin } from "../utils/parsing/classes/label"
import { NodeLink } from "../utils/parsing/classes/nodeLink"
import { NodePin } from "../utils/parsing/classes/node"
import { Terrain } from "../utils/parsing/classes/terrain"
import { Unit } from "../utils/parsing/classes/unit"

export interface RenderData {
  terrain: {
    sea: Terrain[],
    land: Terrain[],
    canal: Terrain[]
    line: Terrain[],
  },
  nodes: {
    display: boolean,
    pins: {
      display: {
        land: boolean,
        sea: boolean,
        air: boolean,
        event: boolean
      },
      land: NodePin[],
      sea: NodePin[],
      air: NodePin[],
      event: NodeLink[]
    },
    links: {
      display: {
        land: boolean,
        sea: boolean,
        air: boolean
      },
      land: NodeLink[],
      sea: NodeLink[],
      air: NodeLink[]
    }
  },
  cities: {
    supplyCenters: City[],
    votingCenters: City[]
  },
  units: Unit[]
  labels: LabelPin[],
}

export const initialRenderData = {
  terrain: {
    sea: [],
    land: [],
    canal: [],
    line: []
  },
  nodes: {
    display: false,
    pins: {
      display: {
        land: true,
        sea: true,
        air: true,
        event: true
      },
      land: [],
      sea: [],
      air: [],
      event: []
    },
    links: {
      display: {
        land: true,
        sea: true,
        air: true
      },
      land: [],
      sea: [],
      air: []
    }
  },
  cities: {
    supplyCenters: [],
    votingCenters: []
  },
  units: [],
  labels: []
}