// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider, Auth, AuthProvider, FacebookAuthProvider, sendEmailVerification, createUserWithEmailAndPassword, UserCredential, User, getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
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

  async signUpWithEmail(auth: Auth, username: string, email: string, password: string): Promise<any> {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: UserCredential) => {
        let user = userCredential.user;
        const idToken = await user.getIdToken();
        return await this.addUserToDatabase(idToken, username);
      })
      .catch((error: Error) => {
        return error.message;
      });
  }

  async signInWithEmail(email: string, password: string): Promise<any> {
    const auth = getAuth();

    return signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: UserCredential) => {
        const idToken: string = await userCredential.user.getIdToken();
        return this.checkUsernameLinked(idToken);
      })
      .catch((error: Error) => {
        return error.message;
      });
  }

  async resetPassword(email: string): Promise<any> {
    const auth = getAuth();

    return sendPasswordResetEmail(auth, email)
      .then(() => {
        return true;
      }).
      catch((error: Error) => {
        return false;
      });
  }

  signUpWithGoogle = (auth: Auth, username: string) => {
    console.log('Attempting sign in with Google...');

    const googleProvider: AuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
      .then(async (userCredential: UserCredential) => {
        const idToken: string = await userCredential.user.getIdToken();
        return await this.addUserToDatabase(idToken, username);
      }).catch((error: Error) => {
        return error.message
      });
  }

  signInWithGoogle = (): Promise<string> => {
    const auth = getAuth();

    const googleProvider: AuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
      .then(async (userCredential: UserCredential) => {
        const idToken: string = await userCredential.user.getIdToken();
        return this.checkUsernameLinked(idToken);
      })
      .catch((error: Error) => {
        return error.message;
      });
  }

  signUpWithFacebook = (auth: Auth, username: string) => {
    console.log('Sign in with Facebook Clicked');

    const facebookProvider: AuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookProvider)
      .then(async (userCredential: UserCredential) => {
        const idToken: string = await userCredential.user.getIdToken();
        return await this.addUserToDatabase(idToken, username);
      }).catch((error: Error) => {
        return error.message
      });
  }

  signInWithFacebook = (): Promise<string> => {
    const auth = getAuth();

    const facebookProvider: AuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookProvider)
      .then(async (userCredential: UserCredential) => {
        const idTokenPromise: Promise<string> = userCredential.user.getIdToken();
        const idToken = await idTokenPromise;
        return this.checkUsernameLinked(idToken);
      })
      .catch((error: Error) => {
        return error.message;
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

  checkUsernameLinked = (idToken: string): any => {
    return fetch(`${erzahler.url}:${erzahler.port}/get-user-profile/${idToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((result: any) => {
      return result.json();
    })
    .then((profile: any) => {
      console.log('profile', profile);
      if (profile.length === 1) {
        return { hasUsername: true };
      }
      return { hasUsername: false };
    })
    .catch((error: Error) => {
      return error.message;
    })
  }

  triggerSendVerificationEmail = (user: User) => {
    sendEmailVerification(user);
  }
}