// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(firebaseApp);