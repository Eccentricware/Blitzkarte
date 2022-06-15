import React, { FC, Fragment, useState } from 'react';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { getAuth, signOut } from 'firebase/auth';

interface AppBarProps {
  title: string;
}

export const NavBarSignedIn: FC<AppBarProps> = ({title}: AppBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log('url', router.pathname);
  }

  const handleProfileMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  }

  const handleGameSelectionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log('url', router.pathname);
  }

  const handleGameSelectionMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  }

  const handleSignOutClick = () => {
    const auth = getAuth();
    signOut(auth);
    router.push('/');
  }

  const handleDashboardClick = () => {
    router.push('/dashboard');
  }

  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
    >
      {router.pathname !== '/dashboard' &&
        <MenuItem>
          <Button onClick={handleDashboardClick}>Dashboard</Button>
        </MenuItem>
      }
      <MenuItem>
        <Button onClick={handleSignOutClick}>Log Out</Button>
        <Button onClick={handleProfileMenuClose}>X</Button>
      </MenuItem>
    </Menu>
  );

  const gameSelectionMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
    >
      {/* {router.pathname !== '/dashboard' &&
        <MenuItem>
          <Button onClick={handleDashboardClick}>Dashboard</Button>
        </MenuItem>
      } */}
      <MenuItem>
        {/* <Button onClick={handleSignOutClick}>Log Out</Button> */}
        <Button onClick={handleGameSelectionMenuClose}>X</Button>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Container>
            <Typography align="left" variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Next Deadline
            </Typography>
          </Container>
            {gameSelectionMenu}
          <Container>

          <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blitzkarte
          </Typography>
          </Container>
          <Container>
            <Typography align="right" variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button
                disabled
                color="inherit"
              >
                Alerts
              </Button>
              <Button
                disabled
                color="inherit"
              >
                Messages
              </Button>
              <Button
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                Person Icon
              </Button>
            </Typography>

          </Container>
        </Toolbar>
        {/* <Toolbar>
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
            disabled
            color="inherit"
          >
            Alerts
          </Button>
          <Button
            disabled
            color="inherit"
          >
            Messages
          </Button>
          <Button
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            Person Icon
          </Button>
        </Toolbar> */}
      </AppBar>
      {profileMenu}
    </Box>
  )
}