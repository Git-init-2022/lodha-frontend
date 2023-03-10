import React from 'react'
import './AdminPosts.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Web3Storage } from 'web3.storage';
import done from "../../assests/done.png";
import redCircle from "../../assests/redCircle.png";
import comment from '../../assests/comments.png';

import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { useGlobalContext } from '../../context/StateContext';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import image from '../../assests/image.png';
import docx from '../../assests/docx.png';
import pdf from '../../assests/pdf.png';
import excel from '../../assests/excel.png';
import ppt from '../../assests/ppt.png';
import Spinner from '../Spinner/Spinner';

const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcxOTdiN2M2OGFEMTNhNzREMGIzMGQ3OTI4OTNGMDc4MWQxZjE4M2QiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAxNjM1MTczNDIsIm5hbWUiOiJsb2RoYS1maWxlcyJ9.rmkUCge8MPPj5TC6i8Z5lVAjIevCSVni0gpu-_jUzlI" });



function AdminPosts({ props, selectedOption }) {

    const [singleUser, setSingleUser] = useState([])
    const [filesNames, setFilesNames] = useState([]); 
    const [loading, setLoading] = useState(false);
    const user = async () => {
        const { data } = await axios.get("https://lodha-backend.onrender.com/api/v1/singleUser", { params: { FlatNo: props.FlatNo } });
        const singleuser = data.user1[0];
        setSingleUser(singleuser)
        return singleuser;
    }

    useEffect(() => {
        user()
    }, []);


    const refreshPage = () => {
        window.location.reload();
    }

    const createNotification = async (FlatNo, subject, message) => {
        const { data } = await axios.post("https://lodha-backend.onrender.com/api/v1/postNotification", { FlatNo: FlatNo, NotificationTitle: subject, NotificationDesc: message });
        console.log(data);
      }

    const updateComplaint = async () => {
        setLoading(true);
        const { data } = await axios.get("https://lodha-backend.onrender.com/api/v1/updatecomplaint", { params: { complaint: props, Admin: JSON.parse(localStorage.getItem("User")).FlatNo } });
        createNotification(props.FlatNo, data.subject, data.message);
        setLoading(false);
        // refreshPage();
    }

    const deleteUserComplaint = async () => {
        const { data } = await axios.get("https://lodha-backend.onrender.com/api/v1/deletecomplaint", { params: { complaint: props, Admin: JSON.parse(localStorage.getItem("User")).FlatNo } });
        refreshPage();
    }

    const UpdateComplaint = (e) => {
        e.preventDefault();
        if (props.Status === 0) {
            const Status = document.getElementById("Status").value;
           
            const comment = document.getElementsByName("comment").item(0).value;
            console.log(comment);
            props.Status = Status;
            props.Comments = comment;
            console.log(props);
            updateComplaint();
        }

    }

    const DeleteComplaint = (e) => {
        e.preventDefault();
        deleteUserComplaint();
    }
    const check = (Time) => {
        let days = 0;
        for (let t of Time) {
            if (t === ' ') {
                break;
            }
            else {
                days = days * 10 + (t - '0');
            }
        }
        if (selectedOption === "all") {
            return true;
        }
        else if (selectedOption === "month" && days >= 30) {
            return true;
        }
        else if (selectedOption === "twomonths" && days >= 60) {
            return true;
        }
        else if (selectedOption === "threemonths" && days >= 90) {
            return true;
        }
        else if (selectedOption === "fourmonths" && days >= 120) {
            return true;
        }
        else if (selectedOption === "fivemonths" && days >= 150) {
            return true;
        }
        else if (selectedOption === "sixmonths" && days >= 180) {
            return true;
        }
        return false;

    }

    const getSourceimg = (item) => {
        let x = ''
        let i = item.lastIndexOf('.');
        for (let index = i + 1; index < item.length; index++) {
            x += item[index]
        }
        if (x === 'png' || x === 'jpg' || x === 'gif' || x === 'jpeg') {
            return image;
        }
        if (x === 'docx' || x === 'doc') {

            return docx;
        }
        if (x === 'pdf') {
            return pdf;
        }
        if (x === 'xlsx' || x === 'xls') {
            return excel;
        }
        if (x === 'pptx' || x === 'ppt') {
            return ppt;
        }

    }

    return (
        <>
            {

                (check(props.Time)) ? <Card className="m-3 backgroundcoloring PostBackground1">
                    <form>
                        <Card.Header className="PostTitle">
                            <div className='PostHeader'>
                                <div style={{ width: "90%" }}>
                                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                                        <div>
                                            <label className='PostHeading'>Flat Number  </label>
                                            <span className='PostsIssue'>{singleUser.FlatNo}</span>
                                        </div>
                                        <div>
                                            <label className='PostHeading'>Name  </label>
                                            <span className='PostsIssue'>{singleUser.OwnerName}</span>
                                        </div>
                                        <div>
                                            <label className='PostHeading'>Mobile  </label>
                                            <span className='PostsIssue'>{singleUser.Mobile}</span>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "left" }}>
                                        <label className='PostHeading'>Issue  </label>
                                        <span className='PostsIssue' style={{ color: 'blue', }}>{props.Issue}</span>
                                    </div>
                                </div>

                                <div>
                                    {props.Status ?
                                        props.Status == 1 ?
                                            <div>
                                                <img src={done} height="20px" width="20px"></img>
                                                <span style={{ color: "green", fontWeight: "bold", fontSize: "16px", letterSpacing: "2px" }}>Resolved</span>
                                            </div> :
                                            <div>
                                                <img src={redCircle} height="20px" width="20px"></img>
                                                <span style={{ color: "red", fontWeight: "bold", fontSize: "16px", letterSpacing: "2px" }}>Closed</span>
                                            </div>
                                        :
                                        <select name="Status" id='Status' className='statusOptions'>
                                            <option value="0" style={{ color: "orange" }}>
                                                Pending
                                            </option>
                                            <option value="1" style={{ color: "green" }}>
                                                Resolved
                                            </option>
                                            <option value="2" style={{ color: "red" }}>
                                                Closed
                                            </option>
                                        </select>}
                                    <p style={{ color: "black", fontWeight: "bold", fontSize: "16px", letterSpacing: "1px", marginTop: "10px" }}>{props.Time + " Ago"} </p>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text className="PostDesc">
                                <div className='documentDescDiv'>
                                    <div className='descDisplayDiv'>
                                        <p className='DescriptionTitle'>DESCRIPTION</p>
                                        <div contentEditable style={{letterSpacing:"1px" ,width: "100%" }} id={props._id}>{props.Description}</div>
                                    </div>
                                    <div className='descDocumentDiv'>
                                        <p className='DescriptionTitle'>DOCUMENTS</p>

                                        {
                                            props.FileObjects.length ?
                                                <div className='documentDiv'>
                                                    {
                                                        props.FileObjects.map((item) => {
                                                            return (
                                                                <Card className="card CardDocument" style={{ width: "250px", margin: "10px" }}>
                                                                    <Card.Body className='CardBodyDiv'>


                                                                        <div style={{ display: "flex", }}>
                                                                            <img src={getSourceimg(item)} width="50px" height="50px"></img>

                                                                            <p style={{ marginLeft: "10px" }}> {item}</p>
                                                                        </div>

                                                                    </Card.Body>
                                                                    <Button href={"https://" + props.FileHashes + ".ipfs.w3s.link/" + item} style={{ width: "100%", marginBottom: "0px" }} target="blank" variant="primary" >View document</Button>

                                                                </Card>
                                                            );
                                                        })
                                                    }
                                                </div>
                                                :
                                                <p style={{letterSpacing:"1px"}}>
                                                    No Documents!
                                                </p>
                                        }
                                    </div>
                                </div>
                                {
                                    props.Status === 0 ?
                                        <>
                                            <div>
                                                <p className='DescriptionTitle'>ADD COMMENT</p>
                                                <textarea
                                                    name="comment"
                                                    class="commentBox"
                                                    rows="3"
                                                    placeholder="Comment Here"

                                                ></textarea>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div>
                                                <p className='DescriptionTitle'>COMMENTS </p>
                                                {
                                                    props.Comments !== undefined && props.Comments.length > 0 ?
                                                        <div style={{ width: "100%",letterSpacing:"1px" }} >{props.Comments}</div>
                                                        :
                                                        <>
                                                            <p style={{letterSpacing:"1px"}}>No comments!</p>
                                                        </>
                                                }
                                            </div>
                                        </>
                                }
                                {loading && <Spinner />}
                                <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                                    {
                                        props.Status === 0 ? <button className="btn btn-primary " type="submit" onClick={(e) => UpdateComplaint(e)}>Edit Complaint</button> : <></>
                                    }
                                    <button className="btn btn-danger" type="submit" style={{ marginLeft: "50px" }} onClick={(e) => DeleteComplaint(e)}>Delete Complaint</button>
                                </div>



                            </Card.Text>
                        </Card.Body>
                    </form>
                </Card> : <></>
            }
        </>
    )
}

export default AdminPosts;
