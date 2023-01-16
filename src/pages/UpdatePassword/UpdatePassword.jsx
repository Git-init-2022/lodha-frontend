import React, { Fragment, useState, useEffect, } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { useGlobalContext } from "../../context/StateContext";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import passwordReset from "../../assests/passwordReset.png";

import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "antd";
import Spinner from "../../components/Spinner/Spinner";

const UpdatePassword = ({ match }) => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [successful, setSuccessful] = useState(0);
    const [loading, setLoading] = useState(false);
    const Update = async (Password) => {
        setLoading(true);
        const { data } = await axios.get("https://lodha-backend.onrender.com/api/v1/updatepassword", { params: { token: token, Password: Password } });
        localStorage.setItem("data", JSON.stringify(data));
        setLoading(false);
        if (data.success === true) {
            setSuccessful(2);
        }
        else {
            setSuccessful(1);
        }
    }
    const UpdatePasswordSubmit = (e) => {
        e.preventDefault();
        const Password = e.target.Password.value;
        const confirmPassword = e.target.ReEnterPassword.value;
        console.log(Password);
        console.log(token);
        console.log(confirmPassword);
        if (Password.length > 0 && (Password === confirmPassword)) {

            Update(Password);
        }
        else {
            alert("password didnt match");
        }
    };


    return (
        <Fragment>
            <NavBar />
            <MetaData title="Update Password" />
            {
                successful > 0 ? successful == 1 ? <Alert
                description="Invalid Credentials! Better luck next time."
                type="error"
                showIcon
                closable
                message="Error"
                style={{ marginBottom: "20px", marginTop: "20px", width: "60%", letterSpacing: "2px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginLeft: "20%" }}
              /> :
                <Alert message="Success" type="success" description="Password Update Successfully, Please Login with new password." showIcon closable style={{ marginBottom: "20px", marginTop: "100px", width: "60%", letterSpacing: "2px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginLeft: "20%" }} /> : <></>
            
            }
            {
                loading && <Spinner />
            }
            <div className="forgotPasswordContainer">
                <div className="forgotPasswordBox">
                    <div style={{ display: "flex", marginTop: "20px", justifyContent: "center" }}>
                        <img src={passwordReset} height="25px" width="25px" style={{ marginTop: "5px", marginRight: "10px" }}></img>
                        <h2 className="forgotPasswordHeading">Update Password</h2>
                    </div>
                    <hr style={{ width: "90%", height: "2px", backgroundColor: "black", color: "black", marginLeft: "5%" }}></hr>

                    <form className="forgotPasswordForm" method='put' onSubmit={UpdatePasswordSubmit}>
                        <div className="forgotPasswordEmail">
                            <div>
                                <label className="ForgotPasswordLabel">New Password</label><br></br>
                                <input
                                    type="password"
                                    placeholder="Enter your New Password"
                                    required
                                    name="Password"
                                    className="ForgotPasswordInput"
                                />
                            </div>
                            <div>
                                <label className="ForgotPasswordLabel">Confirm New Password</label><br></br>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    name="ReEnterPassword"
                                    className="ForgotPasswordInput"
                                />
                            </div>
                        </div>
                        <button type="submit" className="forgotPasswordButton">Update Password</button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default UpdatePassword;