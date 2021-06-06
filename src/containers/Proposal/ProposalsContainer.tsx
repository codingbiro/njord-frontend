import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom';

import ProposalsPage from './ProposalsPage';

function ProposalsContainer({ match }: RouteComponentProps) {
  return(
    <Paper>
      <Switch>
        <Route path={`${match.path}/`} component={ProposalsPage} />
        <Redirect to={`${match.path}/`} />
      </Switch>
      <Box>
        <Typography variant="body1">
          Proposals Containers
        </Typography>
      </Box>
    </Paper>
  );
}

export default ProposalsContainer;
