import { Button, TextField } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment, useContext, useEffect, useState } from "react";
import { NavBarSignedIn } from "../components/nav-bar/NavBarSignedIn";
import Blitzkontext from "../utils/Blitzkontext";
import { useRouter } from 'next/router';
import { firebaseConfig, FirebaseService } from "../utils/firebase/firebaseService";
import { ProfileService } from "../services/profile-service";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { initializeApp } from "firebase/app";

const DashboardPage: NextPage = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const user = useContext(Blitzkontext).user;
  const firebaseService = new FirebaseService();
  const profileService = new ProfileService();

  const [username, setUsername] = useState('');
  const [presentAddEmail, setPresentAddEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const router = useRouter();

  useEffect(() => {
    // const auth = getAuth();
    // console.log(user);
    // const uid: string = firebaseService.verifyUser();
    onAuthStateChanged(auth, (user: User | null) => {
      console.log('dashboard load user', user);
      if (user) {
        profileService.getUserProfile(user)
          .then((response: any) => {
            console.log(response);
            return response;
          })
          .catch((error: Error) => {
            console.log(error.message);
            router.push('/');
          });
      } else {
        router.push('/');
      }
    });
  });

  // const verifyUser = () => {
  //   onAuthStateChanged(auth, (user: User | null) => {
  //     console.log('dashboard load user', user);
  //     if (user) {
  //       profileService.getUserProfile(user)
  //         .then((response: any) => {
  //           console.log(response);
  //           return response;
  //         })
  //         .catch((error: Error) => {
  //           console.log(error.message);
  //           router.push('/');
  //         });
  //     } else {
  //       router.push('/');
  //     }
  //   });
  // }

  const handleEmailChange = (email: string) => {
    setEmail(email);
  }

  const handlePassword1Change = (password1: string) => {
    setPassword1(password1);
  }

  const handlePassword2Change = (password2: string) => {
    setPassword2(password2);
  }

  const handleAddEmailProviderSubmitClick = () => {
    if (user.auth) {
      firebaseService.addEmailProvider(user.auth, email, password1);
    }
  };

  const handleEnableAddEmailProviderClick = () => {
    setPresentAddEmail(!presentAddEmail);
  };

  const handleAddGoogleProviderClick = () => {
    if (user.auth) {
      firebaseService.addGoogleProvider(user.auth);
    }
  };

  const handleAddFacebookProviderClick = () => {
    if (user.auth) {
      firebaseService.addFacebookProvider(user.auth);
    }
  };

  return (
    <div>
      <Head>
        <title>User Dashboard</title>
        <meta name="description" content="User dashboard and profile"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <NavBarSignedIn title={`User Dashboard`}/>
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
        onClick={() => { handleEnableAddEmailProviderClick(); }}
      >
        <span className="firebaseui-idp-text firebaseui-idp-text-long">Email</span>
      </Button>
      <Button color="success"
        variant="contained"
        onClick={() => { handleAddGoogleProviderClick(); }}
      >
        <span className="firebaseui-idp-text firebaseui-idp-text-long">Google</span>
      </Button>
      <Button color="primary"
        variant="contained"
        onClick={() => { handleAddFacebookProviderClick(); }}
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
              onClick={() => { handleAddEmailProviderSubmitClick(); }}
            >
              Submit
            </Button>
        </Fragment>
      }
    </div>
  )
}

export default DashboardPage;