import React, { KeyboardEvent, ChangeEvent, createRef, FC, KeyboardEventHandler, useRef, useState } from 'react';
import { AppBar, Box, Button, Container, Menu, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FirebaseService } from '../../utils/firebase/firebaseService';
import { Facebook, Google } from '@mui/icons-material';

interface AppBarProps {
  title: string;
}

export const NavBarSignedOut: FC<AppBarProps> = ({ title }: AppBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailure, setLoginFailure] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const passwordFieldRef = createRef<HTMLDivElement>();

  const router = useRouter();
  const firebaseService = new FirebaseService();

  const isMenuOpen = Boolean(anchorEl);

  const handleSignInMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
    setLoginFailure(false);
  }

  const handleSignupClick = () => {
    router.push('/signup');
  }

  const handleEmailChange = (email: string) => {
    setEmail(email);
  }

  const handlePasswordChange = (password: string) => {
    setPassword(password);
  }

  const handlePasswordResetClick = () => {
    firebaseService.resetPassword(email)
      .then((success) => {
        setPasswordResetSent(success);
      });
  }

  const keyEmailKeyDownEvent = (event: KeyboardEvent<HTMLDivElement>) => {
    if (['Enter', 'Tab'].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
      if (passwordFieldRef.current) {
        passwordFieldRef.current.focus();
      }
    }
  };

  const keyPasswordKeyDownEvent = (event: KeyboardEvent<HTMLDivElement>) => {
    console.log(event.code);
    if (event.code === 'Enter') {
      handleSignInWithEmailClick();
    }
  };

  const handleSignInWithEmailClick = () => {
    firebaseService.signInWithEmail(email, password)
      .then((result: any) => {
        console.log('Email Result', result);
        if (result.hasUsername === true) {
          router.push('/dashboard');
        }
        setLoginFailure(false);
      })
      .catch((error: Error) => {
        setLoginFailure(true);
        console.log(error.message);
      });
  }

  const handleGoogleLoginClick = () => {
    const signInResult: Promise<any> = firebaseService.signInWithGoogle();
    signInResult.then((result: any) => {
      console.log('Google Sign in result', result.hasUsername)
      if (result.hasUsername === true) {
        router.push('/dashboard');
      } else {
        router.push('/signup');
      }
    })
    .catch((error: Error) => {
      console.log(error.message);
    });
  }

  const handleFacebookLoginClick = () => {
    const signInResult: Promise<any> = firebaseService.signInWithFacebook();
    signInResult.then((result: any) => {
      console.log('Facebook Result', result.hasUsername)
      if (result.hasUsername === true) {
        router.push('/dashboard');
      } else {
        router.push('/signup');
      }
    })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }

  const loginMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
      onClose={() => {
        handleMenuClose()
      }}
    >
      <MenuItem>
        <TextField className="outlined-basic"
          label="Email"
          variant="outlined"
          tabIndex={0}
          fullWidth
          onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => {
            handleEmailChange(event.target.value);
          }}
          onKeyDown={keyEmailKeyDownEvent}
        />
      </MenuItem>
      <MenuItem>
        <TextField className="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          tabIndex={1}
          error={loginFailure ? true : false}
          helperText={loginFailure ? 'Incorrect Login Credentials' : ''}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => {
            handlePasswordChange(event.target.value);
          }}
          onKeyDown={keyPasswordKeyDownEvent}
          inputRef={passwordFieldRef}
        />
      </MenuItem>
      {
        loginFailure &&
        <MenuItem>
          <Button
            disabled={passwordResetSent ? true : false}
            onClick={handlePasswordResetClick}>
            {
              passwordResetSent ?
              'Sent Password Reset Email'
              : 'Reset Password?'
            }
          </Button>
        </MenuItem>
      }
      <MenuItem>
        <Button onClick={handleGoogleLoginClick}><Google color='success'/></Button>
        <Button onClick={handleFacebookLoginClick} disabled={true}><Facebook/></Button>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" style={{maxHeight: 45}}>
        <Toolbar style={{minHeight: 45}}>
          <Container>
            <Button color="inherit"
              disabled={router.pathname === '/'}
              onClick={() => {
                router.push('/');
              }}
            >
              Landing Page
            </Button>
          </Container>

          <Container>
            <Typography variant="h6"
              noWrap
              component="div"
              align="center"
            >
              Blitzkarte
            </Typography>
          </Container>

          <Container>
            <Typography align="right" variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button
                onClick={handleSignInMenuOpen}
                color="inherit"
              >
                Sign In
              </Button>
              <Button
                color="inherit"
                onClick={handleSignupClick}
              >
                Sign Up
              </Button>
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
      {loginMenu}
    </Box>
  )
}