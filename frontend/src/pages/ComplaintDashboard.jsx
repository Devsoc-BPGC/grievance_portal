import formFields from "../formFields";
import Component from "../components/Component";
import {
    Card,
    Typography,
    Button,
  } from "@material-tailwind/react";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function ComplaintDashboard() {
  const navigate=useNavigate();
  return (
    <div className="flex items-center justify-center h-screen mt-10">
    <Card color="transparent" shadow={false}>
      <Typography variant="h3" color="blue-gray"  className="ml-auto mr-auto">
        Choose Category of Complaint
      </Typography>
      <div className="flex flex-wrap w-full items-center justify-center">
        {formFields.map((formField, index) => (
          <Component heading={formField.heading} content={formField.content} category={formField.category} isFooter={true}/>
        ))}
      </div>
      <Button className="mt-6 w-fit ml-auto mr-auto" onClick={()=>{navigate('/')}}>
            Go to dashboard
      </Button> 
    </Card>
  </div>
  );
}

export default ComplaintDashboard;
