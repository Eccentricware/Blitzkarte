import { Button, TextField } from '@mui/material';
import { reauthenticateWithCredential, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { ProfileService } from '../../services/profile-service';
import Blitzkontext from '../../utils/Blitzkontext';
import { FirebaseService } from '../../utils/firebase/firebaseService';
import { erzahler } from '../../utils/general/erzahler';
import { deadlineTimer } from '../../utils/general/time-time-charm';
import StallGlobe from '../icons/StallGlobe';
import { NavBarSignedIn } from '../nav-bar/NavBarSignedIn';

interface DashboardBodyProps {
  user: User | null;
}

const DashboardBody: FC<DashboardBodyProps> = ({user}: DashboardBodyProps) => {
  const firebase = useContext(Blitzkontext).user;
  const firebaseService = new FirebaseService();
  const profileService = new ProfileService();

  const [presentAddEmail, setPresentAddEmail] = useState(false);
  const [changingEmail, setChangingEmail] = useState(false);
  const [email, setEmail] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [emailValidated, setEmailValidated] = useState(true);
  const [verificationTimer, setVerificationTimer] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const router = useRouter();

  const queryClient: QueryClient = useQueryClient();

  const { isLoading, error, data, isFetching } = useQuery('userProfile', () => {
    return user?.getIdToken().then((idToken: string) => {
      return fetch(`${erzahler.url}:${erzahler.port}/get-user-profile/${idToken}`)
        .then((response) => {
          return response.json();
        }).then((result) => {
          return result[0];
        })
        .catch((error: Error) => {
          console.log('idToken Error', error.message);
          router.push('/');
        });
      });
  });

  useEffect(() => {
    console.log('data', data);
    console.log('user', user);
    if (data && !data.email_verified && user?.emailVerified) {
      // This just forces the validatio for UI/UX.
      // If user does not navigate here before timer is up, it is assessed by back end at expiration time
      firebaseService.validateUserDBEmail();
      return;
    }

    if (data && data.email && !data.email_verified) {
      setEmailValidated(false);
      setInterval(() => {
        setVerificationTimer(deadlineTimer(data.verification_deadline, 'minutes'));
      }, 1000);
    }
  }, [data, user, firebaseService])

  const handleChangingEmailClick = () => {
    setChangingEmail(!changingEmail);
  }

  const handleSubmitChangeEmailClick = () => {
    if (firebase.auth) {
      firebaseService.changeEmail(email);
    }
  }

  const handleChangingPasswordClick = () => {
    setChangingPassword(!changingPassword);
  }

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  }

  const handleResendEmailVerificationClick = () => {
    firebaseService.resendEmailVerification();
    setVerificationSent(true);
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

  if (isFetching) {
    return <StallGlobe mode="querying" />
  }

  if (isLoading) {
    return <StallGlobe mode="querying" />
  }

  if (error) {
    return <StallGlobe mode="error" />
  }

  if (data) {
    return (
      <div>
        <NavBarSignedIn title={`User Dashboard`} />
        Welcome, {data && data.username}<br />
        <br />
        {
          data.email &&
          <div>
            Email: {data.email}<br />
            <Button
              color="inherit"
              variant="contained"
              onClick={handleChangingEmailClick}
            >
              Change Email
            </Button><br />
              {
                changingEmail &&
                <React.Fragment>
                  <TextField
                    label="New Email"
                    variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                      handleEmailChange(event.target.value);
                    }}
                  /><br/>
                  <TextField label="Enter Password" type="password" variant="outlined"
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                      handlePassword1Change(event.target.value);
                    }}
                  />
                  <br/>
                  <Button
                  color="inherit"
                  variant="contained"
                  onClick={handleSubmitChangeEmailClick}
                  >
                    Submit Change
                  </Button><br />
                </React.Fragment>
              }
            <br/>
              {
                (!emailValidated) &&
                <div>
                  {
                    verificationSent ?
                    <div>Verification Sent</div>
                    :
                    <Button
                      color="warning"
                      variant="contained"
                      onClick={handleResendEmailVerificationClick}
                    >
                      Resend Verification
                    </Button>
                  }
                  <br />
                  Verification time left: {verificationTimer}
                  <br />
                  <br />
                </div>
              }
            <Button
              color="inherit"
              variant="contained"
              onClick={handleChangingPasswordClick}
            >
              Change Password
            </Button><br />

            {
              changingPassword &&
              <div>
                <TextField  label="New Password" type="password" variant="outlined"
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                    handlePassword1Change(event.target.value);
                  }}
                />
                <TextField  label="Confirm New Password" type="password" variant="outlined"
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                    handlePassword2Change(event.target.value);
                  }}
                />
              </div>
            }
          </div>
        }
        <br/>
        Add Login Methods <b>(which will be locked to this Bliztkarte account forever)</b>: <br />
        {
          !data.email &&
          <Button color="error"
            variant="contained"
            onClick={() => { handleEnableAddEmailProviderClick(); }}
          >
            <span className="firebaseui-idp-text firebaseui-idp-text-long">Email</span>
          </Button>
        }
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
            <TextField  label="Email" variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                handleEmailChange(event.target.value);
              }}
            /><br />
            <TextField  label="Password" type="password" variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                handlePassword1Change(event.target.value);
              }}
            />
            <TextField  label="Confirm Password" type="password" variant="outlined"
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

  return (
    <StallGlobe mode="error" />
  )
}

export default DashboardBody;