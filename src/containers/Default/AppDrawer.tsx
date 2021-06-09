import React from 'react';
import { Box, Drawer, List, ListItem, Toolbar, Typography } from '@material-ui/core';
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

const drawerLinks = ['Dashboard', 'Job Ads'] as const;;

const drawerLinkMap: Record<typeof drawerLinks[number], string> = {
  'Dashboard': 'dashboard',
  'Job Ads': 'jobs',
};

export default function AppDrawer() {
  const isDrawerOpen = useReactiveVar(isDrawerOpenVar)

  return (
    <Drawer
      variant="persistent"
      open={isDrawerOpen}
      sx={drawerStyles}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {drawerLinks.map((text) => (
            <ListItem button key={text} sx={listItemStyles(isActive(`/${drawerLinkMap[text]}`))}>
              <Typography sx={listItemTextStyles}>{text}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
