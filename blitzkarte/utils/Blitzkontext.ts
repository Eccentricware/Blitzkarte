import { Auth, User } from 'firebase/auth';
import React from 'react';
import { MapView, mapViewDefault } from '../models/MapView';

interface ContextStructure {
  map: MapView
  setMapView: any,
  firebase:{
    auth: Auth | null;
    user: User | null;
  }
}

export default React.createContext<ContextStructure>({
  map: mapViewDefault,
  setMapView: undefined,
  firebase: {
    auth: null,
    user: null
  }
});