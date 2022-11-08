import { getAuth } from "firebase/auth";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import GameDetailsBody from "../components/game-details-page/GameDetailsBody";
import StallGlobe from "../components/icons/StallGlobe";
import { NavBarSignedIn } from "../components/nav-bar/NavBarSignedIn";
import { NavBarSignedOut } from "../components/nav-bar/NavBarSignedOut";
import Blitzkontext from "../utils/Blitzkontext";

const GameDetailsPage: NextPage = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const bkCtx = useContext(Blitzkontext);
  const gameId: number | undefined = bkCtx.currentGame.id;
  const router = useRouter();

  if (loading) {
    return (
      <div>
        <Head>
          <title>Game Details</title>
          <meta name="description" content="Game details"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <NavBarSignedOut title="Game Settings"/>
        <StallGlobe mode="authenticating" message={"Dashboad Page: Loading"}/>
      </div>
    )
  }

  if (user) {
    bkCtx.user.user = user;
    return (
      <div>
        <Head>
          <title>Game Details</title>
          <meta name="description" content="Game Name"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <NavBarSignedIn title="Game Settings"/>
        <GameDetailsBody user={user} gameId={gameId}/>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <StallGlobe mode="error" message={"Game Details Page: Error"}/>
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
    </div>
  )
}

export default GameDetailsPage;