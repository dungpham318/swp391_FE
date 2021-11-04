import React, { Component } from "react";
import SchedulingManagement from "../SchedulingManagement";
import { NavLink } from 'react-router-dom'
import Pagination from "../../../Pagination";
import GetSubjectScheduling from "./GetSubjectscheduling";


export default class subjectScheduling extends Component {
    render() {
        var appointments = [
            {
                key: 1,
                id: '001',
                nameStudent: 'Đỗ Trần Anh Khoa',
                idStudent: 'SE140163',
                specializedStudent: "Software engineer",
                nameSubject: 'SoftWare Testing',
                idSubject: 'SWT301',
                date: '20/09/2021',
                time: '7:00 - 8:30 PM',
                nameMentor: "Nguyễn Thế Hoàng",
                idMentor: 'HoangNT',
                question: 'chúng em có vấn đề về function',
                feedback: 'thầy rất tuyệt',
                status: 'Done',
                Linkmeet: "ppr-zgmu-suo",
            },
            {
                key: 2,
                id: '002',
                nameStudent: 'Đặng Hoàng Việt',
                idStudent: 'SE140100',
                specializedStudent: "Software engineer",
                nameSubject: 'SoftWare Engineering',
                idSubject: 'SWE201',
                date: '22/09/2021',
                time: '8:30 - 10:00 PM',
                nameMentor: "Trần Duy Đan",
                idMentor: 'DanDT',
                question: 'chúng em có vấn đề về nonFunction',
                feedback: 'thầy rất rất tuyệt',
                status: 'Done',
                Linkmeet: "ppr-zgmu-suo",

            },

        ];
        let elements = appointments.map((appointment, index) => {

            return <GetSubjectScheduling
                key={appointment.key}
                no={appointment.key}
                id={appointment.id}
                nameStudent={appointment.nameStudent}
                idStudent={appointment.idStudent}
                specializedStudent={appointment.specializedStudent}
                nameSubject={appointment.nameSubject}
                date={appointment.date}
                time={appointment.time}
                nameMentor={appointment.nameMentor}
                idMentor={appointment.idMentor}
                question={appointment.question}
                feedback={appointment.feedback}
                status={appointment.status}
                Linkmeet={appointment.Linkmeet}
                idSubject={appointment.idSubject}

            ></GetSubjectScheduling>
        });
        return (
            <SchedulingManagement>
                <table className="table-auto w-full   text-left">
                    <thead className=" h-10   bg-gray-200  ">
                        <tr className=" ">
                            <th className=" pl-8 w-32 "> No. </th>

                            <th className="w-64  "> Name</th>

                            <th className="w-72   ">Id</th>
                            <th className="w-72  ">Student</th>
                            <th className="w-64">Mentor</th>
                            <th className="w-32   ">Status</th>
                            <th className="w-8  ">Actions</th>
                            <th className="  "></th>
                        </tr>
                    </thead>
                    {elements}

                </table>
                <div className="h-16  border-gray-200  ">
                    {/* 
                    <Pagination /> */}

                </div>
            </SchedulingManagement>
        )
    }
}