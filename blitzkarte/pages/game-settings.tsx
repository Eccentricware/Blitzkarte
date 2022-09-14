import { NextPage } from "next";
import Head from "next/head";
import { NavBarSignedIn } from "../components/nav-bar/NavBarSignedIn";

const GameSettingsPage: NextPage = () => {
  return <div>
    <Head>
      <title>Game Settings</title>
      <meta name="description" content="See or Manage Game Settings"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>
    <NavBarSignedIn title="Game Settings"/>
  </div>
}

export default GameSettingsPage;