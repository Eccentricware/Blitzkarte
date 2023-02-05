import React, { FC, useState } from 'react';
import { AppBar, Badge, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useRouter } from 'next/router';
import { getAuth, signOut } from 'firebase/auth';

interface AppBarProps {
  title: string;
}

export const NavBarSignedIn: FC<AppBarProps> = ({title}: AppBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [gameSelectionMenuOpen, setGameSelectionMenuOpen] = useState(false);
  const router = useRouter();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setProfileMenuOpen(true);
  }

  const handleProfileMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    setProfileMenuOpen(false);
  }

  const handleGameSelectionMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setGameSelectionMenuOpen(true);
  }

  const handleGameSelectionMenuClose = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
    setGameSelectionMenuOpen(false);
  }

  const handleSignOutClick = () => {
    const auth = getAuth();
    signOut(auth);
    router.push('/');
  }

  const handleDashboardClick = () => {
    router.push('/dashboard');
  }

  const handleNewGameClick = () => {
    router.push('/create-game');
  }

  const handleFindGameClick = () => {
    router.push('/game-finder');
  }

  const profileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={profileMenuOpen}
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
        horizontal: 'left'
      }}
      open={gameSelectionMenuOpen}
    >
      {
        router.pathname !== '/create-game' &&
        <MenuItem>
          <Button onClick={handleNewGameClick}>New Game</Button>
        </MenuItem>
      }
      {
        router.pathname !== '/game-finder' &&
        <MenuItem>
          <Button onClick={handleFindGameClick}>Find Game</Button>
        </MenuItem>
      }
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
            <Button color="inherit"
              disabled
              onClick={handleGameSelectionMenuOpen}
            >
              Navigation
            </Button>
          </Container>

          <Container>
            <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blitzkarte
            </Typography>
          </Container>

          <Container>
            <Typography align="right" variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <IconButton color="inherit" disabled>
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit" disabled>
                <Badge badgeContent={0} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit"
                onClick={handleProfileMenuOpen}
              >
                <Badge badgeContent={0} color="error">
                  <AccountCircle />
                </Badge>
              </IconButton>
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
      {gameSelectionMenu}
      {profileMenu}
    </Box>
  )
}