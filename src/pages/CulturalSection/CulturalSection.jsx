import { Alert } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import './CulturalSection.css';
import LoginNavBar from '../../components/LoginNavBar/LoginNavBar';
import { useGlobalContext } from '../../context/StateContext';
import activities from "../../assests/activities.png";
import Spinner from "../../components/Spinner/Spinner";
import { Web3Storage } from "web3.storage";

function CulturalSection() {
    const { User} = useGlobalContext();
    const [Loading, setLoading] = useState(false);

    const [DuplicateNotification, setDuplicateNotification] = useState(0);

    const PostCulturalSection = async (Title, Description) => {
        setLoading(true);
        
        const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcxOTdiN2M2OGFEMTNhNzREMGIzMGQ3OTI4OTNGMDc4MWQxZjE4M2QiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAxNjM1MTczNDIsIm5hbWUiOiJsb2RoYS1maWxlcyJ9.rmkUCge8MPPj5TC6i8Z5lVAjIevCSVni0gpu-_jUzlI" });
        const files = document.getElementsByName("CulturalActivityFiles").item(0).files;
        
        const cid = await client.put(files);
        const temp = []
        for(let file of files){
            temp.push(file.name);
        }
       
        const { data } = await axios.post("https://lodha-backend.onrender.com/api/v1/notification/new", {
            Title: Title,
            Description: Description, 
            PostedDate: new Date(),
            FileHashes: cid,
            FileObjects: temp
        });
        console.log("done");
        setLoading(false);
        if (data.success === false) {
            setDuplicateNotification(2);
        }
        else {
            setDuplicateNotification(1);
        }
    }
    const CulturalSectionSubmit = (e) => {
        const Title = e.target.Title.value;
        const Description = e.target.Description.value;
        e.preventDefault();
        PostCulturalSection(Title, Description);
        e.target.Title.value = ""; 
        e.target.Description.value = "";
    };



    return (
        <>
            <LoginNavBar />
            <div>
                <div style={{ display: "flex", justifyContent:"center", }}>
                    <img src={activities} style={{ height: "50px", width: "50px", marginTop : "100px", marginRight: "15px"}}></img>
                    <p id="title2">CULTURAL ACTIVITIES</p>
                </div>
                {
                    Loading && <Spinner />
                }
                {
                    DuplicateNotification > 0 ? DuplicateNotification===2? <Alert message="Error" type="error" description="Cultural Activity Details Already Exists! Please try again" showIcon closable style={{ marginBottom: "20px",marginTop:"20px", width:"60%",letterSpacing:"2px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginLeft:"20%" }} />
                    :
                    <Alert message="Success" type="success" description="Cultural Activity Details Posted Successfully!" showIcon closable style={{ marginBottom: "20px",marginTop:"20px", width:"60%", letterSpacing:"2px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginLeft:"20%" }} /> : <></>
                }
                <div class="container" >
                    <div class="row mx-0 justify-content-center">
                        <div class="col-md-10 col-lg-9 px-lg-2 col-xl-8 px-xl-0">
                            <form
                                className="w-100 rounded p-4 border backgroundcolor HelpDeskSection"
                                onSubmit={CulturalSectionSubmit}
                            >

                                <label class="d-block mb-4">
                                    <span class="d-block mb-2 head">Cultural Activity Title</span>
                                    <input
                                        name="Title"
                                        type="text"
                                        id="activity"
                                        class="form-control temp"
                                        placeholder="Cultural Activity Title"
                                    />
                                </label>

                                <div class="mb-4">
                                    <label class="d-block mb-2 head">Related Files</label>
                                    <p style={{ fontSize: "14px" }}>(.xlsx, .xls, images, .doc, .docx, .pdf are only accepted)</p>
                                    <div class="form-control h-auto temp">
                                        <input name="CulturalActivityFiles" type="file" class="form-control-file" multiple accept=".xlsx,.xls,image/*,.doc, .docx,.pdf" />
                                    </div>
                                </div>

                                <label class="d-block mb-4">
                                    <span class="d-block mb-2 head">Description</span>
                                    <textarea
                                        name="Description"
                                        class="form-control temp"
                                        rows="3"
                                        placeholder="Description for Cultural Activity"
                                    ></textarea>
                                </label>

                                <div class="mb-3">
                                    <button type="submit" class="btn btn-dark px-3 w-100 Help-desk-submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CulturalSection;