import React from 'react';
import { Box } from '@material-ui/core';

import WithChildren from 'src/utils/withChildren';
import Css from 'src/utils/css';
import HeaderMenu from './HeaderMenu';

const containerStyles: Css = {
  backgroundColor: "cadetblue",
  height: '100vh'
};

function DefaultContainer({ children }: WithChildren) {
  return (
    <Box sx={containerStyles}>
      <HeaderMenu />
      {children}
    </Box>
  );
}

export default DefaultContainer;
