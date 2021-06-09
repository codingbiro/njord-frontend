import React, { useState } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  AppBar, Box, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import { useReactiveVar } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import { isDrawerOpenVar, userVar } from 'src/utils/cache';
import Css from 'src/utils/css';
import { DownArrowIcon, MenuIcon, UserIcon } from 'src/components/icons';

export const HEADER_HEIGHT = 64;

const userNameStyles: Css = {
  marginLeft: 1,
  fontSize: '20px',
};

const appBarStyles: Css = {
  zIndex: 10,
  backgroundColor: '#324e88',
};

export default function Header() {
  const userMenuId = 'user-settings-menu';
  const isDrawerOpen = useReactiveVar(isDrawerOpenVar);
  const user = useReactiveVar(userVar);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();

  const userMenuOpen = Boolean(userMenuAnchorEl);

  const onLogout = () => {
    localStorage.removeItem('uToken');
    userVar(undefined);
  };
  const handleDrawerOpenClose = () => {
    isDrawerOpenVar(!isDrawerOpen);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" sx={appBarStyles}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open or close drawer"
            onClick={handleDrawerOpenClose}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <UserIcon />
          <Typography variant="body1" sx={userNameStyles}>{user?.name}</Typography>
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
          vertical: 50,
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={onLogout}>{t('main:logout')}</MenuItem>
      </Menu>
    </>
  );
}
