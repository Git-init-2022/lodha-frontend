import React, { useState } from "react";
import { Web3Storage } from 'web3.storage';
import './Documents.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useEffect } from "react";
import axios from "axios";
import image from '../../assests/image.png';
import bank from '../../assests/bank.png';

import document from "../../assests/document.png";
import docx from '../../assests/docx.png';
import pdf from '../../assests/pdf.png';
import excel from '../../assests/excel.png';
import ppt from '../../assests/ppt.png';
import legalUpdate from '../../assests/legalUpdate.png';
import { ExceptionOutlined, FilePdfFilled } from "@ant-design/icons";
import Spinner from "../../components/Spinner/Spinner";



function BasicExample() {

  const [Documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [TypeOfDoc, setTypeOfDoc] = useState("all");
  let Type = "all";

  const types = {
    legal: "Legal Update",
    bank: "Bank Statements",
    audit: "Audit Reports"
  }

  const fetchDocuments = async () => {
    const { data } = await axios.get("https://lodha-backend.onrender.com/api/v1/getDocumentsByType", { params: { Type: Type } });
    setLoading(false);
    setDocuments(data.documents);
  }

  useEffect(() => {

    fetchDocuments();
  }, [])


  const changeDocumentsType = (e) => {
    Type = e.target.value;
    setTypeOfDoc(Type);
    setLoading(true);
    fetchDocuments();
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

  const getimagesource = (type) => {
    if (type === 'legal') {
      return legalUpdate;
    }
    if (type === 'bank') {
      return bank;
    }
    if (type === 'audit') {

    }
  }

  const getFormattedDate = (date) => {

    let timeStamp = Date.parse(date);
    var date = new Date(timeStamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = date.getFullYear();
    var month = months[date.getMonth()];
    var dateVal = date.getDate();
    var formattedDate = dateVal + 'th ' + month + ', ' + year;
    return formattedDate;
  }

  return (
    <>
      <div className="mainDiv">
        <span className="filterDocuments">Filter Documents</span>
        <select defaultValue="all" name="documentType" className="documentDropdown" onChange={changeDocumentsType} >
          <option value="all">
            All
          </option>
          <option value="legal">
            Legal Update
          </option>
          <option value="bank">
            Bank Statements
          </option>
          <option value="audit">
            Audit Reports
          </option>
        </select>
        <p style={{ textAlign: "center", letterSpacing: "1px", fontSize: "20px",marginTop:"20px", marginLeft:"20px",padding:"10px", border:"3px solid #675A0E", borderRadius:"5px"}}> 	&#42; {TypeOfDoc[0].toUpperCase() + TypeOfDoc.slice(1)} Documents will appear here. Click <strong> View Document</strong> button to view the document.  </p>

        <div className="DocumentsDiv">
          {
            loading ?
              <div style={{margin:"0 auto"}}>
                <Spinner />
              </div>
              :
              Documents.length ?
                Documents.map((item) => {
                  return (
                    <Card className="DocumentCard">
                      <Card.Title >
                        <img height="100px" width="100px" style={{ marginTop: "10px" }} src={getimagesource(item.Type)} ></img>
                      </Card.Title>

                      <Card.Body>
                        <p style={{ letterSpacing: "1px", fontSize: "20px", textDecorationLine: "underline", textUnderlineOffset: "10px", textDecorationColor: "gray" }}>{types[String(item.Type)]}</p>
                        <div className="DisplayDiv">
                          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                            <img src={getSourceimg(item.Name)} height="25px" width="25px"></img>
                            <Card.Title style={{ letterSpacing: "0.5px", fontSize: "16px", marginLeft: "10px" }}>{item.Name}</Card.Title>
                          </div>
                          <span>{getFormattedDate(item.UploadDate)}</span>
                        </div>
                        <Card.Text>

                        </Card.Text>
                        <Button variant="primary" target="blank" href={"https://" + item.Hash + ".ipfs.w3s.link/" + item.Name} className="viewDocumentButton">
                          <img src={document} height="20px" width="20px" style={{ marginRight: "10px" }}></img>View Document</Button>
                      </Card.Body>
                    </Card>
                  );
                })
                :
                <p style={{letterSpacing: "1px", fontSize: "20px", marginLeft: "50%", color: "rgb(83, 74, 26)", textAlign: "center", marginTop: "20px", verticalAlign:"center"}}>No Documents !</p>
          }
        </div>
      </div>
    </>
  );
}

export default BasicExample;