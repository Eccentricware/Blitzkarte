import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Blitzkontext from '../utils/Blitzkontext';
import { useState } from 'react';
import { MapView, mapViewDefault } from '../models/MapView'


function MyApp({ Component, pageProps }: AppProps) {
  const [mapView, setMapView] = useState<MapView>(mapViewDefault);

  return (
    <Blitzkontext.Provider value={{
      map: mapView,
      setMapView: setMapView
    }}>
      <Component {...pageProps} />
    </Blitzkontext.Provider>
  )
}

export default MyApp;