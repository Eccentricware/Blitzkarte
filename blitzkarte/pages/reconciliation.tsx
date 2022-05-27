import { Button, TextField } from "@mui/material"
import { NextPage } from "next"
import Head from "next/head"
import { NavBarSignedOut } from "../components/nav-bar/NavBarSignedOut"

const ReconciliationPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Account Reconciliation</title>
        <meta name="description" content="Multi-Provider Login Conflict"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <NavBarSignedOut />
      <h1>&#123;username&#125; in already claimed</h1>
      <div> Are you interested in choosing a different username or merging login types?</div>
      <TextField label="Username" variant="outlined"/><br/>
      <Button color="success" variant="contained">Register</Button>
      <br/><br/>
      <div>&#123;providerTypeImg&#125;</div>
      <Button color="warning" variant="contained">Request Merge</Button>
      <br /><br />
      <Button color="error" variant="contained">Cancel</Button>
    </div>
  )
}

export default ReconciliationPage;