import React from 'react'
import './Posts.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Popconfirm } from 'antd';
import { Web3Storage } from 'web3.storage';
import done from "../../assests/done.png";
import redCircle from "../../assests/redCircle.png";
import image from '../../assests/image.png';
import docx from '../../assests/docx.png';
import pdf from '../../assests/pdf.png';
import excel from '../../assests/excel.png';
import ppt from '../../assests/ppt.png';
import comment from '../../assests/comments.png';
import { Steps } from 'antd';
const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcxOTdiN2M2OGFEMTNhNzREMGIzMGQ3OTI4OTNGMDc4MWQxZjE4M2QiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAxNjM1MTczNDIsIm5hbWUiOiJsb2RoYS1maWxlcyJ9.rmkUCge8MPPj5TC6i8Z5lVAjIevCSVni0gpu-_jUzlI" });
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
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';

function Posts({ props }) {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  let timeStamp = Date.parse(props.Time);
  var date = new Date(timeStamp);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = date.getFullYear();
  var month = months[date.getMonth()];
  var dateVal = date.getDate();
  var formattedDate = dateVal + '-' + (date.getMonth() + 1) + '-' + year;
  const { User } = useGlobalContext();

  const refreshPage = () => {
    window.location.reload();
  }

  const createNotification = async (FlatNo, subject, message) => {
    const { data } = await axios.post("https://lodha-backend.onrender.com/api/v1/postNotification", { FlatNo: FlatNo, NotificationTitle: subject, NotificationDesc: message });
  }
  
  const updateComplaint = async () => {
    const { data } = await axios.get("https://lodha-backend.onrender.com/api/v1/updatecomplaint", { params: { complaint: props } });
    setLoading(false);
    refreshPage();
  }

  const UpdateDescription = (e) => {
    e.preventDefault();
    setLoading(true);
    const desc = document.getElementById((props._id).toString()).innerText;
    props.Description = desc;
    updateComplaint();

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
      <Card className="m-3 backgroundcoloring PostBackground">
        <Card.Header className="PostTitle">
          <div className='PostHeader'>
            <div>
              <label className='PostHeading'>Complaint Type </label>
              <span className='PostsIssue'> {props.Issue}</span>
            </div>
            <div>
              {/* {props.Status ? <div>
                <img src={done} height="20px" width="20px"></img>
                <span style={{ color: "green", fontWeight: "bold", fontSize: "18px", letterSpacing: "2px" }}>Done</span>
              </div>
                :
                <div>
                  <img src={redCircle} height="20px" width="20px"></img>
                  <span style={{ color: "red", fontWeight: "bold", fontSize: "18px", letterSpacing: "2px" }}>Pending</span>
                </div>
              } */}
              <label className='PostHeading'>Posted on</label>
              <span style={{ color: "black", fontWeight: "bold", fontSize: "16px", letterSpacing: "1px", marginLeft: "20px" }}>{formattedDate}</span>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Text className="PostDesc">
            <form
              onSubmit={UpdateDescription}
            >
              <div className='complaintsDescDocuments'>
                <div className="ComplaintDocumentDiv">
                  <p className='DescriptionTitle'>DESCRIPTION</p>
                  <div contentEditable style={{ width: "100%", letterSpacing:"1px" }} id={props._id}>{props.Description}</div>
                </div>
                <div className="ComplaintDocumentDiv" style={{ width: "50%" }}>
                  <p className='DescriptionTitle'>DOCUMENTS</p>

                  {
                    props.FileObjects.length ?
                      <div className='documentDiv'>
                        {
                          props.FileObjects.map((item) => {
                            return (
                              <Card className="card CardDocument" style={{ width: "250px", margin: "10px", backgroundColor: "whitesmoke" }}>
                                <Card.Body className='CardBodyDiv'>



                                  {
                                    item.endsWith('.png')
                                      ?

                                      <div>
                                        <img src={"https://" + props.FileHashes + ".ipfs.w3s.link/" + item} width="150px" height="150px"></img>
                                        <p style={{ marginLeft: "10px", letterSpacing:"1px" }}> {item}</p>
                                      </div>
                                      :
                                      <div style={{ display: "flex", }}>
                                        <img src={getSourceimg(item)} width="50px" height="50px"></img>
                                        <p style={{ marginLeft: "10px", letterSpacing:"1px" }}> {item}</p>
                                      </div>
                                  }


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
              <div>
                <p className='DescriptionTitle'>STATUS</p>
                <Steps
                  current={props.Status == 0 ? 1 : 3}
                  style={{ marginTop: "50px", color:"green" }}
                  items={[
                    {
                      title: 'Submitted',
                      className: "statusTitles"
                    },
                    {
                      title: 'In Progress',
                      className: "statusTitles"
                    },
                    {
                      title: (props.Status>0) ?  props.Status===1 ? 'Resolved' : 'Closed' : 'Waiting',
                      className: "statusTitles",
                      
                    },
                  ]}
                /></div>

              <div>
                {
                  isVisible ?
                    <p className='CommentHeader' onClick={() => setIsVisible(false)}>
                      <img src={comment} height="20px" width="20px"></img> Hide Comments
                    </p>
                    :
                    <p className='CommentHeader' onClick={() => setIsVisible(true)}>
                      <img src={comment} height="20px" width="20px"></img> Comments {
                         props.Comments !== undefined && props.Comments.length > 0 ? "(1)" : "(0)"
                      }
                    </p>
                }
              </div>
              {
                isVisible ?
                  <div>
                    <p className='DescriptionTitle'> COMMENTS </p>
                    {
                      props.Comments !== undefined && props.Comments.length > 0 ?
                        <div style={{ letterSpacing:"1px",width: "100%" }} >{props.Comments}</div>
                        :
                        <>
                          <p style={{letterSpacing:"1px"}}>No comments!</p>
                        </>
                    }

                  </div>
                  :
                  <></>
              }
              {
                loading && <Spinner />
              }
              <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                <Popconfirm
                  title="Clicking ok button will edit the complaint details "
                  onConfirm={(e) => UpdateDescription(e)}
                >

                  <button className="btn btn-success ComplaintsButton" type="submit">Edit Complaint</button>
                </Popconfirm>
              </div>
            </form>


          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Posts;
