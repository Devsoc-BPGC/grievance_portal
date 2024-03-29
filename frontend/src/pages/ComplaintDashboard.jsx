import formFields from "../formFields";
import Component from "../components/Component";
import {
    Card,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
function ComplaintDashboard() {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 900px)'
    })
    const className_Div_1 = isDesktopOrLaptop ? "h-screen" : "h-100"
  const navigate=useNavigate();
  return (
    <div className={`flex flex-col items-center justify-center text-center bg-black ${className_Div_1}`}>
    <Card color="transparent" shadow={false}>
      <Typography variant="h3" className="text-white ml-auto mr-auto items-center justify-center text-center">
        CHOOSE COMPLAINT CATEGORY
      </Typography>
      <div className="flex flex-wrap w-full items-center justify-center">
        {formFields.map((formField, index) => (
          <Component key={index} heading={formField.heading} content={""} category={formField.category} isFooter={true}/>
        ))}
      </div>
      <Button className="mt-6 w-fit ml-auto mr-auto" onClick={()=>{navigate(`/`)}}>
            Go to dashboard
      </Button> 
    </Card>
  </div>
  );
}

export default ComplaintDashboard;
