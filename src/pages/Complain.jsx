import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";

export default function Complain() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h3" color="blue-gray">
          Complaint Form
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter the details to register your complaint
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
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Enter Description
            </Typography>
            <Textarea
              variant="outlined"
              className="focus:border-t-2 focus:border-gray-900"
              size="lg"
              required={true}
            />
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            Register Complaint
          </Button>
        </form>
      </Card>
    </div>
  );
}
