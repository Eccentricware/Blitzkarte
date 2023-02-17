import type { NextPage } from "next";
import Head from 'next/head';
import { useContext, useState } from "react";
import { NavBarSignedOut  } from "../components/nav-bar/NavBarSignedOut";
import 'firebase/compat/auth';
import { FirebaseService } from "../utils/firebase/firebaseService";
import { Grid, TextField, Button } from "@mui/material";
import Blitzkontext from "../utils/Blitzkontext";
import { CredentialValidator } from "../utils/general/credentialValidator";
import { useRouter } from "next/router";
import { Google, Facebook, Email, Mail } from "@mui/icons-material";

const SignupPage: NextPage = () => {
  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [showEmailOps, setShowEmailOps] = useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [password1, setPassword1] = useState('');
  const [password1Valid, setPassword1Valid] = useState(true);
  const [password2, setPassword2] = useState('');
  const [password2Valid, setPassword2Valid] = useState(true);
  const [showProcessing, setShowProcessing] = useState(false);

  const firebaseCtx = useContext(Blitzkontext).user;

  const router = useRouter();

  const firebaseService = new FirebaseService();

  const handleUsernameChange = (username: string) => {
    let usernameValidator = new CredentialValidator(username);

    if (usernameValidator.invalidChar) {
      setUsernameErrorMsg('Invalid Character');
    } else if (usernameValidator.invalidStart) {
      setUsernameErrorMsg('Invalid first character');
    } else if (usernameValidator.chainedChar) {
      setUsernameErrorMsg('Don\'t chain that. Come on!');
    } else if (usernameValidator.badWords) {
      setUsernameErrorMsg('Can\'t let you do that');
    } else if (usernameValidator.invalidEnd) {
      setUsername(username);
      setUsernameAvailable(false);
      setUsernameErrorMsg('Can\'t end username with a space');
    } else if (username.length > 20) {
      setUsernameErrorMsg('Username max is 20 characters');
    } else if (username.length > 0 && username.length < 3) {
      setUsername(username);
      setUsernameAvailable(false);
      setUsernameErrorMsg('Username must be at least 3 characters');
    } else if (username.length === 0) {
      setUsername('');
      setUsernameAvailable(true);
      setUsernameErrorMsg('');
    } else {
      const availabilityResult: Promise<any> = firebaseService.checkUsername(username);
      setUsername(username);
      if (username.length > 0) {
        availabilityResult.then((usernameAvailable: any) => {
          setUsernameAvailable(usernameAvailable);
          if (!usernameAvailable) {
            setUsernameErrorMsg('Username unavailable');
          } else {
            setUsernameErrorMsg('');
          }
        });
      }
    }
  }

  const handleEmailChange = (email: string) => {
    const emailValidator = new CredentialValidator(email);
    setEmail(email);
    if ((emailValidator.emailValid)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }

  const handlePassword1Change = (password1: string) => {
    setPassword1(password1);
    if (password1.length < 6) {
      setPassword1Valid(false);
    } else {
      setPassword1Valid(true);
    }
  }

  const handlePassword2Change = (password2: string) => {
    setPassword2(password2);
    if (password1 !== password2) {
      setPassword2Valid(false);
    } else {
      setPassword2Valid(true);
    }
  }

  const handleToggleEmailOpsClick = () => {
    setShowEmailOps(!showEmailOps);
  };

  const handleEmailSignUpClick = () => {
    if (firebaseCtx.auth && username.length > 0 && usernameAvailable
      && validEmail && password1Valid && password2Valid) {
      firebaseService.signUpWithEmail(firebaseCtx.auth, username, email, password1)
        .then((result: any) => {
          console.log('super final top level add user feedback result', result);
          if (result.success === true) {
            router.push('/dashboard');
          }
        })
        .catch((error: Error) => {
          console.log(error.message);
        });
    } else {
      console.log('No firebase auth!');
    }
  };

  const handleSignUpWithGoogleClick = () => {
    if (firebaseCtx.auth && username.length > 2 && usernameAvailable ) {
      firebaseService.signUpWithGoogle(firebaseCtx.auth, username)
        .then((result: any) => {
          if (result.success === true) {
            router.push('/dashboard');
          }
        })
        .catch((error: Error) => {
          console.log(error.message);
        });
    } else if (username.length <= 2) {
      setUsernameErrorMsg('Username must be at least 3 characters')
    } else if (!usernameAvailable) {
      setUsernameErrorMsg('Seriously, someone already has that username');
    }
  };

  const handleSignUpWithFacebookClick = () => {
    if (firebaseCtx.auth && username.length > 2 && usernameAvailable) {
      firebaseService.signUpWithFacebook(firebaseCtx.auth, username)
        .then((result: any) => {
          if (result.success === true) {
            router.push('/dashboard');
          }
        })
        .catch((error: Error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div>
      <Head>
        <title>Signup</title>
        <meta name="description" content="Sign Up page for Blitzkarte"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBarSignedOut title="Sign Up Page"/>

      <Grid container columns={1}>
        <Grid item style={{padding: 25}}>
          <TextField
            label="Username"
            required
            variant="outlined"
            value={username}
            error={
              !usernameAvailable
              || usernameErrorMsg
              ? true : false}
            helperText={usernameErrorMsg.length > 0 ? usernameErrorMsg : null}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              handleUsernameChange(event.target.value);
            }}
          /><br/>
          <p>Create new Blitzkarte credentials or leverage an existing Google or Facebook Account</p>
          <Grid container>
            <Grid item>
              <Button className="provider-signup-button"
                color="error"
                variant="contained"
                onClick={() => { handleToggleEmailOpsClick(); }}
              >
                <span className="firebaseui-idp-text firebaseui-idp-text-long"><Mail color="inherit" fontSize="large"/></span>
              </Button>
            </Grid>
            <Grid item>
              <Button className="provider-signup-button"
                color="success"
                variant="contained"
                onClick={() => { handleSignUpWithGoogleClick(); }}
              >
                <span className="firebaseui-idp-text firebaseui-idp-text-long"><Google color='inherit' fontSize="large"/></span>
              </Button>
            </Grid>
            <Grid item>
              <Button className="provider-signup-button"
                color="primary"
                variant="contained"
                disabled={true}
                onClick={() => { handleSignUpWithFacebookClick(); }}
              >
                <span className="firebaseui-idp-text firebaseui-idp-text-long"><Facebook color="inherit" fontSize="large"/></span>
              </Button><br/>
            </Grid>
          </Grid>
          {
            showEmailOps &&
            <div>
              <TextField
                className="provider-signup-field"
                required
                label="Email"
                variant="outlined"
                error={!validEmail}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                  handleEmailChange(event.target.value);
                }}
              /><br />
              <TextField className="outlined-basic provider-signup-field"
                label="Password"
                type="password"
                variant="outlined"
                error={!password1Valid}
                helperText={!password1Valid && password1.length > 0 ? "Too short" : null}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                  handlePassword1Change(event.target.value);
                }}
              />
              <TextField className="outlined-basic provider-signup-field"
                label="Confirm Password"
                type="password"
                variant="outlined"
                error={!password2Valid}
                helperText={!password2Valid && password2.length > 0 ? "Passwords don't match" : null}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                  handlePassword2Change(event.target.value);
                }}
              /><br />
              <Button
                className="provider-signup-field"
                color="primary"
                variant="contained"
                onClick={() => { handleEmailSignUpClick(); }}
              >
                Submit
              </Button>
            </div>
          }
        </Grid>
      </Grid>
    </div>
  )
}

export default SignupPage;
