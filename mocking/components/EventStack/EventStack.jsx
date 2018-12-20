import React from 'react';
import {
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@material-ui/core';

const styles = {
  dateColumn: {
    flex: '50%',
  },
  dateRow: {
    display: 'flex',
    fontSize: '0.8rem',
  },
  columnHeader: {
    fontWeight: 'bold',
  },
};

const EventStack = ({ eventStack, updateEventCount }) => {
  let eventTable;

  if (eventStack) {
    eventTable = eventStack
      .map((event, index) => {
        const e = JSON.parse(JSON.stringify(event));
        return (
          <TableRow key={index}>
            <TableCell
              align="right"
              style={{ fontSize: '0.8rem', padding: '0px' }}
            >
              {e.from}
            </TableCell>
            <TableCell
              align="right"
              style={{ fontSize: '0.8rem', padding: '0px' }}
            >
              {e.to}
            </TableCell>
          </TableRow>
        );
      })
      .reverse();
  }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="center">Start DateTime </TableCell>
          <TableCell align="center">End DateTime</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {eventTable || (
          <Typography>Currently no events in the stack</Typography>
        )}
      </TableBody>
    </Table>
  );
};

export default EventStack;
