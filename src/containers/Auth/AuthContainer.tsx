import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom';

import LoginPage from './LoginPage';

function AuthContainer({ match }: RouteComponentProps) {
  return(
    <Paper>
      <Switch>
        <Route path={`${match.path}/login`} component={LoginPage} />
        <Redirect to={`${match.path}/login`} />
      </Switch>
      <Box>
        <Typography variant="body1">
          Auth Container
        </Typography>
      </Box>
    </Paper>
  );
}

export default AuthContainer;
