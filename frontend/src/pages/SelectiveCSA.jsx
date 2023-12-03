import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Typography, Textarea, Button } from "@material-tailwind/react";

function createData(id, date, complaint) {
  return { id, date, complaint, response: "", isReplySent: false };
}

const initialRows = [
  createData("134", "27/10/2023", "I saw a rat in D mess. Please send help."),
  createData(
    "144",
    "30/10/2023",
    "There are lizards in my room. Please save me."
  ),
  createData(
    "157",
    "3/11/2023",
    "How to get 10 sg if I start preparing one night before compre?"
  ),
  createData(
    "160",
    "14/11/2023",
    "Will I get SIP if I grind DSA from the first year? PPO mil jayega na? Will the recession impact my placement? I am unable to sleep at night in this worry but I am just in the 1st year??"
  ),
  createData(
    "932",
    "General",
    "My friends are coming to Goa, can I book VGH for them? My parents want to come for waves, how to convince them not to?"
  ),
];

export default function PrezHourMessages(props) {
  const navigate = useNavigate();
  const [rows, setRows] = useState(initialRows);

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // console.log(props.user.googleId);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // console.log(props.user.googleId)
          `http://localhost:3001/csa/${props.user.googleId}`
        );

        if (response.status === 200) {
          const documents = response.data;
          const updatedRows = documents.map((row) => ({
            ...row,
            isReplySent: row.response !== "",
          }));
          setRows(updatedRows);
        } else {
          console.error("Failed to fetch documents.");
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array to ensure it runs only once on mount
  // Empty dependency array to ensure it runs only once on mount

  const handleReplyChange = (id, event) => {
    const updatedRows = rows.map((row) =>
      row._id === id ? { ...row, response: event.target.value } : row
    );
    setRows(updatedRows);
  };

  const handleSendReply = (id) => {
    const rowToUpdate = rows.find((row) => row._id === id);

    // Assuming you have an API endpoint for updating replies
    axios
      .put(`http://localhost:3001/csa/${props.user.googleId}/${id}`, {
        response: rowToUpdate.response,
      })
      .then((response) => {
        if (response.status === 200) {
          const updatedRows = rows.map((row) =>
            row._id === id ? { ...row, isReplySent: true } : row
          );
          setRows(updatedRows);
          setEditingId(null);
        } else {
          console.error("Failed to update reply.");
        }
      })
      .catch((error) => {
        console.error("Error updating reply:", error);
      });
  };

  const handleEdit = (id) => {
    const updatedRows = rows.map((row) =>
      row._id === id ? { ...row, isReplySent: false } : row
    );
    setRows(updatedRows);
    setEditingId(id);
  };

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
          className="text-white items-center justify-center text-center mt-8"
        >
          CSA Grievances
        </Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={{ color: "white" }}>
                Email
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Date
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Complaint
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Category
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}>
                Reply
              </TableCell>
              <TableCell align="left" sx={{ color: "white" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.email}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.date}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.category}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.desc}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.isReplySent ? (
                    editingId === row._id ? (
                      <Textarea
                        variant="outlined"
                        className=""
                        size="lg"
                        label="Reply"
                        required={true}
                        name="desc"
                        value={row.response}
                        onChange={(event) => handleReplyChange(row._id, event)}
                        style={{ color: "white" }}
                      />
                    ) : (
                      row.response
                    )
                  ) : (
                    <Textarea
                      variant="outlined"
                      className=""
                      size="lg"
                      label="Reply"
                      required={true}
                      name="desc"
                      value={row.response}
                      onChange={(event) => handleReplyChange(row._id, event)}
                      style={{ color: "white" }}
                    />
                  )}
                </TableCell>
                <TableCell align="left" sx={{ color: "white" }}>
                  {row.isReplySent ? (
                    <Button
                      type="submit"
                      className="mt-6"
                      fullWidth
                      onClick={() => handleEdit(row._id)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="mt-6"
                      fullWidth
                      onClick={() => handleSendReply(row._id)}
                    >
                      Send
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button className="mt-6" fullWidth onClick={() => navigate("/")}>
        Go to dashboard
      </Button>
    </div>
  );
}
