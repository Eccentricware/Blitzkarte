import { Grid } from '@mui/material'
import { getAuth } from 'firebase/auth'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import StallGlobe from '../components/icons/StallGlobe'
import IndexBody from '../components/index-page/IndexBody'
import { NavBarSignedIn } from '../components/nav-bar/NavBarSignedIn'
import { NavBarSignedOut } from '../components/nav-bar/NavBarSignedOut'
import styles from '../styles/Home.module.css'
import Blitzkontext from '../utils/Blitzkontext'

const Home: NextPage = () => {
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
        <NavBarSignedIn title="Yes user"/>
        <IndexBody user={user}/>
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
      <NavBarSignedOut title="No user"/>
      <IndexBody user={null}/>
    </div>
  )
}

export default Home
