import React from "react";
import './GeneralNotifications.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import axios from "axios";
import announcement from "../../assests/announcement.png";
import calender from "../../assests/calendar.png";
import image from '../../assests/image.png';
import document from "../../assests/document.png";
import docx from '../../assests/docx.png';
import pdf from '../../assests/pdf.png';
import excel from '../../assests/excel.png';
import ppt from '../../assests/ppt.png';
import { useGlobalContext } from '../../context/StateContext';
import Spinner from "../../components/Spinner/Spinner";
import { Card } from "react-bootstrap";



function GeneralNotifications() {
    const [modalShow, setModalShow] = useState(false);
    const [generalNotifications, setGeneralNotifications] = useState([]);
    const [titleVar, setTitleVar] = useState('');
    const [DescVar, setDescVar] = useState('');
    const [TimeVar, setTimeVar] = useState('');
    const [filehash, setfilehash] = useState('');
    const [fileobjects, setfileobjects] = useState([]);
    const { User } = useGlobalContext();
    const [loading, setLoading] = useState(true);
    const [isAdmin, setisAdmin] = useState(JSON.parse(User).Role === 'admin');
    const fetchNotifications = async () => {
        const { data } = await axios.get("https://lodha-backend.onrender.com/api/v1/AllNotifications");
        setLoading(false);

        setGeneralNotifications(data.notifications);
        console.log(generalNotifications);
    }

    const getFormattedTime = (DateOfMeeting) => {


        let timeStamp = Date.parse(DateOfMeeting);
        var date = new Date(timeStamp);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        return months[month] + " " + day + ", " + year;
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

    useEffect(() => {
        fetchNotifications();
    }, [generalNotifications.length]);
    const handleHide = () => {
        setDescVar('');
        setTitleVar('');
        setTimeVar('');
        setfilehash('');
        setfileobjects([]);
        setModalShow(false);
    }
    const handleShow = (Title, Description, time, filehash, fileobjects) => {
        console.log(filehash);
        setModalShow(true);
        setTitleVar(Title);
        setDescVar(Description);
        setTimeVar(getFormattedTime(time))
        setfilehash(filehash)
        setfileobjects(fileobjects)
        console.log(fileobjects)
    }
    return (
        <>
            <div className="NotifyItems">
                <p className='NotifyHeader' >COMMUNITY ANNOUNCEMENTS</p>
                <p style={{ textAlign: "center", fontSize: "18px", letterSpacing: "1px", }}>Note - To View details click on MORE</p>
                <hr style={{ height: "1", backgroundColor: "black", width: "94%", marginLeft: "3%" }}></hr>
                {
                    loading ?
                        <Spinner />
                        :
                        generalNotifications.length === 0 ?
                            <>
                                <p style={{ fontSize: "16px", letterSpacing: "1px", textAlign: "center" }}>No Announcements !</p>
                            </>
                            :
                            generalNotifications.map((item, index) => {
                                return (
                                    <>
                                        <div className="announcement" style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                                            <div className="announcementMobileView" style={{ marginLeft: "30px", width: "70%" }}>
                                                <div style={{ display: "flex" }}>
                                                    <img src={announcement} height="25px" width="25px"></img>
                                                    <p style={{ marginLeft: "20px", fontSize: "22px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left", textDecorationLine: "underline", textUnderlineOffset: "10px", textDecorationColor: "#675A0E", textDecorationThickness: "2px" }}>
                                                        {item.Title}
                                                    </p>
                                                </div>
                                                <div>

                                                    <p style={{ marginLeft: "45px", fontSize: "12px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left", }}>
                                                        <img src={calender} height="20px" width="20px"></img> Posted on {getFormattedTime(item.PostedDate) }
                                                    </p>
                                                </div>
                                                <div>
                                                    <p style={{ marginLeft: "45px", fontSize: "14px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left", }}>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim illum iste maiores culpa impedit nam reiciendis nulla odio eos fuga.
                                                    </p>
                                                </div>
                                            </div>
                                            <Button variant="primary" className="AnnouncementsButton" onClick={() => handleShow(item.Title, item.Description, item.PostedDate, item.FileHashes, item.FileObjects)} > More &rarr;
                                            </Button>
                                        </div>
                                        <hr style={{ height: "1", backgroundColor: "black", width: "94%", marginLeft: "3%" }}></hr>
                                    </>
                                )
                            })

                }
                <Modal
                    show={modalShow}
                    onHide={handleHide}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{letterSpacing:"1px"}}>
                            {titleVar}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span style={{ fontSize: "16px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left", textDecorationLine: "underline", textUnderlineOffset: "10px", textDecorationColor: "#675A0E", textDecorationThickness: "2px" }}>
                            Description -
                        </span>
                        <p style={{ letterSpacing: "1px", fontSize: "16px", marginLeft: "5px", marginTop: "20px" }}>{DescVar}</p>

                        <span style={{ fontSize: "16px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left", textDecorationLine: "underline", textUnderlineOffset: "10px", textDecorationColor: "#675A0E", textDecorationThickness: "2px" }}>
                            Posted on - 
                        </span>
                        <p style={{ letterSpacing: "1px", fontSize: "16px", marginLeft: "5px", marginTop: "20px" }}>{getFormattedTime(TimeVar)}</p>
                        <div>
                            <p style={{ fontSize: "16px", marginTop: "20px", textTransform: "capitalize", letterSpacing: "1px", textAlign: "left", textDecorationLine: "underline", textUnderlineOffset: "10px", textDecorationColor: "#675A0E", textDecorationThickness: "2px" }}>
                                Documents

                            </p>
                            {
                                fileobjects && fileobjects.length ?
                                    <div className='documentDiv'>
                                        {
                                            fileobjects.map((item) => {
                                                return (
                                                    <Card className="card CardDocument" style={{ width: "250px", margin: "10px", backgroundColor: "whitesmoke" }}>
                                                        <Card.Body className='CardBodyDiv'>



                                                            {
                                                                item.endsWith('.png')
                                                                    ?

                                                                    <div>
                                                                        <img src={"https://" + filehash + ".ipfs.w3s.link/" + item} width="150px" height="150px"></img>
                                                                        <p style={{ marginLeft: "10px" }}> {item}</p>
                                                                    </div>
                                                                    :
                                                                    <div style={{ display: "flex", }}>
                                                                        <img src={getSourceimg(item)} width="50px" height="50px"></img>
                                                                        <p style={{ marginLeft: "10px" }}> {item}</p>
                                                                    </div>
                                                            }


                                                        </Card.Body>
                                                        <Button href={"https://" + filehash + ".ipfs.w3s.link/" + item} style={{ width: "100%", marginBottom: "0px" }} target="blank" variant="primary" >View document</Button>

                                                    </Card>
                                                );
                                            })
                                        }
                                    </div>
                                    :
                                    <p style={{ fontSize: "16px", letterSpacing: "1px", marginLeft: "5px" }}>No Documents! </p>

                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </>
    );
}

export default GeneralNotifications;