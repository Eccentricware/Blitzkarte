import { AppBar, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';

interface AppBarProps {

}

export const NavBar: FC<AppBarProps> = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6"
          noWrap
          component="div"
        >
          Blitzkarte
        </Typography>
      </Toolbar>
    </AppBar>
  )
}