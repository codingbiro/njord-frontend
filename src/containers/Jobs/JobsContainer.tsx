import React from 'react';
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom';

import DefaultContainer from 'src/containers/Default';
import JobsPage from './JobsPage';

export default function JobsContainer({ match }: RouteComponentProps) {
  return (
    <DefaultContainer>
      <Switch>
        <Route path={`${match.path}/`} component={JobsPage} />
        <Redirect to={`${match.path}/`} />
      </Switch>
    </DefaultContainer>
  );
}
