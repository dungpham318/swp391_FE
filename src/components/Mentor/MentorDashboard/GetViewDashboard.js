import React, { Component } from "react";
import MentorDashboard from "./MentorDashboard";









export default class GetViewDashboard extends Component {
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
        var Subjects = [
            {
                key: 1,
                no: 1,
                name: 'Ethics in IT',
                id: 'EOT103',
                specialized: 'SoftWare Engineering',
                mentor: 'Hoangnt, HuongNCT',
                description: 'Day ve moi ke nang ket noi mang aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa       aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',

            },
            {
                key: 2,
                no: 2,
                name: 'Software Testing',
                id: 'SWT301',
                specialized: 'SoftWare Engineering',
                mentor: ' HuongNCT',
                description: 'Kiem tra chat luong san pham'

            },

        ];
        let elements = Subjects.map((subject, index) => {

            return
            // key={subject.key}
            // no={subject.no}
            // name={subject.name}
            // id={subject.id}
            // specialized={subject.specialized}
            // mentor={subject.mentor}
            // description={subject.description}


        });
        return (
            <MentorDashboard>
                {/* <p className="border-l-8 rounded-md border-cam h-60 w-2 float-left mt-140"></p> */}
                <div className="   grid grid-cols-3 gap-7  relative rounded-2xl mr-7  h-full   ">

                    <div className="col-span-1  rounded-2xl bg-white ">
                        <div className="w-full bg-bluementor mt-10 h-14 leading-56 pl-4 font-semibold text-2xl">
                            View History
                        </div>
                        <div className=" m-10  text-xl text-center  ">
                            <p className="h-14 mb-10 leading-56">Trần duy Đan ---  7:00 - 8h30 PM</p>
                            <p className="h-14 mb-10 leading-56">Đặng Hoàng Việt ---  8:30 - 10h00 PM</p>
                            <p className="h-14 mb-10 leading-56">Ngô Hà Trí Bảo ---  12:30 - 2h00 AM</p>
                        </div>

                    </div>
                    <div className="col-span-1  rounded-2xl bg-white ">
                        <div className="w-full bg-bluementor mt-10 h-14 leading-56 pl-4 font-semibold text-2xl">
                            Scheduling
                        </div>
                        <div className=" m-10  text-xl text-center  ">
                            <p className="mb-10">Time: 7:00 - 8:30 PM Day: 20/09/2021 <br />
                                Subject: Data Structures and Algorithms </p>
                            <p className="mb-10">Time: 12:30 - 2:00 AM Day 20/09/2021 <br />
                                Subject: Software Testing</p>
                            <p className="mb-10">Time: 8:00 - 9:00 PM Day 20/09/2021 <br />
                                Subject: Software Testing</p>
                        </div>

                    </div>

                    <div className="col-span-1  rounded-2xl bg-white ">
                        <div className="w-full bg-bluementor mt-10 h-14 leading-56 pl-4 font-semibold text-2xl">
                            Request
                        </div>
                        <div className=" m-10  text-xl text-center  ">
                            <div className="h-14 mb-10 leading-56">
                                <img src='https://st.quantrimang.com/photos/image/072015/22/avatar.jpg'
                                    className="rounded-full w-12 h-12 mr-8 mt-1  float-left" />
                               <div className="  relative   mr-3 float-right">
                                    <div className="rounded-full absolute z-10  border-gray-700-  border-2  w-12 h-12 mt-1 ml-3000  "> </div>
                                    <img src='https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/243497341_574081197163528_7833045324151776348_n.png?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_ohc=P_ckEQOp1IcAX_zHyhG&_nc_ht=scontent.fsgn5-9.fna&oh=f442e4874d6cb348acedd9d4417c7e29&oe=618719A8'
                                        className=" ml-2  h-12  mt-1 relative z-0 slashed-zero   "
                                    ></img>
                                </div>
                               <p className="text-left  "> Đỗ Trần Anh Khoa </p>
                                
                            </div>
                            <div className="h-14 mb-10 leading-56">
                                <img src='https://st.quantrimang.com/photos/image/072015/22/avatar.jpg'
                                    className="rounded-full w-12 h-12 mr-8 mt-1  float-left" />
                               <div className="  relative   mr-3 float-right">
                                    <div className="rounded-full absolute z-10  border-gray-700-  border-2  w-12 h-12 mt-1 ml-3000  "> </div>
                                    <img src='https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/243497341_574081197163528_7833045324151776348_n.png?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_ohc=P_ckEQOp1IcAX_zHyhG&_nc_ht=scontent.fsgn5-9.fna&oh=f442e4874d6cb348acedd9d4417c7e29&oe=618719A8'
                                        className=" ml-2  h-12  mt-1 relative z-0 slashed-zero   "
                                    ></img>
                                </div>
                               <p className="text-left  "> Ngô Hà Trí Bảo </p>
                                
                            </div>
                            <div className="h-14 mb-10 leading-56">
                                <img src='https://st.quantrimang.com/photos/image/072015/22/avatar.jpg'
                                    className="rounded-full w-12 h-12 mr-8 mt-1  float-left" />
                               <div className="  relative   mr-3 float-right">
                                    <div className="rounded-full absolute z-10  border-gray-700-  border-2  w-12 h-12 mt-1 ml-3000  "> </div>
                                    <img src='https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.15752-9/243497341_574081197163528_7833045324151776348_n.png?_nc_cat=105&ccb=1-5&_nc_sid=ae9488&_nc_ohc=P_ckEQOp1IcAX_zHyhG&_nc_ht=scontent.fsgn5-9.fna&oh=f442e4874d6cb348acedd9d4417c7e29&oe=618719A8'
                                        className=" ml-2  h-12  mt-1 relative z-0 slashed-zero   "
                                    ></img>
                                </div>
                               <p className="text-left  "> Phạm Tiến Dũng </p>
                                
                            </div>
                        </div>

                    </div>

                </div>
            </MentorDashboard>
        )
    }
}