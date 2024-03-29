import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@material-tailwind/react";
import axios from "axios";

export default function MessageStatus(props) {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const presHourResponse = await axios.get(
          `/preshour/${props.user.googleId}/${props.user.email}`
        );

        if (presHourResponse.status === 200) {
          const presHourDocuments = presHourResponse.data;
          const updatedPresHourRows = presHourDocuments.map((row) => ({
            ...row,

            source: "presHour",
          }));

          setRows((prevRows) => [...prevRows, ...updatedPresHourRows]);
        } else {
          console.error("Failed to fetch President's Hour documents.");
        }
      } catch (error) {
        console.error("Error fetching President's Hour documents:", error);
      }
    };

    fetchData();
    // console.log(rows);
  }, [props.user]);

  return (
    <div className="bg-black flex flex-col items-center justify-center text-center h-screen">
      <TableContainer
        sx={{
          minWidth: 650,
          maxWidth: 900,
          marginLeft: "auto",
          marginRight: "auto",
          backgroundColor: "black",
        }}
        component={Paper}
      >
        <Typography
          variant="h3"
          className="text-white items-center justify-center text-center"
        >
          MESSAGE STATUS
        </Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ color: "white" }}>
                ID
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Date
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Message
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Status
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Response
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ color: "white" }}>
                  {row.complaintid}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.date}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.message || row.desc || row.complaint}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.response !== "" ? "Responded" : "No Response"}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.response || row.reply}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
