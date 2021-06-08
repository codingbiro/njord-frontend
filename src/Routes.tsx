import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import PrivateRoute from 'src/components/PrivateRoute';
import JobsContainer from 'src/containers/Jobs';
import AuthContainer from 'src/containers/Auth';
import { userVar } from './utils/cache';

export default function Routes() {
  const user = useReactiveVar(userVar);

  return (
    <Switch>
      <Route path="/auth" component={AuthContainer} />
      <PrivateRoute path="/jobs" component={JobsContainer} user={!!user} />
      <Redirect to="/auth" />
    </Switch>
  );
};
