// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider, Auth, AuthProvider, FacebookAuthProvider } from "firebase/auth";
import { useContext } from "react";
import Blitzkontext from "../Blitzkontext";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAzSvuv9KUTBeMuIbgcsfdq1Z0FGpCo8ok",
  authDomain: "erzahler-e66cd.firebaseapp.com",
  projectId: "erzahler-e66cd",
  storageBucket: "erzahler-e66cd.appspot.com",
  messagingSenderId: "942058254658",
  appId: "1:942058254658:web:9e5a1bbb61bc7c03c698db",
  measurementId: "G-MJ1H8RKQ57"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseApp);

export const signInWithGoogle = (auth: Auth | null) => {
  console.log('Attempting sign in with Google...');

  if (auth) {
    const googleProvider: AuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log('credential', credential);
        if (credential) {
          const token = credential.accessToken;
          console.log('token', token);
        }
        // The signed-in user info.
        const user = result.user;
        console.log('user', user);
        return user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('signup error:', error.message);
        return {
          error: error.message
        };
        // ...
      });
  }

}

export const signInWithFacebook = (auth: Auth | null) => {
  console.log('Sign in with Facebook Clicked');

  if (auth) {
    const facebookProvider: AuthProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        console.log('credential', credential);
        if (credential) {
          const token = credential.accessToken;
          console.log('token', token);
        }
        // The signed-in user info.
        const user = result.user;
        console.log('user', user);
        return user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('signup error:', error.message);
        return {
          error: error.message
        };
        // ...
      });
  }
}