import React, { Component, useState, useEffect, useContext, Fragment } from "react";
import { Link, NavLink, useHistory } from 'react-router-dom'
import CustomSelect from "../../CustomSelect";
import Modal from "../../Modal";
import Logo from '../../image/logo.png'
import Select from "react-select";
import { ENDPOINT } from "../../../config";
export default function ModalForMentor(props) {

    const [mentorID, setMentorID] = useState([])
    const [selectedMentor, setselectedMentor] = useState([])
    const [mentorList, setMentorList] = useState([])
    let body;
    let bodyDelete;

    useEffect(() => {
        let tmp = props?.mentor?.map(cc => {
            return { label: cc.fullName, value: cc.id }
        })
        setMentorList(tmp)
    }, [props?.mentor])



    useEffect(() => {
        if (props?.isClickedParent?.mentorList && props?.isClickedParent?.mentorList.length > 0) {
            let tmp = []
            for (const item of props?.isClickedParent?.mentorList) {
                tmp.push({
                    label: item?.fullName,
                    value: item?.id
                })
            }
            setselectedMentor(tmp)
        } else {
            setselectedMentor([])
        }
    }, [mentorList]);


    async function updateMentorForSubject() {
        let prevMentorList = props?.isClickedParent?.mentorList
        let deletedMentor = []
        let updatedMentor = []
        console.log(prevMentorList)
        console.log(selectedMentor)

        for (const item of prevMentorList) {
            let checkIndex = selectedMentor.findIndex(ele => ele?.value === item?.id)
            if (checkIndex === -1) {
                deletedMentor.push(item)
            }
        }

        for (const item of selectedMentor) {
            let checkIndex = prevMentorList.findIndex(ele => ele?.id === item?.value)
            if (checkIndex === -1) {
                updatedMentor.push(item)
            }
        }
        const idDeleteMentor = deletedMentor?.map(id => (id.id))
        const idUpdatedMentor = updatedMentor?.map(id => (id.value))
        console.log(idDeleteMentor)
        console.log(idUpdatedMentor)

        body = {
            mentorID: idUpdatedMentor,
            subjectID: props?.isClickedParent?.id
        }
        let res = await fetch(ENDPOINT + "api/subject/add_mentor_to_subject", {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
            },
            body: JSON.stringify(body)

        }).then(res => res.json())
            .then(result => {
                console.log(result)
                if (result?.resultCode === 1) {

                    props?.onUpdate();
                    props?.onModal()
                    props.parentCallback(result?.message);
                }
            }

            )
            .catch((error) => {
                throw ('Invalid Token')
            })


        if (idDeleteMentor != "") {
            bodyDelete = {
                mentorID: idDeleteMentor,
                subjectID: props?.isClickedParent?.id
            }
            let res1 = await fetch(ENDPOINT + `api/subject/delete_mentor_subject`, {
                method: `DELETE`,

                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
                body: JSON.stringify(bodyDelete)
            }).then(res1 => res1.json())
                .then(result => {

                    if (result?.resultCode === 1) {
                        props?.onUpdate();
                        props?.onModal()
                    } else {

                    }
                    return res1

                })
                .catch((error) => {
                    throw ('Invalid Token')
                })
            body = {
                mentorID: idUpdatedMentor,
                subjectID: props?.isClickedParent?.id
            }
            let res = await fetch(ENDPOINT + "api/subject/add_mentor_to_subject", {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
                body: JSON.stringify(body)

            }).then(res => res.json())
                .then(result => {
                    console.log(result)
                    if (result?.resultCode === 1) {

                        props?.onUpdate();
                        props?.onModal()
                        props.parentCallback(result?.message);
                    }
                }

                )
                .catch((error) => {
                    throw ('Invalid Token')
                })

        }




    }


    function onChangeInput(value) {
        console.log("value", value);
        const list = props?.isClickedParent?.mentorList?.map(list => {
            return list.id
        })
        const nameMentor = value?.filter((mentor, index) => {
            if (mentor.value != list[index]) {
                return mentor.value
            }
        })
        const nameList = props?.isClickedParent?.mentorList?.map(list => (list.id))

        const updateMentor = nameMentor?.map(update => (update.value))
        setMentorID(updateMentor)
        setselectedMentor(value)

    }




    return (

        <div className="clear-both mb-5 h-96 w-1190">
            <div className="border-b-2 mb-5 border-gray-400">
                <Link to="/"><img src={Logo} alt="logo" className="float-left w-64 h-24 pr-2" /></Link>
                <div className="">
                    <h2 className=" text-3xl font-bold  text-black pt-2"> Mentor For Subject </h2>
                    <p className="text-gray-500 pb-10 pl-2 pr-24">You can edit or add subjects according to the university's majors</p>
                </div>
            </div>
            <div className="  mx-14 text-black mb-5  text-3xl">
                <div>Subject Name:<a className=" ml-6
                    font-normal text-xanhnhat    ">{props?.isClickedParent?.name}</a></div>
            </div>

            <div className="  mx-14 text-black  text-3xl">

                <div>Mentor:</div>
                <Select
                    //onChange ={e => setMentorID(options.value) }
                    options={mentorList}
                    value={selectedMentor}
                    isMulti={true}
                    onChange={onChangeInput} />
                <button className="w-40 h-12 bg-gray-800 text-white float-right mt-10 mb-10 space-x-1 rounded-xl"   > <p onClick={updateMentorForSubject}>Update</p></button>

            </div>

        </div>



    )
}

