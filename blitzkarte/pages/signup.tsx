import { Button, Grid, TextField } from "@mui/material";
import type { NextPage } from "next";
import Head from 'next/head';
import { useState } from "react";
import { NavBarSignedOut  } from "../components/nav-bar/NavbarSignedOut";
import { erzahler } from "../utils/general/erzahler";


const SignupPage: NextPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

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
    fetch(`${erzahler.url}:${erzahler.port}/api/sign-in-with-google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({o: 'o'})
    }).then((response: any) => {
      console.log('response', response);
      return response.json();
    }).then((data: any) => {
      console.log('data', data)
      return data;
    }).catch((error: Error) => {
      console.log('Error:', error);
    })
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

      {/* <Grid container columns={1}>
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
        </Grid>
      </Grid> */}
      <div id="firebaseui-container"></div>
    </div>
  )
}

export default SignupPage;