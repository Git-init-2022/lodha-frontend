import axios from "axios";
import React, { useState, useEffect } from "react";
import { setSourceMapRange } from "typescript";
import './Profile.css';
import LoginNavBar from '../../components/LoginNavBar/LoginNavBar'
import { useGlobalContext } from "../../context/StateContext";

import camera from "../../assests/camera.png";
import Edit from "../../assests/Edit.png";
import Update from "../../assests/update.png";
import cancel from "../../assests/close.png";
import success from "../../assests/success.png";
import Modal from 'react-bootstrap/Modal';

import { Popconfirm } from 'antd';
import imgname from "../../assests/user.png"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Web3Storage } from 'web3.storage';
import Spinner from "../../components/Spinner/Spinner";
export default function Profile() {
  const { User, setUser } = useGlobalContext();
  const [isVisible, setisVisible] = useState(true);
  const [Loading, setLoading] = useState(true);
  const [Editable, setEditable] = useState(true);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      if (User !== null) {
        const { data } = await axios.get("https://lodha-backend.onrender.com/api/v1/singleUser", { params: { FlatNo: JSON.parse(User).FlatNo } });
        setLoading(false);
        const user = data.user1;
        const user1 = {
          OwnerName: user[0].OwnerName,
          RegisteredName: user[0].RegisteredName,
          FlatNo: user[0].FlatNo,
          Block: user[0].Block,
          ParkingSlot: user[0].ParkingSlot,
          Mobile: user[0].Mobile,
          Dues: user[0].Dues,
          Email: user[0].Email,
          Role: user[0].Role,
          ImageName: user[0].ImageName,
          ImageToken: user[0].ImageToken
        }
        setUser(JSON.stringify(user1));
        localStorage.setItem("User", User);
      }
    }
    if (User !== null) {
      fetchUsers();
    }
  }, [])
  const update = async () => {
    setShow(true);

    
    const FlatNo = document.getElementsByName("FlatNo").item(0).value;
    const ParkingSlot = document.getElementsByName("ParkingSlot").item(0).value;
    const Block = document.getElementsByName("Block").item(0).value;
    const Mobile = document.getElementsByName("Mobile").item(0).value;
    const Email = document.getElementsByName("Email").item(0).value;
    const RegisteredName = document.getElementsByName("RegisteredName").item(0).value;
    const OwnerName = JSON.parse(User).OwnerName;
    const row = {
      OwnerName: OwnerName,
      RegisteredName: RegisteredName,
      Email: Email,
      Mobile: Mobile,
      ParkingSlot: ParkingSlot,
      FlatNo: FlatNo,
      Block: Block,
      Role: JSON.parse(User).Role,
      ImageName: JSON.parse(User).ImageName,
      ImageToken: JSON.parse(User).ImageToken,
      Dues: JSON.parse(User).Dues,

    }

    const { data } = await axios.get("https://lodha-backend.onrender.com/api/v1/userupdate", { params: { user: row, Admin: FlatNo } });
    
    setShow(false);
    refreshPage();
    
    
     
  }

  const change = () => {
    setisVisible(!isVisible);
  }

  const UpdateSubmit = () => {
    update();
  };

  const refreshPage = () => {
    window.location.reload();
  }

  const uploadPicOfUser = async () => {
    setLoading(true);
    const files = document.getElementsByName("profilePic").item(0).files;
    const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcxOTdiN2M2OGFEMTNhNzREMGIzMGQ3OTI4OTNGMDc4MWQxZjE4M2QiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAxNjM1MTczNDIsIm5hbWUiOiJsb2RoYS1maWxlcyJ9.rmkUCge8MPPj5TC6i8Z5lVAjIevCSVni0gpu-_jUzlI" });
    const cid = await client.put(files);
    const FileName = files[0].name;
    const { data } = await axios.post("https://lodha-backend.onrender.com/api/v1/updateProfile", { cid: cid, name: FileName, FlatNo: JSON.parse(User).FlatNo });
    setLoading(false);
    refreshPage();
  }

  const uploadPhoto = (e) => {
    e.preventDefault();
    const files = document.getElementsByName("profilePic").item(0).files;
    if (files.length > 0) {
      uploadPicOfUser();
    }

  };

  const changeInput = () => {
    setEditable(false);

  }


  return (
    <>
      <LoginNavBar />
      <div style={{ backgroundColor: "#f4f5f7", height: "1000px" }}>
        <section >
          <p id="userProfileTitle">USER PROFILE</p>


          {
            Loading ?
              <div className="Profilediv">
                <Spinner />
              </div>
              :
              <MDBContainer className="h-100 Profilediv" >
                <MDBRow className="justify-content-center align-items-center h-100">
                  <MDBCol lg="10" className="mb-4 mb-lg-0">
                    <MDBCard className="card" style={{ borderRadius: '.5rem' }}>
                      <MDBRow className="g-0">
                        <MDBCol md="4" className="gradient-custom text-center text-white profileLeftDiv"
                          style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "auto", }}>

                          <MDBCardImage className="my-5 profileImage" src={JSON.parse(User).ImageToken !== undefined ? "https://" + JSON.parse(User).ImageToken + ".ipfs.w3s.link/" + JSON.parse(User).ImageName : imgname}
                            alt="Avatar" style={{ width: '150px', height: '150px' }} fluid />
                          <MDBTypography tag="h4" className="ProfileName">{JSON.parse(User).OwnerName}</MDBTypography>
                          <MDBTypography tag="h4" className="ProfileRole">{JSON.parse(User).Role}</MDBTypography>


                          {
                            isVisible ?
                              <button className="uploadButton" onClick={() => change()}>Change Picture</button>
                              :
                              <></>
                          }
                          {
                            !isVisible ?
                              <form>
                                <p className="BackButton" onClick={() => change()}>&larr; Back</p>
                                <input type="file" className="fileInput" name="profilePic" accept="image/*" >
                                </input>
                                <button className="uploadButton" type="submit" style={{ marginBottom: "15px" }} onClick={(e) => uploadPhoto(e)}>
                                  <img src={camera} height="20px" width="20px" style={{ marginRight: "10px" }}></img>Upload
                                </button>
                              </form>
                              :
                              <></>
                          }
                        </MDBCol>
                        <MDBCol md="8">
                          <MDBCardBody className="p-4">
                            <MDBTypography tag="h5" className="ProfileHeader">Details</MDBTypography>
                            <p style={{ textAlign: "center", letterSpacing: "1px", fontSize: "20px" }}>Click on Edit Button to edit your personal details  </p>
                            <hr className="mt-0 mb-4" />
                            <MDBRow className="pt-1">
                              <MDBCol size="6" className="mb-3" style={{ marginTop: "30px" }}>
                                <MDBTypography tag="h6" className="InputHeader">Email</MDBTypography>

                                {
                                  Editable ?
                                    <MDBCardText className="text-muted">{JSON.parse(User).Email}</MDBCardText>
                                    :
                                    <input className="text-muted" defaultValue={JSON.parse(User).Email} type="text" name="Email"></input>
                                }
                              </MDBCol>
                              <MDBCol size="6" className="mb-3" style={{ marginTop: "30px" }}>
                                <MDBTypography tag="h6" className="InputHeader">Phone</MDBTypography>
                                {
                                  Editable ?
                                    <MDBCardText className="text-muted">{JSON.parse(User).Mobile}</MDBCardText>
                                    :
                                    <input className="text-muted" defaultValue={JSON.parse(User).Mobile} type="text" name="Mobile"></input>
                                }
                              </MDBCol>
                              <MDBCol size="6" className="mb-3" style={{ marginTop: "30px" }}>
                                <MDBTypography tag="h6" className="InputHeader">Block</MDBTypography>
                                {
                                  Editable ?
                                    <MDBCardText className="text-muted">{JSON.parse(User).Block}</MDBCardText>
                                    :
                                    <input className="text-muted" defaultValue={JSON.parse(User).Block} type="text" name="Block"></input>
                                }
                              </MDBCol>
                              <MDBCol size="6" className="mb-3" style={{ marginTop: "30px" }}>
                                <MDBTypography tag="h6" className="InputHeader">Flat No.</MDBTypography>
                                {
                                  Editable ?
                                    <MDBCardText className="text-muted">{JSON.parse(User).FlatNo}</MDBCardText>
                                    :
                                    <input className="text-muted" defaultValue={JSON.parse(User).FlatNo} type="text" name="FlatNo"></input>
                                }
                              </MDBCol>
                              <MDBCol size="6" className="mb-3" style={{ marginTop: "30px" }}>
                                <MDBTypography tag="h6" className="InputHeader">Property Registered Name</MDBTypography>
                                {
                                  Editable ?
                                    <MDBCardText className="text-muted">{JSON.parse(User).RegisteredName}</MDBCardText>
                                    :
                                    <input className="text-muted" defaultValue={JSON.parse(User).RegisteredName} type="text" name="RegisteredName"></input>
                                }
                              </MDBCol>
                              <MDBCol size="6" className="mb-3" style={{ marginTop: "30px" }}>
                                <MDBTypography tag="h6" className="InputHeader">Parking slot</MDBTypography>
                                {
                                  Editable ?
                                    <MDBCardText className="text-muted">{JSON.parse(User).ParkingSlot}</MDBCardText>
                                    :
                                    <input className="text-muted" defaultValue={JSON.parse(User).ParkingSlot} type="text" name="ParkingSlot"></input>
                                }
                              </MDBCol>

                              <div >
                                {
                                  Editable ?
                                    <button className="btn btn-primary editProfileButton" onClick={() => changeInput()}>
                                      <img src={Edit} height="15px" width="15px" style={{ marginRight: "10px" }}></img>
                                      Edit
                                    </button>
                                    :

                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                      <button className="btn btn-danger editProfileButton" onClick={() => setEditable(true)}>
                                        <img src={cancel} height="15px" width="15px" style={{ marginRight: "10px" }}></img>

                                        Cancel</button>
                                      <Popconfirm
                                        title="Clicking ok button will edit the complaint details "
                                        onConfirm={() => UpdateSubmit()}
                                      >
                                        <button className="btn btn-primary editProfileButton">
                                          <img src={Update} height="15px" width="15px" style={{ marginRight: "10px" }} ></img>
                                          Update
                                        </button>
                                      </Popconfirm>
                                    </div>
                                }
                              </div>


                            </MDBRow>

                          </MDBCardBody>
                        </MDBCol>
                      </MDBRow>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
          }
        </section>
        <Modal show={show}>
          <Modal.Header >

          </Modal.Header>
          <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
            <span style={{ fontSize: "30px", letterSpacing: "1px", marginLeft: "20px" }}>Please wait until the update is successful</span>


          </Modal.Body>
          <Spinner />
        </Modal>
      </div>
    </>
  );
}