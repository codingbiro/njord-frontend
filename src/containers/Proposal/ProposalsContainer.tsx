import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom';

import DefaultContainer from 'src/containers/Default';
import ProposalsPage from './ProposalsPage';

function ProposalsContainer({ match }: RouteComponentProps) {
  return (
    <DefaultContainer>
      <Switch>
        <Route path={`${match.path}/`} component={ProposalsPage} />
        <Redirect to={`${match.path}/`} />
      </Switch>
      <Box>
        <Typography variant="body1">
          Proposals Containers
        </Typography>
      </Box>
    </DefaultContainer>
  );
}

export default ProposalsContainer;
