import React, { useState } from 'react';
import {
  Box,
  Chip,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { useQuery } from '@apollo/client';

import { IJobsQuery, IJobsQueryVariables, ILocationsQuery, jobsQuery, locationsQuery } from 'src/requests/job';
import formatStringDate from 'src/utils/formatStringDate';
import Css from 'src/utils/css';
import JobMenu from './JobMenu';

const pollInterval = 60000; // 1 minute

const chipStyles: (isEmergency: boolean) => Css = (isEmergency) => ({
  backgroundColor: isEmergency ? 'red' : 'green',
  color: 'white',
  borderRadius: '4px',
  minWidth: '100px',
});

const switcherStyles: (active: boolean) => Css = (active) => ({
  backgroundColor: active ? 'white' : '#E1E1E1',
  borderBottom: active ? '2px solid #91b2d0' : 'none',
  color: '#1b2a49',
  fontSize: '26px',
  minWidth: '50%',
  paddingTop: 2,
  paddingBottom: 1.75,
  cursor: active ? 'default' : 'pointer',
});

const selectStyles: Css = {
  marginTop: 2,
  minWidth: '150px',
  backgroundColor: '#1b2a49',
  color: 'white',
  '& .MuiSelect-icon': {
    color: 'white',
  },
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
};

const rowStyles: Css = {
  '&:last-child td, &:last-child th': {
    border: 0
  },
};

export default function JobsPage() {
  const [rejected, setRejected] = useState(false);
  const [location, setLocation] = useState('');
  const { data, loading } =
    useQuery<IJobsQuery, IJobsQueryVariables>(jobsQuery, { variables: { rejected, location }, pollInterval });
  const { data: locationsData, loading: locationsLoading } =
    useQuery<ILocationsQuery>(locationsQuery, { pollInterval });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocation(event.target.value as string);
  };

  const renderSelectedValue = (value: string) => {
    if (!value) return <span>Location</span>
    return <span>{value}</span>;
  };

  if (loading || !data || locationsLoading || !locationsData) return <LinearProgress />

  return (
    <Box display="flex" alignItems="center" p={5} flexDirection="column">
      <Box display="flex" justifyContent="flex-end" maxWidth="1200px" width="100%" my={2}>
        <Select
          value={location}
          onChange={handleChange}
          displayEmpty 
          sx={selectStyles}
          renderValue={renderSelectedValue}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {locationsData.locations.map(({ boatLocation }) =>
            <MenuItem key={boatLocation} value={boatLocation}>{boatLocation}</MenuItem>
          )}
        </Select>
      </Box>
      <TableContainer component={Paper} sx={{ maxWidth: '1200px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={!rejected ? 8 : 7} padding="none">
                <Box display="flex" justifyContent="space-around" width="100%">
                  <Box sx={switcherStyles(!rejected)} onClick={() => setRejected(false)}>Pending</Box>
                  <Box sx={switcherStyles(rejected)} onClick={() => setRejected(true)}>Rejected</Box>
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Boat&nbsp;Type</TableCell>
              <TableCell align="center">Service</TableCell>
              <TableCell align="center">Boat&nbsp;Location</TableCell>
              <TableCell align="center">Date&nbsp;Created</TableCell>
              <TableCell align="center">Due&nbsp;Date</TableCell>
              <TableCell align="center">Job&nbsp;Type</TableCell>
              {!rejected && (<TableCell align="center">&nbsp;</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.jobs.map((job) => (
              <TableRow
                key={job.id}
                sx={rowStyles}
              >
                <TableCell component="th" scope="row" align="center">
                  {job.__user__.name}
                </TableCell>
                <TableCell align="center">{job.boatType}</TableCell>
                <TableCell align="center">{job.service}</TableCell>
                <TableCell align="center">{job.boatLocation}</TableCell>
                <TableCell align="center">{formatStringDate(job.createdAt)}</TableCell>
                <TableCell align="center">{formatStringDate(job.dueDate)}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={job.isEmergency ? 'Emergency' : 'Normal'}
                    sx={chipStyles(job.isEmergency)}
                  />
                </TableCell>
                {!rejected && (
                  <TableCell>
                    <JobMenu id={job.id} />
                  </TableCell>
                )}
              </TableRow>
            ))}
            {data.jobs.length === 0 && (
              <TableRow>
                <TableCell align="center" colSpan={7}>
                  No Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
