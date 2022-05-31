// Import the functions you need from the SDKs you need
import { signInWithPopup, GoogleAuthProvider, Auth, AuthProvider, FacebookAuthProvider, sendEmailVerification, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { erzahler } from "../general/erzahler";

export const firebaseConfig = {
  apiKey: "AIzaSyAzSvuv9KUTBeMuIbgcsfdq1Z0FGpCo8ok",
  authDomain: "erzahler-e66cd.firebaseapp.com",
  projectId: "erzahler-e66cd",
  storageBucket: "erzahler-e66cd.appspot.com",
  messagingSenderId: "942058254658",
  appId: "1:942058254658:web:9e5a1bbb61bc7c03c698db",
  measurementId: "G-MJ1H8RKQ57"
};

export class FirebaseService {
  async signUpWithEmail(auth: Auth | null, username: string, email: string, password: string): Promise<any> {
    if (auth) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: UserCredential) => {
          let user = userCredential.user;
          sendEmailVerification(user);
          const idTokenPromise: Promise<string> = user.getIdToken();
          return idTokenPromise.then((idToken: string) => {
            return this.addUserToDatabase(idToken, username);
          });
        })
        .catch((error: Error) => {
          return error.message;
        });
    }
  }

  async addUserToDatabase(idToken: string, username: string): Promise<any> {
    fetch(`${erzahler.url}:${erzahler.port}/register-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idToken: idToken,
        username: username
      }),
    }).then((response: any) => {
      return response.json();
    }).then((data: any) => {
      console.log('User Added to firebase!', data);
    }).catch((error: Error) => {
      console.log('Errorasdfdf', error.message);
    });
  }

  signUpWithGoogle = (auth: Auth | null, username: string) => {
    console.log('Attempting sign in with Google...');

    if (auth) {
      const googleProvider: AuthProvider = new GoogleAuthProvider();
      signInWithPopup(auth, googleProvider)
        .then((userCredential: UserCredential) => {
          const idTokenPromise: Promise<string> = userCredential.user.getIdToken();
          return idTokenPromise.then((idToken: string) => {
            return this.addUserToDatabase(idToken, username);
          });
        }).catch((error: Error) => {
          return error.message
        });
    }
  }

  signUpWithFacebook = (auth: Auth | null, username: string) => {
    console.log('Sign in with Facebook Clicked');

    if (auth) {
      const facebookProvider: AuthProvider = new FacebookAuthProvider();
      signInWithPopup(auth, facebookProvider)
        .then((userCredential: UserCredential) => {
          const idTokenPromise: Promise<string> = userCredential.user.getIdToken();
          return idTokenPromise.then((idToken: string) => {
            return this.addUserToDatabase(idToken, username);
          });
        }).catch((error: Error) => {
          return error.message
        });
    }
  }

  // Guest function. It's not "really" firebase
  checkUsername = (username: string): any => {
    return fetch(`${erzahler.url}:${erzahler.port}/check-username/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((result: any) => {
      return result.json();
    }).then((available: boolean) => {
      return available;
    }).catch((error: Error) => {
      return error.message;
    });
  }
}