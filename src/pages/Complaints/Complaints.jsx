import React from 'react';
import { useEffect, useState } from 'react';
import './Complaints.css';
import LoginNavBar from '../../components/LoginNavBar/LoginNavBar'
import Posts from '../../components/Posts/Posts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from "../../context/StateContext"
import Spinner from '../../components/Spinner/Spinner';


function Complaints() {
  const [loading, setLoading] = useState(true);
  const { User } = useGlobalContext();
  const [complaints, setComplaints] = useState([]);
  const fetchComplaints = async () => {

    const user = JSON.parse(User);
    const { data } = await axios.get("https://lodha-backend.onrender.com/api/v1/complaint", { params: { FlatNo: user.FlatNo } });
    setLoading(false);
    setComplaints(data.complaints);
  }
  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <>
      <LoginNavBar />
      <div className="middle" style={{ marginTop: "0px" }}>
        {/* <p id="title3">COMPLAINTS</p> */}
        <div className="Note" style={{ marginTop: "10px", marginLeft: "20px" }}>
          <p className="NoteTitle">NOTE</p>
          <ul>
            <li className="NoteList" style={{ marginRight: "20px" }}>
              Click on the Description to edit and press "Edit Complaint" button to save your changes.
            </li>
          </ul>
        </div>
        {
          loading ?
            <Spinner />
            :
            complaints.length === 0 ?
              <>
                <p style={{ fontSize: "16px", letterSpacing: "1px", textAlign: "center", marginTop:"20px" }}>No Complaints !</p>
              </>
              :

              complaints.map(item => <Posts props={item} />)
        }
      </div>
    </>
  );
}

export default Complaints;