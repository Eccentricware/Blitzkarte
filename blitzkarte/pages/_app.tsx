import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Blitzkontext from '../utils/Blitzkontext';
import { useContext, useEffect, useState } from 'react';
import { MapViewObject, mapViewDefault } from '../models/objects/MapViewObject'
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { firebaseConfig } from '../utils/firebase/firebaseService';
import firebase, { initializeApp } from 'firebase/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { initialOmniBoxData } from '../models/objects/OmniBoxDataObject';
import { useAuthState } from 'react-firebase-hooks/auth';
import { LocalizationProvider } from '@mui/x-date-pickers';


function MyApp({ Component, pageProps }: AppProps) {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

  const [mapView, setMapView] = useState<MapViewObject>(mapViewDefault);
  const blitzkontext = useContext(Blitzkontext);

  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  return (
    <Blitzkontext.Provider value={blitzkontext}>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </QueryClientProvider>
    </Blitzkontext.Provider>
  )
}

export default MyApp;