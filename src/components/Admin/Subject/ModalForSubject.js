import React, { Component, useState, useEffect, useContext, Fragment } from "react";
import { Link, NavLink, useHistory } from 'react-router-dom'
import Logo from '../../image/logo.png'
import { ENDPOINT } from "../../../config";
export default function ModalForSubject(props) {


    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [description, setDescription] = useState("");
    const [specializeID, setSpecializeID] = useState(0);

    let option;
    let value;


    function handleSearchTermChange(e) {
        value = (e.target.value).length;
        console.log((e.target.value).length);
    }

    const [nameError, setNameError] = useState(false);
    const [Error, setError] = useState(false);

    const body = {
        name,
        code,
        description,
        specializeID,
    };



    async function CreteSubject() {
        if (name !== undefined && name != ""
            && code !== undefined && code != ""
            && description !== undefined && description != ""
            && specializeID !== undefined && specializeID != "") {
            setError(false);
            const requestURL = ENDPOINT + `api/subject/get_list?`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();
            const { data } = responseJSON;

            let nameTrung = data?.rows?.map(function (e) {
                return e.name.toLowerCase().trim().split(' ').join('');
            }).indexOf(name.toLowerCase().trim().split(' ').join(''));
            let codeTrung = data?.rows?.map(function (e) {
                return e.code.toLowerCase().trim().replace(/\s/g, '');
            }).indexOf(code.toLowerCase().trim().replace(/\s/g, ''));
            if (nameTrung == -1 && codeTrung == -1) {
                setNameError(false)
                const res = await fetch(ENDPOINT + `api/subject/create`, {
                    method: `POST`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                    },
                    body: JSON.stringify(body)

                }).then(res => res.json())
                    .then(result => {
                        if (result?.resultCode === 1) {
                            // alert("Create thành công")
                            props.onDelete()
                            props.onModal()
                            props.onDelteModal()
                            setName("")
                            setCode("")
                            setDescription("")
                            setSpecializeID(0)

                            props.parentCallback(result?.message);
                        } else {

                            // setError(result.message)
                            alert("create thất bại")
                        }
                        return res

                    })
                    .catch((error) => {
                        throw ('Invalid Token')
                    })
                return body
            } else {
                setNameError(true)
            }


        } else {
            setError(true);

        }

    }

    async function updateSubject() {
        if (name !== undefined && name != ""
            && code !== undefined && code != ""
            && description !== undefined && description != ""
            && specializeID !== undefined && specializeID != "") {
            setError(false);
            const requestURL = ENDPOINT + `api/subject/get_list?`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();
            const { data } = responseJSON;


            let nameTrung = data?.rows?.map(function (e) {
                if (name.toLowerCase().trim().split(' ').join('') != e.name.toLowerCase().trim().split(' ').join(''))
                    return e.name.toLowerCase().trim().split(' ').join('');
            }).indexOf(name.toLowerCase().trim().split(' ').join(''));

            let codeTrung = data?.rows?.map(function (e) {
                if (code.toLowerCase().trim().split(' ').join('') != e.code.toLowerCase().trim().split(' ').join(''))
                    return e.code.toLowerCase().trim().replace(/\s/g, '');
            }).indexOf(code.toLowerCase().trim().replace(/\s/g, ''));
            if (nameTrung == -1 && codeTrung == -1) {
                setNameError(false)
                const res = await fetch(ENDPOINT + `api/subject/update?subjectID=${props.isClickedParent.id}`, {
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
                            props.parentCallback(result?.message);
                        } else {
                            alert("update thất bại")
                            // setError(result.message)
                            // alert("tài khoản hoặc mật khẩu sai kìa")
                        }
                        return res

                    })
                    .catch((error) => {
                        throw ('Invalid Token')
                    })
                return body
            } else {
                setNameError(true)
            }


        } else {
            setError(true);

        }

    }


    useEffect(() => {
        setName(props?.isClickedParent?.name);
        setCode(props?.isClickedParent?.code);
        setDescription(props?.isClickedParent?.description);
        setSpecializeID(props?.isClickedParent?.specializeID)

    }, [props?.isClickedParent?.name, props?.isClickedParent?.code, props?.isClickedParent?.description, props?.isClickedParent?.setSpecializeID])





    return (

        <div className="clear-both mb-0 ">
            <div className="border-b-2 mb-5 border-gray-400">
                <Link to="/"><img src={Logo} alt="logo" className="float-left w-64 h-24 pr-2" /></Link>
                <div className="">
                    <h2 className=" text-3xl font-bold  text-black pt-2"> Subject Detail </h2>
                    <p className="text-gray-500 pb-2 pl-2 pr-24">You can edit or add subjects according to the university's majors</p>
                </div>
            </div>
            <div className=" mx-16 text-black  text-2xl">
                {Error && <div className="text-xl text-center  text-red-600 mb-5 font-bold">Cannot be left blank</div>}
                {nameError && <div className="text-xl text-center  text-red-600 mb-5 font-bold">Name or Code duplicate</div>}
                <table className="text-gray-500">
                    <tbody >
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> *Name:  </th>
                            <td><input className="font-normal pl-10 text-gray-900 outline-none " value={name} placeholder="Input subject name..."
                                onChange={e => setName(e.target.value)}
                            /></td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> *Code:  </th>
                            <td className=""><input className="font-normal pl-10 text-gray-900 outline-none " value={code} placeholder="Input subject code..."
                                onChange={e => setCode(e.target.value)}
                            /></td>
                        </tr>
                        <tr className="border-b-2 h-50 ">
                            <th className="text-left  "> *Specialize:  </th>
                            <td className="">

                                <select
                                    value={specializeID}
                                    onChange={e => setSpecializeID(e.target.value)} className={value == specializeID ? "font-normal pl-1 text-gray-400 outline-none " : "font-normal pl-1 text-gray-900 outline-none "} >
                                    <option className="text-gray-300 hidden text-xl" value={0} >Select Specialize...</option>
                                    {
                                        props?.spec?.map(ele => {
                                            return (
                                                <option
                                                    value={ele?.id}
                                                    key={ele?.id} > {ele?.name}  </option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr className=" h-50  ">
                            <th className="text-left pb-85  "> *Description:  </th>
                            <td className="pt-3"><textarea className="font-normal h-32 w-full resize-none pl-10  text-gray-900 outline-none " value={description} placeholder="Input subject description..."
                                onChange={e => setDescription(e.target.value)}

                            /></td>

                        </tr>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                {/* <p className=" font-bold pb-2">Mentor:
                <input className="font-normal border-2 py-1 pl-2 pr-5 rounded-md border-gray-800 outline-none focus:border-gray-300 " defaultValue=""/>
                </p> */}


            </div>
            <div className=" cursor-pointer w-full h-14 leading-56 text-4xl text-center  float-right bg-black hover:text-black hover:bg-blue-500 text-red-50"   >{props?.isClickedParent === undefined ? <p onClick={CreteSubject}>Create</p> : <p onClick={updateSubject}>Update</p>}</div>


        </div>



    )
}

