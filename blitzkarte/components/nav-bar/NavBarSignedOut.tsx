import { FC, Fragment, useState } from 'react';
import { AppBar, Button, Menu, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';

interface AppBarProps {
  title: string;
}

export const NavBarSignedOut: FC<AppBarProps> = ({ title }: AppBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();

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
        <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth/>
      </MenuItem>
      <MenuItem>
        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth/>
      </MenuItem>
      <MenuItem>
        <Button>&gt;</Button>
        <Button >G</Button>
        <Button>F</Button>
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