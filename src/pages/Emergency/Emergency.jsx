import React, { useState, useEffect } from "react";
import "./Emergency.css";
import LoginNavBar from '../../components/LoginNavBar/LoginNavBar'
import emergency from "../../assests/emergency.png";
import medical from "../../assests/medical.png";
import police from "../../assests/police.png";
import fire from "../../assests/fire.png";
import user from "../../assests/user.png";

function Emergency() {

  return (
    <>
      <LoginNavBar />
      <div className="emergency">
        <div style={{ display: "flex", justifyContent: "center", marginTop: "90px" }}>
          <img src={emergency} style={{ height: "50px", width: "50px", marginTop: "20px", marginBottom: "50px" }}></img>
          <p id="HeaderTitle">EMERGENCY SERVICES</p>
        </div>
        <div>
          <p style={{marginLeft:"30px", letterSpacing: "1px", fontSize: "40px",textDecorationLine:"underline", textDecorationColor:"#675A0e", textUnderlineOffset:"20px" }}> Emergency Services  </p>
          <div className="wrapper">

            <Card
              img={medical}
              title="Apollo Hospital, Kukatpally"
              desc="Contact No : 83466438636" />

            <Card
              img={police}
              title="Pragathi Nagar Police Station"
              desc="Contact No : 7637646746" />

            <Card
              img={fire}
              title="Begumpet Fire Station"
              desc="Contact no : 7746776676" />
          </div>
          <p style={{ marginTop:"50px", marginLeft:"30px", letterSpacing: "1px", fontSize: "40px", textDecorationLine:"underline", textDecorationColor:"#675A0e", textUnderlineOffset:"20px" }}> Emergency Contacts  </p>

          <div className="wrapper" >


            <Card
              img={user}
              title="Dr Ram"
              desc="Contact No: 89847758855" />

            <Card
              img={user}
              title="Inspector Raghu"
              desc="Contact No: 8857895758" />

            <Card
              img={user}
              title="Lodha Clinic"
              desc="Contact No : 89678968696" />
          </div>
        </div>
      </div>
      <div style={{height:"100px"}}>

      </div>
    </>
  )
}

function Card(props) {
  return (
    <div className="FacilityCard" style={{ width: "300px", border: "none", marginTop: "50px", marginLeft: "20px", backgroundColor: "#ded9b9" }} >
      <div className="card_body" style={{ alignItems: "center", justifyContent: "center" }}>
        <img src={props.img} class="card_image" width="80px" height="80px" />
        <div style={{ width: "100%", backgroundColor: "#675A0E", height: "2px", marginTop: "30px", marginBottom: "30px" }}></div>

        <h2 className="card_title" style={{ fontSize: "24px", letterSpacing: "1px", color: "#000", textTranform: "capitalize" }}>{props.title}</h2>
        <p className="card_desc" style={{ fontSize: "18px", fontWeight: "medium", color: "#36454F", letterSpacing: "1px" }}>{props.desc}</p>
      </div>

    </div>

  )
}


export default Emergency;
