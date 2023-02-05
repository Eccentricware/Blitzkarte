import { getAuth } from "firebase/auth";
import { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { DevelopmentBody } from "../components/development-page/DevelopmentBody";
import StallGlobe from "../components/icons/StallGlobe";
import { NavBarSignedIn } from "../components/nav-bar/NavBarSignedIn";
import { NavBarSignedOut } from "../components/nav-bar/NavBarSignedOut";
import Blitzkontext from "../utils/Blitzkontext";

const Development: NextPage = () => {
  // className={styles.container}
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const bkCtx = useContext(Blitzkontext);

  if (loading) {
    return (
      <div>
        <Head>
          <title>Blitzkarte</title>
          <meta name="description" content="Fully automated game of global domination" />
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBarSignedOut title={""} />
        <StallGlobe mode='authenticating' message={'Index Page: Loading'}/>
      </div>
    )
  }

  // Signed in
  if (user) {
    bkCtx.user.user = user;
    return (
      <div>
        <Head>
          <title>Blitzkarte</title>
          <meta name="description" content="Fully automated game of global domination" />
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBarSignedIn title={'State of the Game'} />
        <DevelopmentBody/>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <StallGlobe mode="error"  message={'Index Page: Error'}/>
        <div>
          There was an error loading the page. Please report it to the administrator at zeldark@gmail.com
        </div>
      </div>
    )
  }

  // Signed Out
  return (
    <div>
      <Head>
        <title>Blitzkarte</title>
        <meta name="description" content="Fully automated game of global domination" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBarSignedOut title={""} />
      <DevelopmentBody/>
    </div>
  )
}

export default Development;