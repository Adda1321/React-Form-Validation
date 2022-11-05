import { Typography } from "@mui/material";
import React from "react";

function ThankYou() {
  return (
    <div style={{ display:'flex',   flexDirection: 'column' ,alignItems:'center' , justifyContent:'center' , height:"60vh" }}>
       
        <h1 style={{display:"block"}}>
            Thank You!!
        </h1>
        
        <span >
            Form submitted successfully
        </span>
    </div>
  );
}

export default ThankYou;
