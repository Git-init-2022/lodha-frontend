import * as React from "https://cdn.skypack.dev/react@17.0.1";
import "./facilities.css";

function Facilities() {
  return (
    <div className="wrapper">

      <Card
        img={require("../../assests/pool.png")}
        title="Swimming Pool"
        desc="hello" />

      <Card
        img={require("../../assests/gym.png")}
        title="Gym"
        desc="hello" />

      <Card
        img={require("../../assests/indoorgames.png")}
        title="Indoor Games"
        desc="hello" />

      <Card
        img={require("../../assests/yoga.png")}
        title="Yoga"
        desc="hello" />

      <Card
        img={require("../../assests/cafe.png")}
        title="Cafe"
        desc="hello" />

      <Card
        img={require("../../assests/kidsplay.png")}
        title="Kids Play Room"
        desc="hello" />
    </div>
  )
}

function Card(props) {
  return (
    <div className="FacilityCard" style={{ width: "300px", border: "none", marginTop: "50px", marginLeft: "20px",backgroundColor: "#ded9b9"}} >
      <div className="card_body" style={{ alignItems: "center", justifyContent: "center" }}>
        <img src={props.img} class="card_image" style={{ width: "100px" }} />
        <div style={{width: "100%", backgroundColor:"#675A0E", height:"2px", marginTop:"30px", marginBottom:"30px"}}></div>

        <h2 className="card_title" style={{fontSize: "24px",letterSpacing:"1px", color: "#000", textTranform:"capitalize"}}>{props.title}</h2>
        <p className="card_desc" style={{fontSize: "18px",fontWeight: "medium",color: "#36454F", letterSpacing:"1px" }}>{props.desc}</p>
      </div>

    </div>
 
  )
}

export default Facilities;
