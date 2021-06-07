import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AppBar,  Box,  IconButton,  Toolbar, Typography } from '@material-ui/core';

import { isDrawerOpenVar, userVar } from 'src/utils/cache';
import { DownArrowIcon, MenuIcon, UserIcon } from 'src/components/icons';
import { useReactiveVar } from '@apollo/client';

export const HEADER_HEIGHT = 64;

export default function Header() {
  const userMenuId = 'user-settings-menu';
  const isDrawerOpen = useReactiveVar(isDrawerOpenVar);
  const user = useReactiveVar(userVar);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);

  const userMenuOpen = Boolean(userMenuAnchorEl);

  const onLogout = () => {
    localStorage.removeItem('uToken');
    userVar(undefined);
  }
  const handleDrawerOpenClose = () => {
    isDrawerOpenVar(!isDrawerOpen);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  }
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  console.log(user);

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 10, backgroundColor: '#324e88' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open or close drawer"
            onClick={handleDrawerOpenClose}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <UserIcon />
          <Typography variant="body1" sx={{ marginLeft: 1 }}>{user?.name}</Typography>
          <IconButton
            color="inherit"
            aria-label="show more"
            aria-controls={userMenuId}
            aria-haspopup="true"
            onClick={handleUserMenuOpen}
            sx={{ marginX: 1 }}
          >
            <DownArrowIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        id={userMenuId}
        keepMounted
        anchorEl={userMenuAnchorEl}
        onClose={handleUserMenuClose}
        open={userMenuOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}