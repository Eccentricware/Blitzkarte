import React, { FC, Fragment, useState } from 'react';
import { AppBar, Box, Button, Container, Menu, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FirebaseService } from '../../utils/firebase/firebaseService';

interface AppBarProps {
  title: string;
}

export const NavBarSignedOut: FC<AppBarProps> = ({ title }: AppBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailure, setLoginFailure] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const router = useRouter();
  const firebaseService = new FirebaseService();

  const isMenuOpen = Boolean(anchorEl);

  const handleSignInMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  const handleSignInWithEmailClick = () => {
    firebaseService.signInWithEmail(email, password)
      .then((result: any) => {
        console.log('Email Result', result);
        if (result.hasUsername === true) {
          router.push('/dashboard');
        }
        setLoginFailure(true);
      })
      .catch((error: Error) => {
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
    >
      <MenuItem>
        <TextField id="outlined-basic"
          label="Email"
          variant="outlined"
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
            handleEmailChange(event.target.value);
          }}
        />
      </MenuItem>
      <MenuItem>
        <TextField id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          error={loginFailure ? true : false}
          helperText={loginFailure ? 'Incorrect Login Credentials' : ''}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
            handlePasswordChange(event.target.value);
          }}
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
        <Button onClick={handleSignInWithEmailClick}>&gt;</Button>
        <Button onClick={handleGoogleLoginClick}>G</Button>
        <Button onClick={handleFacebookLoginClick}>F</Button>
        <Button onClick={handleMenuClose}>X</Button>
      </MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Container>
            <Button color="inherit"
              disabled
            >
              Spectate Game
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