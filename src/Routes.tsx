import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import PrivateRoute from 'src/components/PrivateRoute';
import ProposalContainer from 'src/containers/Proposal';
import AuthContainer from 'src/containers/Auth';
import userVar from './utils/cache';
import DefaultContainer from './containers/Default';

function Routes() {
  const user = useReactiveVar(userVar);

  return (
    <DefaultContainer>
      <Switch>
        <Route path="/auth" component={AuthContainer} />
        <PrivateRoute path="/proposals" component={ProposalContainer} user={!!user} />
        <Redirect to="/auth" />
      </Switch>
    </DefaultContainer>
  );
};

export default Routes;
