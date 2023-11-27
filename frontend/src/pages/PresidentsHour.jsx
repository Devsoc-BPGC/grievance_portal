import React from "react"
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

export default function PresidentsHour(){
    const [formData, updateFormData]=React.useState({
        name:"",
        email:"",
        phoneNumber:"",
        desc:"",
        category:"message"
      })
      const [open, toggleSnackbar]=React.useState(false)
      const navigate = useNavigate();
      function handleChange(event){
        updateFormData({
          ...formData,
          [event.target.name]:event.target.value
        })
       // console.log(formData)
      }
      React.useEffect(()=>{
      //
      }, [formData])
      function handleSubmit(event){
        event.preventDefault()
        console.log(formData)
        //make api request here
        toggleSnackbar(true)
        updateFormData({
          name:"",
        email:"",
        phoneNumber:"",
        desc:"",
        category:"message",
        })
    }
    return(
        <div className="flex items-center justify-center h-screen mt-7">
        <Card color="transparent" shadow={false}>
        <Typography variant="h3" color="blue-gray">
          President's Hour
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter the details to send a message to the President
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 required"
            >
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder=""
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required={true}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              BITS Email
            </Typography>
            <Input
              size="lg"
              placeholder=""
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              required={true}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Phone Number
            </Typography>
            <Input
              size="lg"
              placeholder=""
              type="number"
              inputMode=""
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className:
                  "before:content-none after:content-none appearance-none",
              }}
              required={true} 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Enter Message
            </Typography>
            <Textarea
              variant="outlined"
              className="focus:border-t-2 focus:border-gray-900"
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
           <Button className="mt-6" fullWidth onClick={()=>{navigate('/')}}>
            Go to dashboard
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={()=>{toggleSnackbar(false)}}>
            <Alert onClose={()=>{toggleSnackbar(false)}} severity="success" sx={{ width: '100%' }}>
              Your message has been registered.
            </Alert>
          </Snackbar>
        </form>
      </Card>
        </div>
    )
}