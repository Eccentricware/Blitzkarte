import { Auth, User } from 'firebase/auth';
import React from 'react';
import { MapView, mapViewDefault } from '../models/MapView';

interface ContextStructure {
  map: MapView
  setMapView: any,
  user:{
    auth: Auth | null;
    firebaseUser: User | null;
    blitzkarteUser: any | null;
  }
}

export default React.createContext<ContextStructure>({
  map: mapViewDefault,
  setMapView: undefined,
  user: {
    auth: null,
    firebaseUser: null,
    blitzkarteUser: null
  }
});