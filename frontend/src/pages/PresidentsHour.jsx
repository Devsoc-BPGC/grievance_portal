import React from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Alert,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

export default function PresidentsHour(props) {
  const [formData, updateFormData] = React.useState({
    name: props.user.name,
    email: props.user.email,
    desc: "",
    category: "message",
    status: "Not Responded",
    response: "",
  });
  const [open, toggleSnackbar] = React.useState(false);
  const navigate = useNavigate();
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  function handleChange(event) {
    console.log(formData);
    updateFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(formData);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validation: Check if all fields are filled
    if (!formData.name || !formData.email || !formData.desc) {
      console.log(formData);
      setSnackbarMessage("All fields are required!");
      toggleSnackbar(true);
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;

    // Make API request here (simulated success)
    // For a real scenario, you would make an API call using a library like axios or fetch
    // If the request is successful, update the snackbar message accordingly
    // For now, simulate success after a short delay
    fetch("http://localhost:3001/presmessage/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        ...formData,
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
          alert("internal server error");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("cannot connect to server");
      });

    // Reset form data after successful submission
    updateFormData({
      name: props.user.name,
      email: props.user.email,
      desc: "",
      category: formData.category,
    });
  }

  React.useEffect(() => {
    //
  }, [formData]);

  return (
    <div className="flex bg-black items-center justify-center text-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography
          className="items-center justify-center text-center text-white"
          variant="h3"
        >
          PRESIDENT'S HOUR
        </Typography>
        <Typography className="text-gray-500 items-center justify-center text-center mt-0 font-normal">
          Enter your message to the President
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
          <div className="mb-1 flex flex-col gap-6">
            <Textarea
              variant="outlined"
              label="Enter Message"
              className="text-white "
              size="lg"
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
            Submit Message
          </Button>
          <Button className="mt-6" fullWidth onClick={() => navigate("/")}>
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
