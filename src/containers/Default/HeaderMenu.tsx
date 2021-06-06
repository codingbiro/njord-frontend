import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AppBar,  IconButton,  Toolbar } from '@material-ui/core';

import { logout } from 'src/requests/auth';
import { isDrawerOpenVar, userVar } from 'src/utils/cache';
import { MenuIcon } from 'src/components/icons';
import { useReactiveVar } from '@apollo/client';

export const HEADER_HEIGHT = 64;

export default function HeaderMenu() {
  const isDrawerOpen = useReactiveVar(isDrawerOpenVar);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogout = () => {
    logout();
    userVar(undefined);
    handleClose();
  }
  const handleDrawerOpenClose = () => {
    isDrawerOpenVar(!isDrawerOpen);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: 10, backgroundColor: '#324e88' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open or close drawer"
          onClick={handleDrawerOpenClose}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Button
          sx={{ color: 'red' }}
          id="user-options-button"
          aria-controls="user-options-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Options
        </Button>
        <Menu
          id="user-options-menu"
          aria-labelledby="user-options-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}