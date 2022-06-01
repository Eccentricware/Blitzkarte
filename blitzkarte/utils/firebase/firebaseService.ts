// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider, Auth, AuthProvider, FacebookAuthProvider, sendEmailVerification, createUserWithEmailAndPassword, UserCredential, User, getAuth, onAuthStateChanged } from "firebase/auth";
import router from "next/router";
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
  async authenticateUser(): Promise<boolean> {
    return true;
  }

  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(this.firebaseApp);

  verifyUser() {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        return user.getIdToken();
      } else {
        router.push('/');
      }
    });
  }

  async signUpWithEmail(auth: Auth, username: string, email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        let user = userCredential.user;
        // const idTokenPromise: Promise<string> = user.getIdToken();
        // return idTokenPromise.then((idToken: string) => {
        //   const successResponse: any = this.addUserToDatabase(idToken, username);
        //   return successResponse;
        // });
        return user.getIdToken()
          .then((idToken: string) => {
            return this.addUserToDatabase(idToken, username);
          });
      })
      .catch((error: Error) => {
        return error.message;
      });
  }

  async addUserToDatabase(idToken: string, username: string): Promise<any> {
    return fetch(`${erzahler.url}:${erzahler.port}/register-user`, {
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
    }).then((addResult: any) => {
      console.log('User Added to database!', addResult);
      return addResult;
    }).catch((error: Error) => {
      console.log('Add user to firebase', error.message);
    });
  }

  signUpWithGoogle = (auth: Auth, username: string) => {
    console.log('Attempting sign in with Google...');

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

  signUpWithFacebook = (auth: Auth, username: string) => {
    console.log('Sign in with Facebook Clicked');

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

  addEmailProvider(auth: Auth, email: string, password: string) {
    console.log('Not implemented yet');
  }

  addGoogleProvider(auth: Auth) {
    console.log('Not implemented yet');
  }

  addFacebookProvider(auth: Auth) {
    console.log('Not implemented yet');
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

  triggerSendVerificationEmail = (user: User) => {
    sendEmailVerification(user);
  }
}