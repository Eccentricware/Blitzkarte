import type { NextPage } from 'next'
import Head from 'next/head'
import { NavBarSignedOut } from '../components/nav-bar/NavBarSignedOut'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  // className={styles.container}
  console.log('Reload');
  return (
    <div>
      <Head>
        <title>Blitzkarte</title>
        <meta name="description" content="Fully automated game of global domination" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBarSignedOut title={""}/>

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
