import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';

import WithChildren from 'src/utils/withChildren';
import { whoami } from 'src/requests/auth';
import { userVar } from 'src/utils/cache';

function AutoLogIn({ children }: WithChildren) {
  const skip = window.location.pathname.startsWith('/auth');
  const [signingIn, setSigningIn] = useState(!skip);

  useEffect(() => {
    if (skip) {
      return;
    }
    async function checkLoginStatus() {
      try {
        const response = await whoami();
        if (!response) throw Error('Auth failed');
        if (response.headers['authorization']) localStorage.setItem('uToken', response.headers['authorization']);
        userVar(response.data);
      } catch (e) {
        userVar(undefined);
      }
      setSigningIn(false);
    }
    checkLoginStatus();
  }, [skip]);

  return <>{signingIn ? <Typography>Signing In...</Typography> : <>{children}</>}</>;
}

export default AutoLogIn;
