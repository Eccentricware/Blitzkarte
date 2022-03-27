import React from 'react';
import { MapView, mapViewDefault } from '../models/MapView';

interface ContextStructure {
  mapView: MapView
  setMapView: any
}

export default React.createContext<ContextStructure>({
  mapView: mapViewDefault,
  setMapView: undefined
});