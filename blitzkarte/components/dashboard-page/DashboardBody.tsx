import { Grid } from '@mui/material';
import React from 'react';
import { User } from 'firebase/auth';
import { FC } from 'react';
import { NavBarSignedIn } from '../nav-bar/NavBarSignedIn';
import UserSettings from './UserSettings';
import DashboardGames from './DashboardGames';

interface DashboardBodyProps {
  user: User | null;
}

const DashboardBody: FC<DashboardBodyProps> = ({user}: DashboardBodyProps) => {
  return (
    <div>
      <NavBarSignedIn title={`User Dashboard`} />
      <Grid container spacing={1}>
        <Grid item xs={8}>
          {/* <div style={{textAlign: 'center'}}>
            <h3>Alerts</h3>
          </div> */}
          <DashboardGames user={user}/>
        </Grid>
        {/* <Grid item xs={4}>
          <div style={{textAlign: 'center'}}>
            <h3>Messages</h3>
          </div>
        </Grid> */}
        <Grid item xs={4}>
          <UserSettings user={user}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default DashboardBody;