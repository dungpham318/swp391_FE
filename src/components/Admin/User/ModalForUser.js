import React, { Component, useState, useEffect, useContext } from "react";
import { Link, NavLink } from 'react-router-dom'
import { ENDPOINT } from "../../../config";
import Logo from '../../image/logo.png'

export default function ModalForUser(props) {
    const [role, setRole] = useState("")
    const [id, setId] = useState("")
    const [information, setInformation] = useState([]);
    const [subject, setSubject] = useState([]);
    const [specspecialize, setSpecialize] = useState([]);

    useEffect(() => {
        if (props?.isClickedParent) {
            setId(props?.isClickedParent?.id);
            setRole(props?.isClickedParent?.roleID)
        }
    }, [props?.isClickedParent?.id, props?.isClickedParent?.roleID])

    useEffect(() => {
        if (props?.isClickedParent?.id) {
            featchPostList(id)
            if (props?.isClickedParent?.roleID == 2) {
                featchSubjectForMentor(id)
            }
        }
    }, [id]);

    async function featchSubjectForMentor(id) {
        try {

            const requestURL = ENDPOINT + `api/subject/get_list?mentorID=${id}`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();
            const { data } = responseJSON;
            setSubject(data?.rows);
            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }


    async function featchPostList(id) {
        try {
            const requestURL = ENDPOINT + `api/user/get_user_profile?userID=${id}`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();
            const { data } = responseJSON;
            setInformation(data);
            console.log(2909, data)
            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }


    async function updateRole() {
        const body = {
            roleID: parseInt(role),
            userID: id,
        };
        console.log(body, "---------")
        const res = await fetch(ENDPOINT + `api/user/add_role`, {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
            .then(result => {

                if (result) {
                    if (result?.resultCode == 1) {
                        props.onUpdate()
                        props.onModal()
                        props.parentCallback("Update Successfully");
                    }

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

    // const inforSubject = subject?.map( name => {return name.name})
    const nameSubject = subject?.map(name => (name.name))
    const inforSpecialize = props?.spec?.filter(specInfor => { if (specInfor?.id == information?.specializeID) { return specInfor.name } })
    console.log(123123, inforSpecialize);
    const nameSpecialize = inforSpecialize?.map(name => { return name.name })
    let dataRole;
    if (props?.isClickedParent?.roleID == '2') {
        dataRole = (
            <tr className="border-b-2 h-50 ">
                <th className="text-left  "> Subject:  </th>
                <td className="font-normal pl-10  text-gray-900 outline-none">{nameSubject.join(", ")}</td>
            </tr>)
    }
    else if (props?.isClickedParent?.roleID == '1') {
        dataRole = (
            <tr className="border-b-2 h-50 ">
                <th className="text-left  "> Specialize:  </th>
                <td className="font-normal pl-10 text-gray-900 outline-none">{nameSpecialize}</td>
            </tr>)
    }
    return (
        <div className="clear-both mb-0 ">
            <div className="border-b-2 mb-5 border-gray-400">
                <Link to="/"><img src={Logo} alt="logo" className="float-left w-64 h-24 pr-2" /></Link>
                <div className="">
                    <h2 className=" text-3xl font-bold  text-black pt-2"> User Detail </h2>
                    <p className="text-gray-500 pb-2 pl-2 pr-24">Admin can view User information and update User to Mentor</p>
                </div>
            </div>
            <div className=" mx-16 text-black  text-2xl">

                <table className="text-gray-500">
                    <tbody >
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Email:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none">{information?.email}</td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Name:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none">{information?.fullName}</td>
                        </tr>

                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Role:  </th>
                            <td className="">
                                <select value={role} onChange={e => setRole(e.target.value)} className="font-normal pl-3 text-gray-900 outline-none ">
                                    {props?.role?.map(postRole => {
                                        {
                                            return (
                                                <option
                                                    value={postRole?.id}
                                                    key={postRole?.id} > {postRole?.name}  </option>
                                            )
                                        }
                                    })}
                                </select></td>
                        </tr>

                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> MSSV:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none"></td>
                        </tr>
                        {dataRole}
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Address:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none">{information?.address}</td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> Phone:  </th>
                            <td className="font-normal pl-10 text-gray-900 outline-none">{information?.phone}</td>
                        </tr>


                    </tbody>

                </table>

            </div>
            <div className=" cursor-pointer w-full h-14 leading-56 text-4xl text-center  float-right bg-black hover:text-black hover:bg-blue-500 text-red-50" onClick={updateRole} > Update</div>

        </div>
    )
}

