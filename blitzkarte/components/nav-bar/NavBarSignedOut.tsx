import { FC, Fragment, useState } from 'react';
import { AppBar, Button, Menu, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FirebaseService } from '../../utils/firebase/firebaseService';

interface AppBarProps {
  title: string;
}

export const NavBarSignedOut: FC<AppBarProps> = ({ title }: AppBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const firebaseService = new FirebaseService();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const handleSignupClick = () => {
    router.push('/signup');
  }

  const handleUsernameOrEmailLoginClick = () => {
    console.log('Email login');
  }

  const handleGoogleLoginClick = () => {
    const signInResult: Promise<any> = firebaseService.signInWithGoogle();
    signInResult.then((result: any) => {
      console.log('Result', result)
      if (result.length === 1) {
        router.push('/dashboard');
      }
      router.push('/signup');
    })
    .catch((error: Error) => {
      console.log(error.message);
    });
  }

  const handleFacebookLoginClick = () => {
    const signInResult: Promise<any> = firebaseService.signInWithFacebook();
    signInResult.then((result: any) => {
      console.log('Result', result)
      if (result.length === 1) {
        router.push('/dashboard');
      }
      router.push('/signup');
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
        <TextField id="outlined-basic" label="Username / Email" variant="outlined" fullWidth/>
      </MenuItem>
      <MenuItem>
        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth/>
      </MenuItem>
      <MenuItem>
        <Button onClick={handleUsernameOrEmailLoginClick}>&gt;</Button>
        <Button onClick={handleGoogleLoginClick}>G</Button>
        <Button onClick={handleFacebookLoginClick}>F</Button>
        <Button onClick={handleMenuClose}>X</Button>
      </MenuItem>
    </Menu>
  )

  return (
    <Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6"
            noWrap
            component="div"
          >
            Blitzkarte
          </Typography>
          <Typography variant="h6"
            noWrap
            component="div"
          >
            {title}
          </Typography>
          <Button
            onClick={handleProfileMenuOpen}
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
        </Toolbar>
      </AppBar>
      {loginMenu}
    </Fragment>
  )
}