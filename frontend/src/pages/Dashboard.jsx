import React from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { useState, useEffect } from "react";

function Dashboard(props) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAuthorizedCSA, setIsAuthorizedCSA] = useState(false);

  useEffect(() => {
    // console.log(props.user);
    const checkAuthorizationCSA = async () => {
      try {
        // Replace 'userId' with the actual user ID
        const userId = props.user.googleId;
        // console.log(userId);

        const response = await axios.get(
          `http://localhost:3001/csa/${userId}`
        );

        if (response.status === 200) {
          setIsAuthorizedCSA(true);
        }
      } catch (error) {
        console.error("unauthorized :", error);
      }
    };

    checkAuthorizationCSA();
  }, []);

  useEffect(() => {
    // console.log(props.user);
    const checkAuthorization = async () => {
      try {
        // Replace 'userId' with the actual user ID
        const userId = props.user.googleId;
        // console.log(userId);

        const response = await axios.get(
          `http://localhost:3001/preshour/${userId}`
        );

        if (response.status === 200) {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("unauthorized :", error);
      }
    };

    checkAuthorization();
  }, []);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const className_Div_1 = isDesktopOrLaptop ? "row" : "col";
  const className_Div_2 = isDesktopOrLaptop ? "1/3" : "1/2";
  const className_Div_3 = isDesktopOrLaptop ? "2/3" : "1";
  const className_bt = isDesktopOrLaptop ? "1/4" : "1";
  return (
    <div
      className={`flex flex-${className_Div_1} items-center justify-center text-center bg-black min-h-screen mr-auto ml-auto`}
    >
      <div
        className={`w-${className_Div_2} h-full flex flex-col items-center justify-center text-center`}
      >
        <header className="text-8xl font-extrabold items-center justify-center text-center p-9 text-white">
          Mirage
        </header>
        <div className="flex flex-row items-center justify-center text-center gap-3">
          <img width="10%" src={logo} alt="BITS Pilani KK Birla Goa Campus" />
          <Typography className="items-center justify-center text-center text-white text-xl">
            BITS Pilani K.K. Birla Goa Campus
          </Typography>
        </div>
      </div>
      <div
        className={`w-${className_Div_3} flex flex-col items-center justify-center text-center mt-8 gap-5 mr-auto ml-auto`}
      >
        {isAuthorized && (
          <Link to="prezhour-prez" className={`${className_bt}`}>
            <Button className="w-full">President's Hour Messages</Button>
          </Link>
        )}
        <Link to="presidents-hour" className={`${className_bt}`}>
          <Button className="w-full">President's Hour</Button>
        </Link>
        {/* <Link to="campus-heroes" className={`${className_bt}`}>
          <Button className="w-full">Campus Heroes</Button>
        </Link> */}
        <Link to="complain" className={`${className_bt}`}>
          <Button className="w-full">Register Complaint</Button>
        </Link>
        <Link to="complaint-status" className={`${className_bt}`}>
          <Button className="w-full">Complaint Status</Button>
        </Link>
        <Link to="message-status" className={`${className_bt}`}>
          <Button className="w-full">Message Status</Button>
        </Link>
        {(isAuthorizedCSA || isAuthorized) &&(
          <Link to="selective-csa" className={`${className_bt}`}>
          <Button className="w-full">For CSA</Button>
        </Link>)
        }
        
      </div>
    </div>
  );
}

export default Dashboard;
