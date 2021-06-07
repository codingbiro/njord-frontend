import React from 'react';
import { Box } from '@material-ui/core';
import { Switch, Redirect, Route, RouteComponentProps } from 'react-router-dom';

import Css from 'src/utils/css';
import DefaultContainer from 'src/containers/Default';
import LoginPage from './LoginPage';

const containerStyles: Css = {
  height: '100%',
  width: '100%',
  display:'flex',
  alignContent:'center',
  justifyContent:'center',
  backgroundImage: 'url(/authBackground.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}

function AuthContainer({ match }: RouteComponentProps) {  
  return (
    <DefaultContainer hideNavigation>
      <Box sx={containerStyles}>
        <Switch>
          <Route path={`${match.path}/login`} component={LoginPage} />
          <Redirect to={`${match.path}/login`} />
        </Switch>
      </Box>
    </DefaultContainer>
  );
}

export default AuthContainer;
