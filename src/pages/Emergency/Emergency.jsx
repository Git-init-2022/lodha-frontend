import React, {useState, useEffect} from "react";
import "./Emergency.css";
import LoginNavBar from '../../components/LoginNavBar/LoginNavBar'
import emergency from "../../assests/emergency.png";

function Emergency() {
  
  return (
    <>
    <LoginNavBar/>
    <div className="emergency">
      <div style={{ display: "flex", justifyContent:"center", marginTop: "90px"}}>
        <img src={emergency} style={{ height: "50px", width: "50px", marginTop : "20px", marginBottom: "50px"}}></img>
        <p id="title">EMERGENCY SERVICES</p>
      </div>
    </div>
    </>
  )
}

export default Emergency;
