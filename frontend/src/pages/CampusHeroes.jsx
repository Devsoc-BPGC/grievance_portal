import React from "react"
import Component from "../components/Component"
import {
    Button,
    Typography,
} from "@material-tailwind/react";
import Box from '@mui/system/Box';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "react-responsive";
export default function CampusHeroes(){
    const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 900px)'
    })
    const className_Div_1 = isDesktopOrLaptop ? "h-screen" : "h-100"
    const navigate=useNavigate()
    const CampusHeroes=[
        {
            id: 1,
            heading: "Campus Hero 1",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit eros vel lacus tempor, vitae facilisis urna fringilla."
          },
          {
            id: 2,
            heading: "Campus Hero 2",
            content:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit eros vel lacus tempor, vitae facilisis urna fringilla.",
          },
          {
            id: 3,
            heading: "Campus Hero 3",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit eros vel lacus tempor, vitae facilisis urna fringilla.",
          },
          {
            id: 4,
            heading: "Campus Hero 4",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit eros vel lacus tempor, vitae facilisis urna fringilla.",
          },
    ]
    return(
        <div className={`${className_Div_1} flex flex-col items-center justify-center text-center bg-black`}>
        <Typography className="items-center justify-center text-center text-white" variant="h3">
          CAMPUS HEROES
        </Typography>
        <div className="flex flex-wrap w-full items-center justify-center text-center">
            {CampusHeroes.map((item, i) => (<Component key={i} heading={item.heading} content={item.content} category={item.category} isFooter={false}/>))}
        </div>
        <Box className="flex items-center justify-center text-center">
        <Button className="mt-10 mr-auto ml-auto w-fit align-center margin-auto"  onClick={()=>{navigate('/')}} margin="auto">
            Go to dashboard
        </Button>
        </Box>
        </div>
    )
}