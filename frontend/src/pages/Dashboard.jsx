import React from 'react';
import {
  Button, Typography
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Dashboard() {

  return (
    <div className="flex flex-row items-center justify-center text-center bg-black min-h-screen mr-auto ml-auto">
        <div className="w-1/3 h-full flex flex-col items-center justify-center text-center">
          <header className="text-8xl font-extrabold items-center justify-center text-center p-9 text-white">Mirage</header>
          <div className="flex flex-row items-center justify-center text-center gap-3">
            <img width={"10%"} src={logo} alt="BITS Pilani KK Birla Goa Campus" />
            <Typography className="items-center justify-center text-center text-white">
              BITS Pilani K.K. Birla Goa Campus
            </Typography>
          </div>
        </div>
      <div className="w-2/3 flex flex-col items-center justify-center text-center mt-8 gap-5 mr-auto ml-auto">
        <Link to="presidents-hour"  className="w-1/4"><Button className="w-full">President's Hour</Button></Link>
        <Link to="campus-heroes"  className="w-1/4" ><Button className="w-full">Campus Heroes</Button></Link>
        <Link to="complain"  className="w-1/4" ><Button className="w-full">Register Complaint</Button></Link>
        <Link to="complaint-status"  className="w-1/4" ><Button className="w-full">Complaint Status</Button></Link>
        <Link to="message-status"  className="w-1/4" ><Button className="w-full">Message Status</Button></Link>
      </div>
    </div>
  );
}

export default Dashboard;
