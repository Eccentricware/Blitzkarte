import { initializeApp } from 'firebase/app';
import { Auth, getAuth, User } from 'firebase/auth';
import React from 'react';
import { MapView, mapViewDefault } from '../models/MapView';
import { firebaseConfig } from './firebase/firebaseService';

interface ContextStructure {
  map: MapView
  setMapView: any,
  auth: {
    auth: Auth;
  }
}

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export default React.createContext<ContextStructure>({
  map: mapViewDefault,
  setMapView: undefined,
  auth: {
    auth: auth
  }
});