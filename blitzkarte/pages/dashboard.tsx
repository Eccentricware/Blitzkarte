import { Button, TextField } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { Fragment, useContext, useEffect, useState } from "react";
import { NavBarSignedIn } from "../components/nav-bar/NavBarSignedIn";
import Blitzkontext from "../utils/Blitzkontext";
import { useRouter } from 'next/router';
import { FirebaseService } from "../utils/firebase/firebaseService";
import { ProfileService } from "../services/profile-service";
import { useAuthState } from 'react-firebase-hooks/auth';
import DashboardBody from "../components/dashboard-page/DashboardBody";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../utils/firebase/firebaseService";
import { NavBarSignedOut } from "../components/nav-bar/NavBarSignedOut";

const DashboardPage: NextPage = () => {
  // const firebase = useContext(Blitzkontext).auth;
  const router = useRouter();

  // const firebaseApp = initializeApp(firebaseConfig);
  // const auth = getAuth(firebaseApp);

  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <Head>
          <title>User Dashboard</title>
          <meta name="description" content="User dashboard and profile"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <NavBarSignedOut title={`User Dashboard`}/>
      </div>
    )
  } else if (user) {
    return (
      <div>
        <Head>
          <title>User Dashboard</title>
          <meta name="description" content="User dashboard and profile"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <NavBarSignedIn title={`User Dashboard`}/>
        <DashboardBody user={user}/>
      </div>
    )
  } else if (error) {
    return <div>There was an error loading the page. Please report it to the administrator at zeldark@gmail.com</div>
  } else {
    router.push('/');
    return <div>WHO ARE YOU?!?</div>
  }
}

export default DashboardPage;