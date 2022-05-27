import { Button, TextField } from "@mui/material"
import { NextPage } from "next"
import Head from "next/head"
import { useState } from "react"
import { NavBarSignedOut } from "../components/nav-bar/NavBarSignedOut"
import { checkUsername } from "../utils/firebase/firebase"

const ReconciliationPage: NextPage = () => {
  const [username, setUsername] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const handleUsernameChange = (username: string) => {
    setUsername(username);
    console.log(username);
    if (username.length > 0) {
      const availabilityResult: Promise<any> = checkUsername(username);
      availabilityResult.then((result: any) => {
        console.log('checkUsername(username)', result);
        setUsernameAvailable(result);
      });
    }
  }

  return (
    <div>
      <Head>
        <title>Account Reconciliation</title>
        <meta name="description" content="Multi-Provider Login Conflict"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <NavBarSignedOut />
      {!usernameAvailable && username.length > 0 && <h1 style={{color: 'red'}}>{username} is claimed!</h1>}
      {usernameAvailable && username.length > 0 && <h1 style={{ color: 'green' }}>{username} is available!</h1>}
      <h3> Are you interested in choosing a different username or merging login providers?</h3>
      <TextField
        label="Username"
        required
        variant="outlined"
        error={!usernameAvailable && username.length > 0 ? true : false}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
          handleUsernameChange(event.target.value);
        }}
      /><br/>
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