import React from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Alert,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

export default function PresidentsHour() {
  const [formData, updateFormData] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    desc: "",
    category: "message"
  })
  const [open, toggleSnackbar] = React.useState(false)
  const navigate = useNavigate();
  const [error, setError] = React.useState("");
  
  function handleChange(event) {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  React.useEffect(() => {
    //
  }, [formData])

  function handleSubmit(event) {
    event.preventDefault();

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.phoneNumber === "" ||
      formData.desc === ""
    ) {
      setError("Please fill all fields!");
      toggleSnackbar(true);
      return;
    }

    console.log(formData);
    // make api request here

    // Display success message
    window.alert("Success!");

    // Reset form data after submission
    updateFormData({
      name: "",
      email: "",
      phoneNumber: "",
      desc: "",
      category: "message",
    });
  }


  React.useEffect(() => {
    setError("");
  }, [formData]);

  return (
    <div className="flex bg-black items-center justify-center text-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography className="items-center justify-center text-center text-white" variant="h3">
          PRESIDENT'S HOUR
        </Typography>
        <Typography className="text-gray-500 items-center justify-center text-center mt-0 font-normal">
          Enter your message to the President
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
          <div className="mb-1 flex flex-col gap-6">
            <Input
              size="lg"
              placeholder=""
              label="Your name"
              className=""
              labelProps={{
                className: "",
              }}
              required={true}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              size="lg"
              placeholder=""
              className=""
              label="BITS Email"
              labelProps={{
                className: "",
              }}
              required={true}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              size="lg"
              placeholder=""
              inputMode=""
              label="Phone No."
              className=""
              labelProps={{
                className: "",
              }}
              required={true}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <Textarea
              variant="outlined"
              label="Enter Message"
              className=""
              size="lg"
              required={true}
              name="desc"
              value={formData.desc}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth onClick={handleSubmit}>
            Submit Message
          </Button>
          <Button className="mt-6" fullWidth onClick={() => navigate('/')}>
            Go to dashboard
          </Button>
          {error && (
            <Snackbar open={open} autoHideDuration={6000} onClose={() => toggleSnackbar(false)}>
              <Alert className="bg-red-500" onClose={() => toggleSnackbar(false)} severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            </Snackbar>
          )}
        </form>
      </Card>
    </div>
  )
}
