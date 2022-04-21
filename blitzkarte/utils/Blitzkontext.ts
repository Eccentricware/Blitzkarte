import React from 'react';
import { MapView, mapViewDefault } from '../models/MapView';

interface ContextStructure {
  map: MapView
  setMapView: any
}

export default React.createContext<ContextStructure>({
  map: mapViewDefault,
  setMapView: undefined
});