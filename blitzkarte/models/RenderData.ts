import { City } from "../utils/parsing/classes/city"
import { LabelPin } from "../utils/parsing/classes/label"
import { Link } from "../utils/parsing/classes/link"
import { NodePin } from "../utils/parsing/classes/node"
import { Terrain } from "../utils/parsing/classes/terrain"
import { Unit } from "../utils/parsing/classes/unit"

export interface RenderData {
  terrain: {
    sea: Terrain[],
    land: Terrain[],
    bridge: Terrain[],
    canal: Terrain[]
  },
  nodes: {
    display: boolean,
    pins: {
      display: {
        land: boolean,
        sea: boolean,
        air: boolean
      },
      land: NodePin[],
      sea: NodePin[],
      air: NodePin[]
    },
    links: {
      display: {
        land: boolean,
        sea: boolean,
        air: boolean
      },
      land: NodePin[],
      sea: NodePin[],
      air: NodePin[]
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
    bridge: [],
    canal: []
  },
  nodes: {
    display: false,
    pins: {
      display: {
        land: true,
        sea: true,
        air: true
      },
      land: [],
      sea: [],
      air: []
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