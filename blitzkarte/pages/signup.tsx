import type { NextPage } from "next";
import Head from 'next/head';
import { useContext, useState } from "react";
import { NavBarSignedOut  } from "../components/nav-bar/NavBarSignedOut";
import { erzahler } from "../utils/general/erzahler";
import 'firebase/compat/auth';
import { checkUsername, signInWithFacebook, signInWithGoogle } from "../utils/firebase/firebase";
import { Grid, TextField, Button } from "@mui/material";
import Blitzkontext from "../utils/Blitzkontext";
import { signUpWithEmail } from "../utils/firebase/firebase";

const SignupPage: NextPage = () => {
  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const firebaseCtx = useContext(Blitzkontext).firebase;

  const handleUsernameChange = (username: string) => {
    setUsername(username);
    console.log(username);
    if (username.length > 0) {
      const availabilityResult: Promise<any> = checkUsername(username);
      availabilityResult.then((result: any) => {
        console.log('checkUsername(username)', result);
        setUsernameAvailable(result);
      });
    }
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

  const handleSignUpWithEmailClick = () => {
    signUpWithEmail(username, email, password1);
  };

  const handleSignUpWithGoogleClick = () => {
    signInWithGoogle(firebaseCtx.auth);
  };

  const handleSignUpWithFacebookClick = () => {
    signInWithFacebook(firebaseCtx.auth);
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
          <TextField
            label="Username"
            required
            variant="outlined"
            error={!usernameAvailable && username.length > 0 ? true : false}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              handleUsernameChange(event.target.value);
            }}
          /><br/>
          <Button color="error"
            variant="contained"
            onClick={() => { handleSignUpWithEmailClick(); }}
          >
            <span className="firebaseui-idp-text firebaseui-idp-text-long">Email</span>
          </Button>
          <Button color="success"
            variant="contained"
            onClick={() => { handleSignUpWithGoogleClick(); }}
          >
            <span className="firebaseui-idp-text firebaseui-idp-text-long">Google</span>
          </Button>
          <Button color="primary"
            variant="contained"
            onClick={() => { handleSignUpWithFacebookClick(); }}
          >
            <span className="firebaseui-idp-text firebaseui-idp-text-long">Facebook</span>
          </Button><br/>
          <TextField id="outlined-basic" label="Email" variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              handleEmailChange(event.target.value);
            }}
          /><br />
          <TextField id="outlined-basic" label="Password" type="password" variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              handlePassword1Change(event.target.value);
            }}
          />
          <TextField id="outlined-basic" label="Confirm Password" type="password" variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              handlePassword2Change(event.target.value);
            }}
          /><br />
          <Button color="primary"
            variant="contained"
            onClick={() => { handleEmailSignUpSubmit(); }}
          >
            Submit
          </Button>

        </Grid>
      </Grid>
    </div>
  )
}

export default SignupPage;