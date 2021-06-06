import React from 'react';
import Box from '@material-ui/core/Box';
import DrawerMUI from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useReactiveVar } from '@apollo/client';

import { isDrawerOpenVar } from 'src/utils/cache';

export const DRAWER_WIDTH = 240;

const isActive = (path: string) => window.location.pathname.startsWith(path.toLowerCase());

export default function Drawer() {
  const isDrawerOpen = useReactiveVar(isDrawerOpenVar)

  return (
      <DrawerMUI
        variant="persistent"
        open={isDrawerOpen}
        sx={{
          zIndex: 1,
          backgroundColor: 'transparent',
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: 'border-box', backgroundColor: '#1b2a49' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Proposals'].map((text, index) => (
              <ListItem button key={text} sx={isActive(`/${text}`) ? { backgroundColor: '#91b2d0' } : undefined}>
                <ListItemText primary={text} sx={{ fontSize: '26px' }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </DrawerMUI>
  );
}
