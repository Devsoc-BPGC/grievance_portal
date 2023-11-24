import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Component(props) {
  return (
    <Card className="mt-[5vh] sm:w-full md:w-[30vw] md:mx-[1.66vw] flex flex-col">
      <CardBody className="flex-1">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.heading}
        </Typography>
        <Typography>{props.content}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Register</Button>
      </CardFooter>
    </Card>
  );
}
