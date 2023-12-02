import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
  Alert,
} from "@material-tailwind/react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';

export default function Complain(props) {
  const [idCounter, setIdCounter] = React.useState(1);
  const [formData, updateFormData] = React.useState({
    complaintid: idCounter,
    name: "",
    email: "",
    phoneNumber: "",
    desc: "",
    category: props.category,
    status: "Pending",
    response: ""
  });

  const [open, toggleSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    // Any side effects you want to handle after form data changes
  }, [formData]);

  function handleChange(event) {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }


  function handleSubmit(event) {
    event.preventDefault();
  
    // Validation: Check if all fields are filled
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.desc) {
      setSnackbarMessage("All fields are required!");
      toggleSnackbar(true);
      return;
    }
  
  
    setIdCounter(idCounter + 1);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
  
    // Make API request here
    fetch(`/complaint/${props.category}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, user: props.user, id: props.user.googleId, date: formattedDate }),
    }).then(res => {
      if (res.status === 200) {
        setTimeout(() => {
          setSnackbarMessage("Complaint registered successfully!");
          toggleSnackbar(true);
        }, 1000);
      } else {
        alert('Internal server error');
      }
    }).catch((err) => {
      console.log(err);
      alert('Cannot connect to server');
    });
  
    // Reset form data after successful submission
    updateFormData({
      name: "",
      email: "",
      phoneNumber: "",
      desc: "",
      category: formData.category,
      date: "",
    });
  }
  

  React.useEffect(() => {
    //
  }, [formData])


  return (
    <div className="bg-black flex flex-col items-center justify-center text-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h3" className="text-white items-center justify-center text-center">
          COMPLAINT FORM
        </Typography>
        <Typography className="text-gray-500 mb-8 font-normal items-center justify-center text-center">
          ENTER YOUR COMPLAINT
        </Typography>
        <form className="w-full max-w-screen-lg sm:w-96 mx-auto">
          <div className="mb-1 flex flex-col gap-6">
            <Input
              size="lg"
              placeholder=""
              label="Your Name"
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
              label="BITS Email"
              className=""
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
              label="Phone No."
              inputMode=""
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
              className=""
              size="lg"
              label="Description"
              required={true}
              name="desc"
              value={formData.desc}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth onClick={handleSubmit}>
            Register Complaint
          </Button>
          <Button className="mt-6" fullWidth onClick={() => { navigate('/') }}>
            Go to dashboard
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={() => { toggleSnackbar(false) }}>
            <Alert className={snackbarMessage.includes("required") ? "bg-red-500" : "bg-amber-500"} onClose={() => { toggleSnackbar(false) }} severity={snackbarMessage.includes("Please") ? "error" : "success"} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </form>
      </Card>
    </div>
  );
}
