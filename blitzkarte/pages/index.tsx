import { getAuth } from 'firebase/auth'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import StallGlobe from '../components/icons/StallGlobe'
import IndexBody from '../components/index-page/IndexBody'
import { NavBarSignedIn } from '../components/nav-bar/NavBarSignedIn'
import { NavBarSignedOut } from '../components/nav-bar/NavBarSignedOut'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  // className={styles.container}
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

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
        <StallGlobe mode='authenticating'/>
      </div>
    )
  }

  if (user) {
    return (
      <div>
        <Head>
          <title>Blitzkarte</title>
          <meta name="description" content="Fully automated game of global domination" />
          <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <IndexBody user={user}/>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <StallGlobe mode="error" />
        <div>
          There was an error loading the page. Please report it to the administrator at zeldark@gmail.com
        </div>
      </div>
    )
  }

  console.log(user);

  return (
    <div>
      <Head>
        <title>Blitzkarte</title>
        <meta name="description" content="Fully automated game of global domination" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBarSignedOut title={""} />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Project Blitzkarte!
        </h1>

        <p className={styles.description}>
          (It Means Lightning Maps)
        </p>
      </main>
    </div>
  )
}

export default Home
