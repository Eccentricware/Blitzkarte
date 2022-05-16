import { Grid, TextField } from "@mui/material";
import type { NextPage } from "next";
import Head from 'next/head';
import { NavBarSignedOut  } from "../components/nav-bar/NavbarSignedOut";
import styles from '../styles/Home.module.css';

const SignupPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Signup</title>
        <meta name="description" content="Sign Up page for Blitzkarte"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBarSignedOut/>

      <Grid container columns={1}>
        <Grid item>
          <TextField id="outlined-basic" label="Username" variant="outlined" />
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
        </Grid>
      </Grid>
    </div>
  )
}

export default SignupPage;