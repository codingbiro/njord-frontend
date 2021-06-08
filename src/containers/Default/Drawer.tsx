import React from 'react';
import Box from '@material-ui/core/Box';
import DrawerMUI from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Typography } from '@material-ui/core';
import { useReactiveVar } from '@apollo/client';

import { isDrawerOpenVar } from 'src/utils/cache';
import Css from 'src/utils/css';

export const DRAWER_WIDTH = 240;

const isActive = (path: string) => window.location.pathname.startsWith(path.toLowerCase());

const listItemStyles: (isActive: boolean) => Css = (isActive) => ({
  backgroundColor: isActive ? '#91b2d0' : undefined,
  color: isActive ? '#1b2a49' : '#91b2d0',
  '&:hover': {
    backgroundColor: '#bdd0e2',
    color: '#1b2a49',
  }
});

const listItemTextStyles: Css = {
  fontSize: '26px',
  fontWeight: 700,
};

const drawerStyles: Css = {
  zIndex: 1,
  backgroundColor: 'transparent',
  width: DRAWER_WIDTH,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    backgroundColor: '#1b2a49',
  },
};

export default function Drawer() {
  const isDrawerOpen = useReactiveVar(isDrawerOpenVar)

  return (
    <DrawerMUI
      variant="persistent"
      open={isDrawerOpen}
      sx={drawerStyles}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {['Dashboard', 'Jobs'].map((text) => (
            <ListItem button key={text} sx={listItemStyles(isActive(`/${text}`))}>
              <Typography sx={listItemTextStyles}>{text}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </DrawerMUI>
  );
}
