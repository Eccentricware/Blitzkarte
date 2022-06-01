import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Blitzkontext from '../utils/Blitzkontext';
import { useEffect, useState } from 'react';
import { MapView, mapViewDefault } from '../models/MapView'
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import { firebaseConfig } from '../utils/firebase/firebaseService';
import firebase, { initializeApp } from 'firebase/app';


function MyApp({ Component, pageProps }: AppProps) {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);

  const [mapView, setMapView] = useState<MapView>(mapViewDefault);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(auth.currentUser);
  const [blitzkarteUser, setBlitzkarteUser] = useState<any | null>(null);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user: User | null) => {
  //     console.log('_app Auth state change user', user);
  //     setFirebaseUser(user);
  //   });
  // }, [auth]);

  return (
    <Blitzkontext.Provider value={{
      map: mapView,
      setMapView: setMapView,
      user: {
        auth: auth,
        firebaseUser: firebaseUser,
        blitzkarteUser: blitzkarteUser
      }
    }}>
      <Component {...pageProps} />
    </Blitzkontext.Provider>
  )
}

export default MyApp;