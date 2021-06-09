import React from 'react';
import {
  Box, IconButton, Menu, MenuItem,
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { useMutation } from '@apollo/client';

import {
  acceptMutation,
  IAcceptMutation,
  IAcceptMutationVariables,
  IRejectMutation,
  IRejectMutationVariables,
  rejectMutation,
} from 'src/requests/job';
import apolloCacheEvictQuery from 'src/utils/cacheEvict';

interface IProps {
  id: number;
}

export default function JobMenu({ id }: IProps) {
  const [acceptJob] = useMutation<IAcceptMutation, IAcceptMutationVariables>(acceptMutation, {
    update: (cache) => apolloCacheEvictQuery(cache, 'jobs'),
  });
  const [rejectJob] = useMutation<IRejectMutation, IRejectMutationVariables>(rejectMutation, {
    update: (cache) => apolloCacheEvictQuery(cache, 'jobs'),
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onAccept = async () => {
    try {
      await acceptJob({ variables: { input: { id } } });
    } catch (_e) {
      // Request error
    }
    handleClose();
  };
  const onReject = async () => {
    try {
      await rejectJob({ variables: { input: { id } } });
    } catch (_e) {
      // Request error
    }
    handleClose();
  };

  return (
    <Box>
      <IconButton
        aria-label="more"
        aria-controls="job-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHoriz />
      </IconButton>
      <Menu
        id="job-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '20ch',
          },
        }}
      >
        <MenuItem onClick={onAccept}>
          Accept
        </MenuItem>
        <MenuItem onClick={onReject}>
          Reject
        </MenuItem>
      </Menu>
    </Box>
  );
}
