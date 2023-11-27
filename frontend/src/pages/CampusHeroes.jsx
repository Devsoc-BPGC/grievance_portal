import React from "react"
import Component from "../components/Component"
import {
    Button,
    Typography,
} from "@material-tailwind/react";
import Box from '@mui/system/Box';
import { useNavigate } from 'react-router-dom';
export default function CampusHeroes(){
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
        <>
        <Typography variant="h3" color="blue-gray" align="center">
          Campus Heroes
        </Typography>
        <div className="flex flex-wrap w-full justify-center">
            {CampusHeroes.map((item) => (<Component heading={item.heading} content={item.content} category={item.category} isFooter={false}/>))}
        </div>
        <Box className="flex justify-center">
        <Button className="mt-10 mr-auto ml-auto w-fit align-center margin-auto"  onClick={()=>{navigate('/')}} margin="auto">
            Go to dashboard
        </Button>
        </Box>
        </>
    )
}