import { NextPage } from "next";
import Head from "next/head";
import { NavBarSignedIn } from "../components/nav-bar/NavBarSignedIn";
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import DashboardBody from "../components/dashboard-page/DashboardBody";
import { getAuth } from "firebase/auth";
import { NavBarSignedOut } from "../components/nav-bar/NavBarSignedOut";

const DashboardPage: NextPage = () => {
  const router = useRouter();

  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <Head>
          <title>Loading...</title>
          <meta name="description" content="User dashboard and profile"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <NavBarSignedOut title={`User Dashboard`}/>
      </div>
    )
  }

  if (user) {
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
  }

  if (error) {
    return <div>There was an error loading the page. Please report it to the administrator at zeldark@gmail.com</div>
  }

  router.push('/');
  return <div>YOU SHOULD NOT BE HERE!!</div>
}

export default DashboardPage;