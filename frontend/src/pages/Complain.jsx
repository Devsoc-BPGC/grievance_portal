import {
  Card,
  Button,
  Typography,
  Textarea,
  Alert,
  Select,
  Option
} from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

export default function Complain(props) {
  const [formData, updateFormData] = React.useState({
    name: props.user.name,
    email: props.user.email,
    desc: "",
    category: props.category,
    status: "Pending",
    response: "",
  });

  const [open, toggleSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const navigate = useNavigate();
  const [events, setEvent] = React.useState('0');


  function handleChange(event) {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validation: Check if all fields are filled
    if (!formData.name || !formData.email || !formData.desc || (props.category === 'events' && events === '0')) {
      setSnackbarMessage("All fields are required!");
      toggleSnackbar(true);
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;

    // Make API request here
    fetch(`/complaint/${props.category}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        desc: (props.category === 'events' ? events + " - " : "") + formData.desc,
        user: props.user,
        id: props.user.googleId,
        date: formattedDate,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            setSnackbarMessage("Complaint registered successfully!");
            toggleSnackbar(true);
          }, 1000);
        } else {
          alert("Internal server error");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Cannot connect to server");
      });

    // Reset form data after successful submission
    updateFormData({
      name: props.user.name,
      email: props.user.email,
      desc: "",
      category: formData.category,
    });
    setEvent('0');
  }

  return (
    <div className="bg-black flex flex-col items-center justify-center text-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography
          variant="h3"
          className="text-white items-center justify-center text-center"
        >
          COMPLAINT FORM
        </Typography>
        <Typography className="text-gray-500 mb-8 font-normal items-center justify-center text-center">
          ENTER YOUR COMPLAINT
        </Typography>
        <form className="w-full max-w-screen-lg sm:w-96 mx-auto">
        {props.category === 'events' ? (<div className="w-72 mb-5">
          <Select label="Select Event" className='text-white' onChange={(event) => setEvent(event)} value={events}>
            <Option value="0">-- Select an Event --</Option>
            <Option value="convocation">Convocation</Option>
            <Option value="ps2">PS2</Option>
            <Option value="registration">Registration '24 - '25</Option>
          </Select>
        </div>) : <></>}
          <div className="mb-1 flex flex-col gap-6">
            <Textarea
              variant="outlined"
              className="text-white"
              size="lg"
              label="Description"
              required={true}
              name="desc"
              value={formData.desc}
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            className="mt-6"
            fullWidth
            onClick={handleSubmit}
          >
            Register Complaint
          </Button>
          <Button
            className="mt-6"
            fullWidth
            onClick={() => {
              navigate("/");
            }}
          >
            Go to dashboard
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => {
              toggleSnackbar(false);
            }}
          >
            <Alert
              className={
                snackbarMessage.includes("required")
                  ? "bg-red-500"
                  : "bg-amber-500"
              }
              onClose={() => {
                toggleSnackbar(false);
              }}
              severity={
                snackbarMessage.includes("Please") ? "error" : "success"
              }
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </form>
      </Card>
    </div>
  );
}
