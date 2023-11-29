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
  const [formData, updateFormData] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    desc: "",
    category: props.category,
  });

  const [open, toggleSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  React.useEffect(() => {
    // Any side effects you want to handle after form data changes
  }, [formData]);

  function handleSubmit(event) {
    event.preventDefault();

    // Validation: Check if all fields are filled
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.desc) {
      setSnackbarMessage("Please fill all fields!");
      toggleSnackbar(true);
      return;
    }

    // Make API request here (simulated success)
    // For a real scenario, you would make an API call using a library like axios or fetch
    // If the request is successful, update the snackbar message accordingly
    // For now, simulate success after a short delay
    fetch('/complaint',{
      method:'POST',
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify(formData)
    }).then(res=>{
      if(res.status===200){
        setTimeout(() => {
          setSnackbarMessage("Your complaint has been registered");
          toggleSnackbar(true);
        }, 1000);
      } else {
        alert('internal server error');
      }
    }).catch((err)=>{
      console.log(err)
      alert('cannot connect to server')
    })

    // Reset form data after successful submission
    updateFormData({
      name: "",
      email: "",
      phoneNumber: "",
      desc: "",
      category: formData.category,
    });
  }

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
            <Alert className={snackbarMessage.includes("Please") ? "bg-red-500" : "bg-amber-500"} onClose={() => { toggleSnackbar(false) }} severity={snackbarMessage.includes("Please") ? "error" : "success"} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </form>
      </Card>
    </div>
  );
}
