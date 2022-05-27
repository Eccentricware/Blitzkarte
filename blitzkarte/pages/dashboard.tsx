import { Button, TextField } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment, useContext, useEffect, useState } from "react";
import { NavBarSignedIn } from "../components/nav-bar/NavBarSignedIn";
import Blitzkontext from "../utils/Blitzkontext";
import { useRouter } from 'next/router';
import { signInWithGoogle, signInWithFacebook, signUpWithEmail } from "../utils/firebase/firebase";
import { erzahler } from "../utils/general/erzahler";

const DashboardPage: NextPage = () => {
  const user = useContext(Blitzkontext).firebase.user;
  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const [presentAddEmail, setPresentAddEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const firebaseCtx = useContext(Blitzkontext).firebase;
  const router = useRouter();

  const handleSignUpWithEmailEnableClick = () => {
    setPresentAddEmail(!presentAddEmail);
  };

  const handleEmailChange = (email: string) => {
    setEmail(email);
  }

  const handlePassword1Change = (password1: string) => {
    setPassword1(password1);
  }

  const handlePassword2Change = (password2: string) => {
    setPassword2(password2);
  }

  const handleSignUpWithEmailSubmitClick = () => {
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
        <title>User Dashboard</title>
        <meta name="description" content="User dashboard and profile"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <NavBarSignedIn/>
      Username: &#123;username&#125;<br/>
      <br/>
      Email: &#123;email&#125;<br/>
      <Button
        color="inherit"
        variant="contained"
      >
        Change Email
      </Button><br/>
      <Button
        color="inherit"
        variant="contained"
      >
        Change Password
      </Button><br/>
      <Button
        color="warning"
        variant="contained"
      >
        Resend Verification
      </Button><br />
      Verification time left: 23:59:32 or something like that<br/>
      <br/>
      Add Login Methods <b>(which will be locked to this Bliztkarte account forever)</b>: <br/>
      <Button color="error"
        variant="contained"
        onClick={() => { handleSignUpWithEmailEnableClick(); }}
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
      {
        presentAddEmail &&
        <Fragment>
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
              onClick={() => { handleSignUpWithEmailSubmitClick(); }}
            >
              Submit
            </Button>
        </Fragment>
      }
    </div>
  )
}

export default DashboardPage;