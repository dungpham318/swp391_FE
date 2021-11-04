import React, { useState, useEffect } from "react";
import { ENDPOINT } from "../../../config";
import Modal from "../../Modal";
import Pagination from "../../Pagination";
import MentorDashboard from "../MentorDashboard/MentorDashboard";
import GetRequest from "./GetRequest";

export default function Request(props) {
    const [postSubjectList, setpostSubjectList] = useState([]);
    const [requestList, setRequestList] = useState([])
    const [mentorID, setMentorID] = useState("")
    useEffect(() => {
        featchRequestList();
        subjectList(props?.location?.state?.name?.id);
    }, []);
    async function subjectList(e) {
        try {
            const requestURL = ENDPOINT + `api/subject/get_list?mentorID=${e}`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();
            setpostSubjectList(responseJSON?.data?.rows);

        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    async function featchRequestList() {
        try {
            const requestURL = ENDPOINT + `api/appointment/get_mentor_appointment?statusID=2`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();

            const { data, pagination } = responseJSON;

            setRequestList(data);

            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    return (
        <MentorDashboard>
            <div className="   relative rounded-2xl mr-7   h-full">
                <div className="bg-white h-20 rounded-t-2xl grid grid-cols-9   ">
                    <h2 className="text-xl col-span-6 leading-80 pl-8 float-left text-700 h-20">My Task</h2>
                    <div id="form-field" className="  mt-4  col-span-2  mb-0  mr-52 w-72 ">
                        <input type="text" id="form-input" placeholder=" " className=" mb-0 h-10   border-gray-200   " />
                        <label id="form-label" className="-ml-16 text-gray-200 mb-0  ">Search list...</label>
                    </div>
                    <div >
                    </div>
                </div>
                <div className=" bg-white rounded-b-2xl clear-none  ">
                    <table className="table-auto w-full  text-left">
                        <thead className=" h-10  pointer-events-none bg-gray-200  ">
                            <tr className=" ">
                                <th className=" pl-8 w-32 "> No. </th>
                                <th className=" w-80     "> Name  </th>
                                <th className="w-80  "> Subject</th>
                                <th className="w-80   ">Time</th>
                                <th className="w-64  ">DD/MM/YY</th>
                                <th className="w-8  ">Actions</th>
                                <th className="  "></th>
                            </tr>
                        </thead>
                        <GetRequest requestList={requestList} subject={postSubjectList} onDelete={() => featchRequestList()} />
                    </table>
                    <div className="h-76  border-gray-200  ">



                    </div>

                </div>

            </div>
        </MentorDashboard>
    )

}