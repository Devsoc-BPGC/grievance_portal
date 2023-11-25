import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {Link} from "react-router-dom";

export default function Component(props) {
  const complaintLink=`complain/${props.category}`
  return (
    <Card className="mt-[5vh] sm:w-full md:w-[30vw] md:mx-[1.66vw] flex flex-col">
      <CardBody className="flex-1">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.heading}
        </Typography>
        <Typography>{props.content}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link to={complaintLink}><Button>Register</Button></Link>
      </CardFooter>
    </Card>
  );
}
