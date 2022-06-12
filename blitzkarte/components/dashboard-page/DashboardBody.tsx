import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { User } from 'firebase/auth';
import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
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

  const [presentAddEmail, setPresentAddEmail] = useState(false);
  const [changingEmail, setChangingEmail] = useState(false);
  const [changeEmailSubmitted, setChangeEmailSubmitted] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [providerEmail, setProviderEmail] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordChangeSent, setPasswordChangeSent] = useState(false);
  const [emailValidated, setEmailValidated] = useState(true);
  const [verificationTimer, setVerificationTimer] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const router = useRouter();

  const queryClient: QueryClient = useQueryClient();

  const { isLoading, error, data, isFetching } = useQuery('userProfile', () => {
    return user?.getIdToken().then((idToken: string) => {
      return fetch(`${erzahler.url}:${erzahler.port}/get-user-profile/${idToken}`)
        .then((response) => {
          console.log('Dashboard body response', response);
          return response.json();
        }).then((result) => {
          console.log('Dashboard Body Result', result);
          return result;
        })
        .catch((error: Error) => {
          console.log('idToken Error', error.message);
          router.push('/');
        });
      });
  });

  useEffect(() => {
    if (data && data.email && !data.email_verified) {
      setInterval(() => {
        setVerificationTimer(deadlineTimer(data.verification_deadline, 'minutes'));
      }, 1000);
    }
  }, [data, user])

  const handleChangingEmailClick = () => {
    setChangingEmail(!changingEmail);
  }

  const handleSubmitChangeEmailClick = () => {
    firebaseService.changeEmail(currentEmail, newEmail, password1)
      .then(() => {
        router.reload();
      })
      .catch((error: Error) => {
        console.log('Change Email Error:', error.message);
      });
  }

  const handlePasswordResetClick = () => {
      firebaseService.resetPassword(currentEmail);
      setPasswordChangeSent(true);
  }

  const handleCurrentEmailChange = (currentEmail: string) => {
    setCurrentEmail(currentEmail);
  }

  const handleNewEmailChange = (newEmail: string) => {
    setNewEmail(newEmail);
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

  const handleEnableAddEmailProviderClick = () => {
    setPresentAddEmail(!presentAddEmail);
  };

  const handleAddEmailProviderSubmitClick = () => {
    if (firebase.auth) {
      firebaseService.addEmailProvider(firebase.auth, newEmail, password1);
    }
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
    return <StallGlobe mode="querying" message='DashBoardBody: Fetching'/>
  }

  if (isLoading) {
    return <StallGlobe mode="querying" message='DashBoardBody: Loading'/>
  }

  if (error) {
    return <StallGlobe mode="error" message={'DashBoardBody: Error'}/>
  }

  if (data) {
    console.log('user', user);
    console.log('data', data);
    return (
      <div>
        <NavBarSignedIn title={`User Dashboard`} />
        Welcome, {data && data.username}<br />
        <br />
        {
          data.email &&
          <div>
            Email: {data.email} {data.user_status === 'changingEmail' && ` => ${providerEmail}`}<br />
            {
              (!changeEmailSubmitted && data.email_verified === true) ?
              <React.Fragment>
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
                    <h3 style={{color: 'red'}}>Enter Information To Confirm Email Change!</h3>
                    <TextField
                      label="Current Email"
                      variant="outlined"
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                        handleCurrentEmailChange(event.target.value);
                      }}
                    /><br />
                    <TextField
                      label="New Email"
                      variant="outlined"
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                        handleNewEmailChange(event.target.value);
                      }}
                    /><br />
                    <TextField label="Enter Password" type="password" variant="outlined"
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                        handlePassword1Change(event.target.value);
                      }}
                    />
                    <br />
                    <Button
                      color="inherit"
                      variant="contained"
                      onClick={() => { handleSubmitChangeEmailClick(); }}
                    >
                      Submit Change
                    </Button><br />
                  </React.Fragment>
                }
              </React.Fragment>
              :
              <React.Fragment>
                <Button
                  color="inherit"
                  variant="contained"
                  disabled={true}
                  onClick={() => { handleSubmitChangeEmailClick(); }}
                >
                  Unverified Emails Cant Be Changed
                </Button><br />
              </React.Fragment>
            }
            <br/>
            {
              (!data.email_verified) &&
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
                {data.verification_deadline && `Verification time left: ${verificationTimer}`}
                <br />
                <br />
              </div>
            }
            {
              passwordChangeSent ?
              <Button
              color="inherit"
              variant="contained"
              disabled
            >
              Password Change Email Sent
            </Button>
            :
            <Button
              color="inherit"
              variant="contained"
              onClick={handlePasswordResetClick}
            >
              Change Password
            </Button>
            }
              <br />
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
                handleNewEmailChange(event.target.value);
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
    <StallGlobe mode="error" message="DashBoardBody: Return"/>
  )
}

export default DashboardBody;