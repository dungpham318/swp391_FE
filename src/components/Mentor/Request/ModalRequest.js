import React, { useState, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom'
import { ENDPOINT } from "../../../config";

import Logo from '../../image/logo.png'


export default function ModalRequest(props) {


    const [subject, setSubjectID] = useState("");
    const [appointmentID, setAppointmentID] = useState("");
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (props?.subject || props?.appointment) {
            setSubjectID(props?.subject)
            setAppointmentID(props?.appointment?.id)
        }
    }, [props?.subject, props?.appointment])

    async function UpdateAppointment(e) {

        let body = {
            statusID: e
        }
        const res = await fetch(ENDPOINT + `api/appointment/update?appointmentID=${appointmentID}`, {
            method: `PUT`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
            },
            body: JSON.stringify(body)

        }).then(res => res.json())
            .then(result => {

                if (result?.resultCode === 1) {
                    props.onUpdate()
                    props.onModal()
                    alert(e == 3 ? "accecpt r nè" : "reject r nè")
                } else {
                    alert("update thất bại")

                }
                return res

            })
            .catch((error) => {
                throw ('Invalid Token')
            })
        return body
    }

    return (
        <div className="clear-both mb-0 ">
            <div className="border-b-2 mb-5 border-gray-400">
                <Link to="/"><img src={Logo} alt="logo" className="float-left w-64 h-24 pr-2" /></Link>
                <div className="">
                    <h2 className=" text-3xl font-bold  text-black pt-2"> Request Detail </h2>
                    <p className="text-gray-500 pb-8 pl-2 pr-24">Student can booking and question for Mentor</p>
                </div>
            </div>

            <div className=" m- h-5/6 w-5/6 mx-14 text-black  text-3xl">
                <p className=" font-bold pb-2">Subject: <a className="font-normal " >{subject}</a>  </p>
                <p className=" font-bold pb-2">Date: <a className="font-normal " >{props?.appointment?.startTime?.slice(8, 10)}/{props?.appointment?.startTime?.slice(5, 7)}/{props?.appointment?.startTime?.slice(0, 4)}</a>  </p>
                <p className=" font-bold pb-2">Time: <a className="font-normal " >{props?.appointment?.startTime?.slice(11, 16)} to {props?.appointment?.endTime?.slice(11, 16)}</a>  </p>
                <p className=" font-bold pb-2">Individual of group: <a className="font-normal " >{props.group}</a>  </p>
                <p className=" font-bold pb-2">Question: <a className="font-normal " >{props.question}</a>  </p>
                <div className="text-center">
                    <button className="h-12 w-32 m-4 bg-red-700 border-2" onClick={() => UpdateAppointment(3)}>Accept</button>
                    <button className="h-12 w-32 m-4 bg-red-700 border-2" onClick={() => UpdateAppointment(1)} >Cancel</button>
                </div>

            </div>

        </div>
    )
}

