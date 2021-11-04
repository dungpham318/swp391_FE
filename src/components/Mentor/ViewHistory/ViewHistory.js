import React, { Component } from "react";
import Modal from "../../Modal";
import Pagination from "../../Pagination";
import MentorDashboard from "../MentorDashboard/MentorDashboard";
import GetViewHistory from "./GetViewHistory";









export default class ViewHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isClicked: true,
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }
    showModal = () => {
        this.setState({
            show: true,
            isClicked: true,
        });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    handleClick = () => {
        this.setState({
            isClicked: true,
        })
    }

    render() {
        var appointments = [
            {
                key: 1,
                id: '001',
                nameStudent: 'Đỗ Trần Anh Khoa',
                idStudent: 'SE140163',
                specializedStudent: "Software engineer" ,
                nameSubject: 'SoftWare Testing',
                idSubject: 'SWT301',
                date: '20/09/2021',
                time:'7:00 - 8:30 PM',
                nameMentor: "Nguyễn Thế Hoàng" ,
                idMentor: 'HoangNT',
                question: 'chúng em có vấn đề về function',
                feedback: 'thầy rất tuyệt',
                status:'Done',
                Linkmeet:"ppr-zgmu-suo" ,
            },
            {
                key: 2,
                id: '002',
                nameStudent: 'Đặng Hoàng Việt',
                idStudent: 'SE140100',
                specializedStudent: "Software engineer" ,
                nameSubject: 'SoftWare Engineering',
                idSubject: 'SWE201',
                date: '22/09/2021',
                time:'8:30 - 10:00 PM',
                nameMentor: "Trần Duy Đan" ,
                idMentor: 'DanDT',
                question: 'chúng em có vấn đề về nonFunction',
                feedback: 'thầy rất rất tuyệt',
                status:'Done',
                Linkmeet:"ppr-zgmu-suo" ,
        
            },
            {
                key: 2,
                id: '002',
                nameStudent: 'Đặng Hoàng Việt',
                idStudent: 'SE140100',
                specializedStudent: "Software engineer" ,
                nameSubject: 'SoftWare Engineering',
                idSubject: 'SWE201',
                date: '22/09/2021',
                time:'8:30 - 10:00 PM',
                nameMentor: "Trần Duy Đan" ,
                idMentor: 'DanDT',
                question: 'chúng em có vấn đề về nonFunction',
                feedback: 'thầy rất rất tuyệt',
                status:'Done',
                Linkmeet:"ppr-zgmu-suo" ,
        
            },
            {
                key: 2,
                id: '002',
                nameStudent: 'Đặng Hoàng Việt',
                idStudent: 'SE140100',
                specializedStudent: "Software engineer" ,
                nameSubject: 'SoftWare Engineering',
                idSubject: 'SWE201',
                date: '22/09/2021',
                time:'8:30 - 10:00 PM',
                nameMentor: "Trần Duy Đan" ,
                idMentor: 'DanDT',
                question: 'chúng em có vấn đề về nonFunction',
                feedback: 'thầy rất rất tuyệt',
                status:'Done',
                Linkmeet:"ppr-zgmu-suo" ,
        
            },
            {
                key: 2,
                id: '002',
                nameStudent: 'Đặng Hoàng Việt',
                idStudent: 'SE140100',
                specializedStudent: "Software engineer" ,
                nameSubject: 'SoftWare Engineering',
                idSubject: 'SWE201',
                date: '22/09/2021',
                time:'8:30 - 10:00 PM',
                nameMentor: "Trần Duy Đan" ,
                idMentor: 'DanDT',
                question: 'chúng em có vấn đề về nonFunction',
                feedback: 'thầy rất rất tuyệt',
                status:'Done',
                Linkmeet:"ppr-zgmu-suo" ,
        
            },
            {
                key: 2,
                id: '002',
                nameStudent: 'Đặng Hoàng Việt',
                idStudent: 'SE140100',
                specializedStudent: "Software engineer" ,
                nameSubject: 'SoftWare Engineering',
                idSubject: 'SWE201',
                date: '22/09/2021',
                time:'8:30 - 10:00 PM',
                nameMentor: "Trần Duy Đan" ,
                idMentor: 'DanDT',
                question: 'chúng em có vấn đề về nonFunction',
                feedback: 'thầy rất rất tuyệt',
                status:'Done',
                Linkmeet:"ppr-zgmu-suo" ,
        
            },
            {
                key: 2,
                id: '002',
                nameStudent: 'Đặng Hoàng Việt',
                idStudent: 'SE140100',
                specializedStudent: "Software engineer" ,
                nameSubject: 'SoftWare Engineering',
                idSubject: 'SWE201',
                date: '22/09/2021',
                time:'8:30 - 10:00 PM',
                nameMentor: "Trần Duy Đan" ,
                idMentor: 'DanDT',
                question: 'chúng em có vấn đề về nonFunction',
                feedback: 'thầy rất rất tuyệt',
                status:'Done',
                Linkmeet:"ppr-zgmu-suo" ,
        
            },
            {
                key: 2,
                id: '002',
                nameStudent: 'Đặng Hoàng Việt',
                idStudent: 'SE140100',
                specializedStudent: "Software engineer" ,
                nameSubject: 'SoftWare Engineering',
                idSubject: 'SWE201',
                date: '22/09/2021',
                time:'8:30 - 10:00 PM',
                nameMentor: "Trần Duy Đan" ,
                idMentor: 'DanDT',
                question: 'chúng em có vấn đề về nonFunction',
                feedback: 'thầy rất rất tuyệt',
                status:'Done',
                Linkmeet:"ppr-zgmu-suo" ,
        
            },
            {
                key: 2,
                id: '002',
                nameStudent: 'Đặng Hoàng Việt',
                idStudent: 'SE140100',
                specializedStudent: "Software engineer" ,
                nameSubject: 'SoftWare Engineering',
                idSubject: 'SWE201',
                date: '22/09/2021',
                time:'8:30 - 10:00 PM',
                nameMentor: "Trần Duy Đan" ,
                idMentor: 'DanDT',
                question: 'chúng em có vấn đề về nonFunction',
                feedback: 'thầy rất rất tuyệt',
                status:'Done',
                Linkmeet:"ppr-zgmu-suo" ,
        
            },
            
           
        ];
        let elements = appointments.map((appointment, index) => {

            return <GetViewHistory
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
               
               
            ></GetViewHistory>

        });
        return (
            <MentorDashboard>
               {/* <p className="border-l-8 rounded-md border-cam h-60 w-2 float-left mt-140"></p> */}
                <div className="   relative rounded-2xl mr-7   h-full">
                    <div className="bg-white h-20 rounded-t-2xl grid grid-cols-9   ">
                        <h2 className="text-xl col-span-6 leading-80 pl-8 float-left text-700 h-20">My History</h2>
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
                                    <th className=" w-80 "> Name  </th>
                                    <th className="w-80  "> Subject</th>
                                    <th className="w-80   ">Status</th> 
                                    <th className="w-64  ">DD/MM/YY</th>
                                    <th className="w-8  ">Actions</th>
                                    <th className="  "></th>
                                </tr>
                            </thead>
                            {elements}

                        </table>
                        <div className="h-76  border-gray-200  ">

                            {/* <Pagination /> */}

                        </div>

                    </div>

                </div>
            </MentorDashboard>
        )
    }
}