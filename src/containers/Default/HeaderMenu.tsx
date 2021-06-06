import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Box } from '@material-ui/core';

import Css from 'src/utils/css';
import { logout } from 'src/requests/auth';
import userVar from 'src/utils/cache';

const headerMenuStyles: Css = {
  width: '100%',
  textAlign: 'right',
}

export default function HeaderMenu() {
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

  return (
    <Box sx={headerMenuStyles}>
      <Button
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
    </Box>
  );
}