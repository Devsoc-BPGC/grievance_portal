import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
    Typography,
} from "@material-tailwind/react";

function createData(id, category, date, complaint, status) {
  return {id, category, date, complaint, status };
}

const rows = [
  createData('134', 'Mess', '27/10/2023', 'I saw a rat in D mess. Please send help.', 'Solved'),
  createData('144', 'Hostel', '30/10/2023', 'There are lizards in my room. Please save me.', 'Solved'),
  createData('157', 'Academics', '3/11/2023', 'How to get 10 sg if i start preparing one night before compre?', 'Pending'),
  createData('160', 'Academics', '14/11/2023', 'Will I get SIP if I grind DSA from first year? PPO mil jayega na? Will the recession impact my placement? I am unable to sleep at night in this worry but I am just in 1st year??', 'Pending'),
  createData('932', 'General', '29/11/2023', 'My friends are coming to goa can I book VGH for them? My parents want to come for waves, how to convince them not to?', 'Pending'),
];

export default function ComplaintStatus() {
  return (
    <div className="bg-black flex flex-col items-center justify-center text-center h-screen">
    <TableContainer sx={{ minWidth: 650, maxWidth: 900, marginLeft: 'auto',  marginRight: 'auto', backgroundColor: 'black'}} component={Paper}>
        <Typography variant="h3" className="text-white items-center justify-center text-center">
          COMPLAINT STATUS
        </Typography>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{color:'white'}}>ID</TableCell>
            <TableCell align="left" sx={{color:'white'}}>Category</TableCell>
            <TableCell align="left" sx={{color:'white'}}>Date</TableCell>
            <TableCell align="left" sx={{color:'white'}}>Complaint</TableCell>
            <TableCell align="left" sx={{color:'white'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{color:'white'}}>
                {row.id}
              </TableCell>
              <TableCell align="left" sx={{color:'white'}}>{row.category}</TableCell>
              <TableCell align="left" sx={{color:'white'}}>{row.date}</TableCell>
              <TableCell align="left" sx={{color:'white'}}>{row.complaint}</TableCell>
              <TableCell align="left" sx={{color:'white'}}>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}