import { getAuth } from "firebase/auth";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import GameBody from "../../components/game-page/GameBody";
import StallGlobe from "../../components/icons/StallGlobe";
import { NavBarSignedIn } from "../../components/nav-bar/NavBarSignedIn";
import { NavBarSignedOut } from "../../components/nav-bar/NavBarSignedOut";
import Blitzkontext from "../../utils/Blitzkontext";

const GamePage: NextPage = () => {
  const auth = getAuth();
  const [ user, loading, error ] = useAuthState(auth);
  const bkCtx = useContext(Blitzkontext);
  const router = useRouter();
  const gameId = Number(router.query.gameId);

  if (loading) {
    return (
      <div>
        <Head>
          <title>Game</title>
          <meta name="description" content="Game details"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <NavBarSignedOut title="Gameplay"/>
        <StallGlobe mode="authenticating" message={"Game Page: Loading"}/>
      </div>
    )
  }

  if (user) {
    bkCtx.user.user = user;
    return (
      <div>
        <Head>
          <title>Game</title>
          <meta name="description" content="Game Name"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <NavBarSignedIn title="Gameplay"/>
        <GameBody gameId={gameId} user={user}/>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <StallGlobe mode="error" message={"Game Page: Error"}/>
        <div>
          There was an error loading the page. Please report it to the administrator at zeldark@gmail.com
        </div>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Game</title>
        <meta name="description" content="Game Name"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <NavBarSignedOut title="Gameplay"/>
      <GameBody gameId={gameId} user={undefined}/>
    </div>
  )
}

export default GamePage;