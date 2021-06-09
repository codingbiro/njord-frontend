import React from 'react';
import { Box, CssBaseline } from '@material-ui/core';

import WithChildren from 'src/utils/withChildren';
import Css from 'src/utils/css';
import Header, { HEADER_HEIGHT } from './Header';
import AppDrawer from './AppDrawer';

const containerStyles: Css = {
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const childrenContainerStyles: (hideNavigation: boolean) => Css = (hideNavigation) => ({
  marginTop: `${hideNavigation ? 0 : HEADER_HEIGHT}px`,
  height: `calc(100vh - ${hideNavigation ? 0 : HEADER_HEIGHT}px)`,
});

interface IProps {
  hideNavigation?: boolean;
}

export default function DefaultContainer({ children, hideNavigation }: WithChildren<IProps>) {
  return (
    <Box sx={containerStyles}>
      <CssBaseline />
      {!hideNavigation && <Header />}
      {!hideNavigation && <AppDrawer />}
      <Box sx={childrenContainerStyles(!!hideNavigation)}>
        {children}
      </Box>
    </Box>
  );
}
