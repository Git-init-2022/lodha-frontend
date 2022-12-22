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
    {/* <div className="wrapper">

      <Card
        img="../../assests/pool.png"
        title="Swimming Pool"
        desc="hello" />

      <Card
        img="../../assests/gym.png"
        title="Gym"
        desc="hello" />

      <Card
        img="../../assests/indoorgames.png"
        title="Indoor Games"
        desc="hello" />

      <Card
        img="../../assests/yoga.png"
        title="Yoga"
        desc="hello" />

      <Card
        img="../../assests/cafe.png"
        title="Cafe"
        desc="hello" />

      <Card
        img="../../assests/kidsplay.png"
        title="Kids Play Room"
        desc="hello" />
    </div> */}
    </div>
    </>
  )
}

// function Card(props) {
//   return (
//     <div className="card" style={{ width: "300px", border: "none", marginTop: "50px", marginLeft: "20px",backgroundColor: "#f2d491"}} >
//       <div className="card_body" style={{ alignItems: "center", justifyContent: "center" }}>
//         <img src={props.img} class="card_image" style={{ width: "100px" }} /><hr></hr>
//         <h2 className="card_title" style={{fontSize: "24px", fontWeight: "bold", color: "#000", textTranform:"capitalize"}}>{props.title}</h2>
//         <p className="card_desc" style={{fontSize: "18px",fontWeight: "medium",color: "#36454F" }}>{props.desc}</p>
//       </div>

//     </div>
//   )
// }

export default Emergency;
