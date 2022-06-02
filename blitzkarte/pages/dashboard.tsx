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

const DashboardPage: NextPage = () => {
  // const firebase = useContext(Blitzkontext).auth;
  const router = useRouter();

  // const firebaseApp = initializeApp(firebaseConfig);
  // const auth = getAuth(firebaseApp);

  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <Head>
            <title>User Dashboard</title>
            <meta name="description" content="User dashboard and profile"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
          </Head>
          <NavBarSignedIn title={`LOADING`}/>
        <DashboardBody uid={'UID IS GOING TO GO HERE'} />
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
        <DashboardBody uid={user.uid}/>
      </div>
    )
  } else {
    router.push('/');
    return (<div>Oh</div>)
  }
}

export default DashboardPage;