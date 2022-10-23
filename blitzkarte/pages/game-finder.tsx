import { getAuth } from "firebase/auth";
import { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { GameFinderBody } from "../components/game-finder-page/GameFinderBody";
import StallGlobe from "../components/icons/StallGlobe";
import { NavBarSignedIn } from "../components/nav-bar/NavBarSignedIn";
import { NavBarSignedOut } from "../components/nav-bar/NavBarSignedOut";
import Blitzkontext from "../utils/Blitzkontext";

const GameFinder: NextPage = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const bkCtx = useContext(Blitzkontext);
  console.log('user', user);

  if (loading) {
    return(
      <div>
        <Head>
          <title>Game Finder</title>
          <meta name="description" content="Game finder"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <NavBarSignedOut title="Game Finder"/>
        <StallGlobe mode="authenticating" message={"Game Finder Page: Loading"}/>
      </div>
    )
  }

  if (user) {
    bkCtx.user.user = user;
    return (
      <div>
        <Head>
          <title>Game Finder</title>
          <meta name="description" content="Game finder"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <NavBarSignedIn title="Game Finder"/>
        <GameFinderBody user={user}/>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <StallGlobe mode="error" message={"Game Finder Page: Error"}/>
        <div>
          There was an error loading the page. Please report it to the administrator at zeldark@gmail.com
        </div>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Game Details</title>
        <meta name="description" content="Game Name"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <NavBarSignedOut title="Game Settings"/>
      <GameFinderBody user={null}/>
    </div>
  )
}

export default GameFinder;