import React from 'react';
import { Box, CssBaseline } from '@material-ui/core';

import WithChildren from 'src/utils/withChildren';
import Css from 'src/utils/css';
import HeaderMenu, { HEADER_HEIGHT } from './HeaderMenu';
import Drawer from './Drawer';

const containerStyles: Css = {
  backgroundColor: "cadetblue",
  height: '100vh',
  display: "flex",
};

const childrenContainerStyles: Css = {
  marginTop: `${HEADER_HEIGHT}px`,
}

interface IProps {
  hideNavigation?: boolean;
}

function DefaultContainer({ children, hideNavigation }: WithChildren<IProps>) {
  return (
    <Box sx={containerStyles}>
      <CssBaseline />
      {!hideNavigation && <HeaderMenu />}
      {!hideNavigation && <Drawer />}
      <Box sx={childrenContainerStyles}>
        {children}
      </Box>
    </Box>
  );
}

export default DefaultContainer;
