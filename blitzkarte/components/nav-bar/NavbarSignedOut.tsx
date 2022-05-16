import { FC, Fragment, useState } from 'react';
import { AppBar, Button, Menu, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import { Router, useRouter } from 'next/router';

interface AppBarProps {

}

export const NavBarSignedOut: FC<AppBarProps> = () => {
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

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      open={isMenuOpen}
    >
      <MenuItem>
        <TextField id="outlined-basic" label="Username" variant="outlined" />
      </MenuItem>
      <MenuItem>
        <TextField id="outlined-basic" label="Password" variant="outlined" />
      </MenuItem>
      <MenuItem>
        <Button>Login</Button>
        <Button onClick={handleMenuClose}>Cancel</Button>
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
            Login
          </Button>
          <Button
            color="inherit"
            onClick={handleSignupClick}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Fragment>
  )
}