import { Button, FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';
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
import { CredentialValidator } from '../../utils/general/credentialValidator';
import { TimeZoneSelector } from '../game-details-page/TimeZoneSelector';
import { GameStatus } from '../../models/enumeration/game-status-enum';

interface DashboardBodyProps {
  user: User | null;
}

const DashboardBody: FC<DashboardBodyProps> = ({user}: DashboardBodyProps) => {
  const firebaseCtx = useContext(Blitzkontext).user;
  const firebaseService = new FirebaseService();

  const [showLoginCredentials, setShowLoginCredentials] = useState(true);
  const [presentAddEmail, setPresentAddEmail] = useState(false);
  const [changingEmail, setChangingEmail] = useState(false);
  const [changeEmailSubmitted, setChangeEmailSubmitted] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentEmailValid, setCurrentEmailValid] = useState(true);
  const [newEmail, setNewEmail] = useState('');
  const [newEmailValid, setNewEmailValid] = useState(true);
  const [providerEmail, setProviderEmail] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [password1, setPassword1] = useState('');
  const [password1Valid, setPasswor1Valid] = useState(true);
  const [password2, setPassword2] = useState('');
  const [password2Valid, setPassword2Valid] = useState(true);
  const [passwordChangeSent, setPasswordChangeSent] = useState(false);
  const [emailValidated, setEmailValidated] = useState(true);
  const [verificationTimer, setVerificationTimer] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [timeZone, setTimeZone] = useState('America/Los_Angeles');
  const [meridiemTime, setMeridiemTime] = useState(true);
  const router = useRouter();

  const { isLoading, error, data, isFetching } = useQuery('userProfile', () => {
    return user?.getIdToken().then((idToken: string) => {
      return fetch(`${erzahler.url}:${erzahler.port}/get-user-profile/${idToken}`)
        .then((response) => {
          console.log('Dashboard body response:', response);
          return response.json();
        }).then((result) => {
          console.log('Dashboard Body Result:', result);
          result.idToken = idToken;
          return result;
        })
        .catch((error: Error) => {
          console.log('Dashboard Body Error:', error.message);
          router.push('/');
        });
      });
  });

  const timeZoneOps = {
    getTimeZone: timeZone,
    setTimeZone: setTimeZone
  };

  const queryClient: QueryClient = useQueryClient();

  const updateTimeZone = (timeZoneName: string) => {
    setTimeZone(timeZoneName);
  }

  useEffect(() => {
    if (data) {
      if (data.email && !data.emailVerified) {
        setInterval(() => {
          setVerificationTimer(deadlineTimer(data.verificationDeadline, 'minutes'));
        }, 1000);
      }

      setTimeZone(data.timeZone);
      setMeridiemTime(data.meridiemTime);
    }
  }, [data, user]);

  const saveProfileChanges = () => {
    fetch(`${erzahler.url}:${erzahler.port}/update-user-settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        idToken: data.idToken
      },
      body: JSON.stringify({
        timeZone: timeZone,
        meridiemTime: meridiemTime
      })
    });
  }

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
    const emailValidator = new CredentialValidator(currentEmail);
    setCurrentEmail(currentEmail);
    if ((emailValidator.emailValid)) {
      setCurrentEmailValid(true);
    } else {
      setCurrentEmailValid(false);
    }
  }

  const handleNewEmailChange = (newEmail: string) => {
    const emailValidator = new CredentialValidator(newEmail);
    setNewEmail(newEmail);
    if ((emailValidator.emailValid)) {
      setNewEmailValid(true);
    } else {
      setNewEmailValid(false);
    }
  }

  const handleResendEmailVerificationClick = () => {
    firebaseService.resendEmailVerification();
    setVerificationSent(true);
  }

  const handlePassword1Change = (password1: string) => {
    setPassword1(password1);
    if (password1.length < 6) {
      setPasswor1Valid(false);
    } else {
      setPasswor1Valid(true);
    }
  }

  const handlePassword2Change = (password2: string) => {
    setPassword2(password2);
    if (password1 !== password2) {
      setPassword2Valid(false);
    } else {
      setPassword2Valid(true);
    }
  }

  const handleEnableAddEmailProviderClick = () => {
    setPresentAddEmail(!presentAddEmail);
  };

  const handleAddEmailProviderSubmitClick = () => {
    if (firebaseCtx.auth && newEmailValid && password1Valid && password2Valid) {
      firebaseService.addEmailProvider(newEmail, password1, data.username)
        .then((result: any) => {
          console.log('Add email provider result:', result);
          if (result.success === true) {
            router.reload();
          }
        })
        .catch((error: Error) => {
          console.log(error.message);
        });
    } else {
      console.log('No firebase auth?!');
    }
  };

  const handleAddGoogleProviderClick = () => {
    const result = firebaseService.addGoogleProvider(data.username);
    console.log('Add Google Provider result', result);
  };

  const handleAddFacebookProviderClick = () => {
    const result = firebaseService.addFacebookProvider(data.username);
    console.log('Add FacebookProvider Result', result);
  };

  const handleMeridiemTimeChange = () => {
    setMeridiemTime(!meridiemTime);
  };

  if (isFetching) {
    return <StallGlobe mode="querying" message={'DashBoardBody: Fetching'}/>
  }

  if (isLoading) {
    return <StallGlobe mode="querying" message={'DashBoardBody: Loading'}/>
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
        Welcome, {data.username}<br />
        <br />
        {
          data.email &&
          <div>
            Email: {data.email}<br />
            {
              (!changeEmailSubmitted && data.emailVerified === true) ?
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
                      error={!currentEmailValid}
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                        handleCurrentEmailChange(event.target.value);
                      }}
                    /><br />
                    <TextField
                      label="New Email"
                      variant="outlined"
                      error={!newEmailValid}
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
              (!data.emailVerified) &&
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
                {data.verificationDeadline && `Verification time left: ${verificationTimer}`}
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
            <TextField
              required
              label="Email"
              variant="outlined"
              error={!newEmailValid}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                handleNewEmailChange(event.target.value);
              }}
            /><br />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              error={!password1Valid}
                helperText={!password1Valid && password1.length > 0 ? "Too short" : null}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
                handlePassword1Change(event.target.value);
              }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              error={!password2Valid}
              helperText={!password2Valid && password2.length > 0 ? "Passwords don't match" : null}
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
        <FormGroup>
          <FormControlLabel
            label="AM/PM Time"
            labelPlacement="start"
            control={
              <Switch
                checked={meridiemTime}
                onChange={handleMeridiemTimeChange}
              />
            }
          />
        </FormGroup>
        <TimeZoneSelector timeZoneOps={timeZoneOps}/>
        <Button color="success"
          variant="contained"
          onClick={() => { saveProfileChanges(); }}
        >
          <span>Save</span>
        </Button>
      </div>
    )
  }

  return (
    <StallGlobe mode="error" message="DashBoardBody: Return"/>
  )
}

export default DashboardBody;