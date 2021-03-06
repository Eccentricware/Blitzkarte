import { initializeApp } from 'firebase/app';
import { Auth, getAuth, User } from 'firebase/auth';
import React from 'react';
import { MapView, mapViewDefault } from '../models/MapView';
import { firebaseConfig } from './firebase/firebaseService';

interface ContextStructure {
  map: MapView
  setMapView: any,
  user: {
    auth: Auth;
  },
  newGame: {
    map: any;
    settings: any;
  }
}

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default React.createContext<ContextStructure>({
  map: mapViewDefault,
  setMapView: undefined,
  user: {
    auth: auth
  },
  newGame: {
    map: {},
    settings: {}
  }
});