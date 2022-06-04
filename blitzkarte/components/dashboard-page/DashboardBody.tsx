import { Button, TextField } from '@mui/material';
import { reauthenticateWithCredential, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { ProfileService } from '../../services/profile-service';
import Blitzkontext from '../../utils/Blitzkontext';
import { FirebaseService } from '../../utils/firebase/firebaseService';
import { erzahler } from '../../utils/general/erzahler';

interface DashboardBodyProps {
  user: User | null;
}

const DashboardBody: FC<DashboardBodyProps> = ({user}: DashboardBodyProps) => {
  // const firebaseApp = initializeApp(firebaseConfig);
  // const auth = getAuth(firebaseApp);
  const firebase = useContext(Blitzkontext).user;
  const firebaseService = new FirebaseService();
  const profileService = new ProfileService();

  const [username, setUsername] = useState('');
  const [presentAddEmail, setPresentAddEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const router = useRouter();

  const queryClient: QueryClient = useQueryClient();

  const { isLoading, error, data, isFetching } = useQuery('userSettings', () => {
      return user?.getIdToken().then((idToken: string) => {
        return fetch(`${erzahler.url}:${erzahler.port}/get-user-settings/${idToken}`)
          .then((response) => {
            return response.json();
          }).then((data) => {
            console.log('User:', user);
            console.log(`Data:`, data);
            return data;
          })
          .catch((error: Error) => console.log(error.message));
        });
  });

  if (isFetching) {
    return <div>Fetcher? I hardly know her!!</div>
  }

  if (isLoading) {
    return <div>loading</div>
  }

  const handleEmailChange = (email: string) => {
    setEmail(email);
  }

  const handlePassword1Change = (password1: string) => {
    setPassword1(password1);
  }

  const handlePassword2Change = (password2: string) => {
    setPassword2(password2);
  }

  const handleAddEmailProviderSubmitClick = () => {
    if (firebase.auth) {
      firebaseService.addEmailProvider(firebase.auth, email, password1);
    }
  };

  const handleEnableAddEmailProviderClick = () => {
    setPresentAddEmail(!presentAddEmail);
  };

  const handleAddGoogleProviderClick = () => {
    if (firebase.auth) {
      firebaseService.addGoogleProvider(firebase.auth);
    }
  };

  const handleAddFacebookProviderClick = () => {
    if (firebase.auth) {
      firebaseService.addFacebookProvider(firebase.auth);
    }
  };

  return (
    <div>
      Welcome: {data && data.username}!!<br />
      <br />
      Email: &#123;email&#125;<br />
      <Button
        color="inherit"
        variant="contained"
      >
        Change Email
      </Button><br />
      <Button
        color="inherit"
        variant="contained"
      >
        Change Password
      </Button><br />
      <Button
        color="warning"
        variant="contained"
      >
        Resend Verification
      </Button><br />
      Verification time left: 23:59:32 or something like that<br />
      <br />
      Add Login Methods <b>(which will be locked to this Bliztkarte account forever)</b>: <br />
      <Button color="error"
        variant="contained"
        onClick={() => { handleEnableAddEmailProviderClick(); }}
      >
        <span className="firebaseui-idp-text firebaseui-idp-text-long">Email</span>
      </Button>
      <Button color="success"
        variant="contained"
        onClick={() => { handleAddGoogleProviderClick(); }}
      >
        <span className="firebaseui-idp-text firebaseui-idp-text-long">Google</span>
      </Button>
      <Button color="primary"
        variant="contained"
        onClick={() => { handleAddFacebookProviderClick(); }}
      >
        <span className="firebaseui-idp-text firebaseui-idp-text-long">Facebook</span>
      </Button><br />
      {
        presentAddEmail &&
        <Fragment>
          <TextField id="outlined-basic" label="Email" variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              handleEmailChange(event.target.value);
            }}
          /><br />
          <TextField id="outlined-basic" label="Password" type="password" variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              handlePassword1Change(event.target.value);
            }}
          />
          <TextField id="outlined-basic" label="Confirm Password" type="password" variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
              handlePassword2Change(event.target.value);
            }}
          /><br />
          <Button color="primary"
            variant="contained"
            onClick={() => { handleAddEmailProviderSubmitClick(); }}
          >
            Submit
          </Button>
        </Fragment>
      }
    </div>
  )
}

export default DashboardBody;