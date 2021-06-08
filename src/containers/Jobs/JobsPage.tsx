import React from 'react';
import { Box, Chip, LinearProgress } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useQuery } from '@apollo/client';

import { jobsQuery, JobsQuery } from 'src/requests/job';
import formatStringDate from 'src/utils/formatStringDate';
import Css from 'src/utils/css';

const chipStyles: (isEmergency: boolean) => Css = (isEmergency) => ({
  backgroundColor: isEmergency ? 'red' : 'green',
  color: 'white',
  borderRadius: '4px',
  paddingX: 3,
});

export default function JobsPage() {
  const { data, loading } = useQuery<JobsQuery>(jobsQuery);

  if (loading || !data) return <LinearProgress />

  return (
    <Box display="flex" justifyContent="center" p={5}>
      <TableContainer component={Paper} sx={{ maxWidth: '1200px'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">User</TableCell>
              <TableCell align="center">Boat&nbsp;Type</TableCell>
              <TableCell align="center">Service</TableCell>
              <TableCell align="center">Boat&nbsp;Location</TableCell>
              <TableCell align="center">Date&nbsp;Created</TableCell>
              <TableCell align="center">Due&nbsp;Date</TableCell>
              <TableCell align="center">Job&nbsp;Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.jobs.map((job) => (
              <TableRow
                key={job.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
