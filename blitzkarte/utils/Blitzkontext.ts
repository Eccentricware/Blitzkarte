import { initializeApp } from 'firebase/app';
import { Auth, getAuth, User } from 'firebase/auth';
import React from 'react';
import { MapView, mapViewDefault } from '../models/MapView';
import { initialOmniBoxData } from '../models/OmniBoxData';
import { firebaseConfig } from './firebase/firebaseService';

interface ContextStructure {
  map: MapView
  setMapView: any,
  user: {
    auth: Auth;
    user: User | null;
  },
  newGame: {
    map: any;
    settings: any;
    omniBoxData: any;
  }
}

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default React.createContext<ContextStructure>({
  map: mapViewDefault,
  setMapView: undefined,
  user: {
    auth: auth,
    user: null
  },
  newGame: {
    map: {},
    settings: {},
    omniBoxData: initialOmniBoxData
  }
});