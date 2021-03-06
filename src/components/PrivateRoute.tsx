import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';

interface IProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  path: string;
  user: boolean;
  exact?: boolean;
}

function PrivateRoute({
  component: Comp, path, user, exact, ...rest
}: IProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const routeComponent = (props: any) => (user ? <Comp {...props} /> : <Redirect to={{ pathname: '/auth/login' }} />);
  return <Route path={path} exact={exact} {...rest} render={routeComponent} />;
}

export default PrivateRoute;
