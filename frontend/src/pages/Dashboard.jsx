import formFields from "../formFields";
import Component from "../components/Component";
import {
  Button
} from "@material-tailwind/react";
import {Link} from "react-router-dom";

function Dashboard() {
  return (
    <div className="bg-gray-200 min-h-screen mr-auto ml-auto">
      <header className="text-8xl font-extrabold text-center ">Mirage</header>
      <div className="flex flex-col align-center w-fit justify-center mt-8 gap-5 mr-auto ml-auto ">
        <Link to="presidents-hour"><Button fullWidth>President's Hour</Button></Link>
        <Link to="campus-heroes" ><Button fullWidth>Campus Heroes</Button></Link>
        <Link to="complain" ><Button fullWidth>Register Complaint</Button></Link>
        <Link to="complaint-status" ><Button fullWidth>Complaint Status</Button></Link>
        <Link to="message-status" ><Button fullWidth>Message Status</Button></Link>
      </div>
    </div>
  );
}

export default Dashboard;
