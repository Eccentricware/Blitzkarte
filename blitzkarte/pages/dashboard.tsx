import { Button } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { NavBarSignedIn } from "../components/nav-bar/NavBarSignedIn";
import Blitzkontext from "../utils/Blitzkontext";
import { useRouter } from 'next/router';

const DashboardPage: NextPage = () => {
  const user = useContext(Blitzkontext).firebase.user;
  const router = useRouter();

  useEffect(() => {
    const providerConflict = false;
    if (providerConflict) {
      router.push('/provider-conflict');
    }
  });

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
      Email: {user?.email}
      <Button
        color="inherit"
        variant="contained"
      >
        Change Email
      </Button>
      <Button
        color="inherit"
        variant="contained"
      >
        Change Password
      </Button><br/>
      Email Verified: {user?.emailVerified === true ? 'Yes' : 'No'}
      <Button
        color="warning"
        variant="contained"
      >
        Resend
      </Button><br />
      Provder merge request: <br/>
      Account: &#123;accountName&#125;<br/>
      Provider: &#123;providerType&#125;<br/>
      <Button
        color="success"
        variant="contained"
      >
        Accept
      </Button>
      <Button
        color="error"
        variant="contained"
      >
        Reject
      </Button>
    </div>
  )
}

export default DashboardPage;