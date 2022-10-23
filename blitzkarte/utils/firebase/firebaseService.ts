// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  signInWithPopup,
  GoogleAuthProvider,
  Auth,
  AuthProvider,
  FacebookAuthProvider,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  UserCredential,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail
} from "firebase/auth";
import router from "next/router";
import { UserRequestService } from "../../services/request-services/user-request-service";
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
  userRequestService = new UserRequestService();

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
    return fetch(`${erzahler.url}:${erzahler.port}/user/register`, {
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
      return addResult;
    }).catch((error: Error) => {
      console.log('Add user confirmation failure', error.message);
    });
  }

  async signUpWithEmail(auth: Auth, username: string, email: string, password: string): Promise<any> {
    const serverRunning: boolean = await fetch(`${erzahler.url}:${erzahler.port}/check-status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response: any) => {
      return response.json();
    }).then((status: boolean) => {
      return status;
    })
    .catch(() => false );

    if (!serverRunning) {
      return false;
    }

    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: UserCredential) => {
        let user = userCredential.user;
        updateProfile(user, {
          displayName: username
        }).then(() => {
          sendEmailVerification(user);
        })
        const idToken = await user.getIdToken();
        return await this.addUserToDatabase(idToken, username);
      })
      .catch((error: Error) => {
        return error.message;
      });
  }

  async validateUserDBEmail() {
    const user = getAuth().currentUser;

    if (user) {
      const idToken: string = await user.getIdToken();
      fetch(`${erzahler.url}:${erzahler.port}/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: idToken })
      })
    }
  }

  async signInWithEmail(email: string, password: string): Promise<any> {
    const auth = getAuth();

    return signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential: UserCredential) => {
        const idToken: string = await userCredential.user.getIdToken();

        return this.hasUsername(idToken);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }

  async changeEmail(oldEmail: string, newEmail: string, password: string) {
    const auth = getAuth();

    if (auth.currentUser) {
      const currentUser: User = await signInWithEmailAndPassword(auth, oldEmail, password)
        .then((userCredential: UserCredential) => userCredential.user);

      await updateEmail(currentUser, newEmail);
      await sendEmailVerification(currentUser);
    }
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

  async signUpWithGoogle(auth: Auth, username: string) {
    console.log('Attempting sign in with Google...');

    const googleProvider: AuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
      .then(async (userCredential: UserCredential) => {
        const idToken: string = await userCredential.user.getIdToken();
        return await this.addUserToDatabase(idToken, username);
      }).catch((error: Error) => {
        return error.message;
      });
  }

  async signInWithGoogle(): Promise<any> {
    const auth = getAuth();
    const googleProvider: AuthProvider = new GoogleAuthProvider();

    return signInWithPopup(auth, googleProvider)
      .then(async (userCredential: UserCredential) => {
        const idToken: string = await userCredential.user.getIdToken();
        return this.hasUsername(idToken);
      })
      .catch((error: Error) => {
        return error.message;
      });
  }

  async signUpWithFacebook(auth: Auth, username: string) {
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

  async signInWithFacebook(): Promise<string> {
    const auth = getAuth();

    const facebookProvider: AuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookProvider)
      .then(async (userCredential: UserCredential) => {
        const idTokenPromise: Promise<string> = userCredential.user.getIdToken();
        const idToken = await idTokenPromise;
        return this.hasUsername(idToken);
      })
      .catch((error: Error) => {
        return error.message;
      });
  }

  async addEmailProvider(email: string, password: string, username: string) {
    const auth = getAuth();

    const idToken: string =
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential: UserCredential) => {
          let user = userCredential.user;
          updateProfile(user, {
            displayName: username
          }).then(() => {
            sendEmailVerification(user);
          });
          return await userCredential.user.getIdToken();
        })
        .catch((error: Error) => error.message);

    return this.postProvider(idToken, username);
  }

  async addGoogleProvider(username: string) {
    const auth = getAuth();
    const googleProvider: AuthProvider = new GoogleAuthProvider();

    const idToken: string =
      await signInWithPopup(auth, googleProvider)
        .then(async (userCredential: UserCredential) =>
          await userCredential.user.getIdToken())
        .catch((error: Error) => error.message);

    return this.postProvider(idToken, username);
  }

  async addFacebookProvider(username: string) {
    const auth = getAuth();
    const facebookProvider: AuthProvider = new FacebookAuthProvider();

    const idToken: string =
      await signInWithPopup(auth, facebookProvider)
        .then(async (userCredential: UserCredential) =>
          await userCredential.user.getIdToken())
        .catch((error: Error) => error.message);

    return this.postProvider(idToken, username);
  }

  async postProvider(idToken: string, username: string) {
    return fetch(`${erzahler.url}:${erzahler.port}/user/add-provider`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        idToken: idToken,
        username: username
      })
    })
      .then((response: any) => response.json())
      .then((data: any) => data)
      .catch((error: Error) => error.message);
  }

  // Guest function. It's not "really" firebase
  checkUsername = (username: string): any => {
    return fetch(`${erzahler.url}:${erzahler.port}/user/check-username/${username}`, {
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

  hasUsername = (idToken: string): any => {
    return this.userRequestService.getUserProfile()
      .then((profile: any) => {
        console.log('profile', profile);
        if (profile.username) {
          return { hasUsername: true };
        }
        return { hasUsername: false };
      })
      .catch((error: Error) => {
        return {
          hasUsername: false,
          error: error.message
        };
      });
  }

  resendEmailVerification = () => {
    const user = getAuth().currentUser;
    if (user) {
      sendEmailVerification(user);
    }
  }
}