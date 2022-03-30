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
    land: {
      display: boolean,
      pins: NodePin[],
      links: Link[]
    },
    sea: {
      display: boolean,
      pins: NodePin[],
      links: Link[]
    },
    air: {
      display: boolean,
      pins: NodePin[],
      links: Link[]
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
    land: {
      display: true,
      pins: [],
      links: []
    },
    sea: {
      display: true,
      pins: [],
      links: []
    },
    air: {
      display: true,
      pins: [],
      links: []
    }
  },
  cities: {
    supplyCenters: [],
    votingCenters: []
  },
  units: [],
  labels: []
}