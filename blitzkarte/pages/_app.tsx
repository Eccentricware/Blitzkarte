import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Blitzkontext from '../utils/Blitzkontext';
import { useEffect, useState } from 'react';
import { MapView, mapViewDefault } from '../models/MapView'
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { firebaseConfig } from '../utils/firebase/firebaseService';
import firebase, { initializeApp } from 'firebase/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { initialOmniBoxData } from '../models/OmniBoxData';


function MyApp({ Component, pageProps }: AppProps) {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

  const [mapView, setMapView] = useState<MapView>(mapViewDefault);

  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  return (
    <Blitzkontext.Provider value={{
      map: mapView,
      setMapView: setMapView,
      user: { auth: auth },
      newGame: {
        map: {},
        settings: {},
        omniBoxData: initialOmniBoxData
      }
    }}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </QueryClientProvider>
    </Blitzkontext.Provider>
  )
}

export default MyApp;