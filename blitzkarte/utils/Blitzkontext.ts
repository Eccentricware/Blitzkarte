import { initializeApp } from 'firebase/app';
import { Auth, getAuth, User } from 'firebase/auth';
import React from 'react';
import { MapViewObject, mapViewDefault } from '../models/MapViewObject';
import { initialOmniBoxData } from '../models/OmniBoxDataObject';
import { firebaseConfig } from './firebase/firebaseService';
import { Country } from './parsing/classes/country';
import { LabelPin } from './parsing/classes/label';
import { LabelLine } from './parsing/classes/labelLine';
import { NodePin } from './parsing/classes/node';
import { NodeLink } from './parsing/classes/nodeLink';
import { Province } from './parsing/classes/province';
import { Terrain } from './parsing/classes/terrain';
import { Unit } from './parsing/classes/unit';

interface ContextStructure {
  map: MapViewObject
  user: {
    auth: Auth;
    user?: User | undefined;
  },
  currentGame: {
    id?: number;
  },
  newGame: {
    dbRows: {
      countries: Country[],
      provinces: Province[],
      terrain: Terrain[],
      labels: LabelPin[],
      labelLines: LabelLine[],
      nodes: NodePin[],
      links: NodeLink[],
      units: Unit[]
    },
    settings: any;
    omniBoxData: any;
  }
}

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default React.createContext<ContextStructure>({
  map: mapViewDefault,
  user: {
    auth: auth
  },
  currentGame: {},
  newGame: {
    dbRows: {
      countries: [],
      provinces: [],
      terrain: [],
      labels: [],
      labelLines: [],
      nodes: [],
      links: [],
      units: []
    },
    settings: {},
    omniBoxData: initialOmniBoxData
  }
});

export const globalDefaultGameId = 7;