import type { NextPage } from "next";
import Head from 'next/head';
import { useState } from "react";
import { NavBarSignedOut  } from "../components/nav-bar/NavbarSignedOut";
import { erzahler } from "../utils/general/erzahler";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseConfig } from "../utils/firebase/firebase";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Grid, TextField, Button } from "@mui/material";

const SignupPage: NextPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const fuiConfig = {
    signInFlow: 'popup',
    signInSuccessfulUrl: '/parser',
    signInOption: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
  };

  const handleUsernameChange = (username: string) => {
    setUsername(username);
  }

  const handleEmailChange = (email: string) => {
    setEmail(email);
  }

  const handlePassword1Change = (password1: string) => {
    setPassword1(password1);
  }

  const handlePassword2Change = (password2: string) => {
    setPassword2(password2);
  }

  const handleEmailSignUpSubmit = () => {
    console.log(`Username: ${username} | Email: ${email} | Password: ${password1}`);
    fetch(`${erzahler.url}:${erzahler.port}/api/register-by-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password1
      }),
    })
    .then((response: any) => {
      return response.json();
    })
    .then((data: any) => {
      console.log('Success data', data);
    })
    .catch((error: Error) => {
      console.log('Error', error.stack);
    })
  }

  const handleSignInWithGoogleClick = () => {
    console.log('Sign in with Google Clicked');
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
  };

  const handleSignInWithFacebookClick = () => {
    console.log('Sign in with Facebook Clicked');
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
  };

  return (
    <div>
      <Head>
        <title>Signup</title>
        <meta name="description" content="Sign Up page for Blitzkarte"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBarSignedOut/>

      <Grid container columns={1}>
        <Grid item>
          <TextField id="outlined-basic" label="Username" variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              handleUsernameChange(event.target.value);
            }}
          />
          <TextField id="outlined-basic" label="Email" variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              handleEmailChange(event.target.value);
            }}
          />
          <TextField id="outlined-basic" label="Password" type="password" variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              handlePassword1Change(event.target.value);
            }}
          />
          <TextField id="outlined-basic" label="Confirm Password" type="password" variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              handlePassword2Change(event.target.value);
            }}
          />
          <Button color="primary"
            variant="contained"
            onClick={() => { handleEmailSignUpSubmit(); }}
          >
            Sign Up
          </Button>
          <Button color="primary"
            variant="contained"
            onClick={() => { handleSignInWithGoogleClick(); }}
          >
            <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Google</span>
          </Button>
          <Button color="primary"
            variant="contained"
            onClick={() => { handleSignInWithFacebookClick(); }}
          >
            <span className="firebaseui-idp-text firebaseui-idp-text-long">Sign in with Facebook</span>
          </Button>
        </Grid>
      </Grid>
      {/* <StyledFirebaseAuth uiConfig={fuiConfig} firebaseAuth={firebase.auth()} /> */}
    </div>
  )
}

export default SignupPage;