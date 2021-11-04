import React, { useState } from "react";
import { Link, NavLink, useHistory } from 'react-router-dom';
import Footer from "../../Footer";
import Header from '../../Header';
import Logo from '../../image/logo.png';
import Profile from "./Profile";
import { ENDPOINT } from "../../../config";

function ChangePassword(props) {
    const history = useHistory();
    if (!localStorage.getItem(`user-token`)) {
        history.push("/login")
    }
    const validPassword = new RegExp("(?=.{7,13}$)");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [pwdError, setPwdError] = useState(false);
    const [pwoError, setPwoError] = useState(false);
    const [pwcError, setPwcError] = useState(false);
    const body = { password: password, oldPassword: oldPassword };
    const [postList, setpostList] = useState([]);

    const handleSubmit = async () => {
        if (!validPassword.test(password) && password !== confirmPassword) {
            setPwdError(true);
            setPwcError(true);
        }
        else {
            if (!validPassword.test(password)) {
                setPwdError(true);
                setPwcError(false);
            } else {
                if (password !== confirmPassword) {
                    setPwcError(true);
                    setPwdError(false);
                } else {
                    setPwdError(false);
                    setPwcError(false);
                    let res = await fetch(ENDPOINT + "api/user/update_password", {
                        method: `PUT`,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                        },
                        body: JSON.stringify(body)

                    }).then(res => res.json())
                        .then(result => {
                            console.log(result)
                            if (result?.resultCode === 1) {

                                alert('Update Successfully')
                                history.push("/")

                            } else {
                                setPwoError(result?.message)
                            }
                        })
                        .catch((error) => {
                            throw ('Invalid Token')
                        })
                    return body

                }
            }
        }

    }

    let roleInput;
    if (props?.location?.state?.name?.isUpdatePassword == true) {
        roleInput = (<div id="form-field" className="text-left" >
            <input onChange={e => setOldPassword(e.target.value)} type="password" id="form-input" placeholder=" " className="ml-16" />
            <label id="form-label" className="">Current Password</label>
        </div>)
    }

    return (
        <Profile>
            <div className="col-span-4 h-621 ">

                <h2 className=" mb-4 ml-5 text-5xl">{props?.location?.state?.name?.isUpdatePassword == true ? "Changes Password" : "Update Password"}</h2>
                <hr className="mx-5 mb-10"></hr>

                <div className=" text-left ml-44 border-2 bg-white w-1/3 border-red-900 py-10">
                    {pwoError !== '' && <div className="text-xs   text-red-600 mb-5  text-center font-bold ">{pwoError}</div>}
                    {roleInput}
                    {pwdError && <div className="text-xs   text-red-600 mb-5  font-bold ">Length of password should be least  7</div>}
                    <div id="form-field">
                        <input type="password" id="form-input" placeholder=" " className="ml-16" onChange={e => setPassword(e.target.value)} />
                        <label id="form-label">{props?.location?.state?.name?.isUpdatePassword == true ? "New Password" : "Password"}</label>
                    </div>
                    {pwcError && <div className="text-xs   text-red-600 mb-5 font-bold">Your password is not confirm</div>}
                    <div id="form-field">
                        <input type="password" id="form-input" placeholder=" " className="ml-16" onChange={e => setConfirmPassword(e.target.value)} />
                        <label id="form-label">Confirm Password</label>
                    </div>
                    <button className="ml-20 bg-bluementor h-8 w-20 rounded-xl"> {props?.location?.state?.name?.isUpdatePassword == true ? <p onClick={handleSubmit}>Changes</p> : <p onClick={handleSubmit}>Update</p>} </button>

                    <br />
                </div>
            </div>
        </Profile>
    )
}
export default ChangePassword;