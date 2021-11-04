import React, { useEffect, useState } from "react";
import Header from '../../Header'
import Footer from "../../Footer";
import Pagination from "../../Pagination";
import { Link } from 'react-router-dom'
import { ENDPOINT } from "../../../config";

export default function MentorView(props) {

    console.log("props của mentor view", props);

    useEffect(() => {

        featchPostList();

    }, []);
    const [postList, setpostList] = useState([]);
    async function featchPostList() {
        try {

            const requestURL = ENDPOINT + `api/subject/get_list?mentorID=${props?.location?.state?.name?.id}`;

            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();

            const { data, pagination } = responseJSON;

            setpostList(data?.rows);

            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    const subjectForMentor = postList?.map((subject, index) => {
        return (
            <Link
                key={index}
                to={{
                    pathname: "/subject/view",
                    state: {
                        name: subject.id
                    }
                }} className="my-link mt-10 col-span-2 ">
                <button className="font-normal hover:text-xanh   cursor-pointer ">{subject.name} , </button>
            </Link>
        )
    })
    console.log(123123, props?.location?.state?.name);
    return (
        <div className="mt-20">
            <Header >
                <div className="">
                    <h2 className="text-center h-20 leading-80 my-auto le text-5xl bg-xanhla text-white font-serif uppercase    clear-both "> Mentor Profile</h2>
                    <img className="w-full h-550"
                        src="https://images.unsplash.com/photo-1634853982486-c06f0e17940f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80 " />
                    <div className="grid grid-cols-5 mt-20">
                        <div className="col-span-2 mx-auto">

                            <img src={props?.location?.state?.name?.avatar}
                                className="h-72 w-72  relative " />
                        </div>
                        <div className="col-span-3 text-xanhla">

                            <p className="font-bold text-2xl mb-7">Email:<a className="font-normal"> {props?.location?.state?.name?.email}</a> </p>
                            <p className="font-bold text-2xl mb-7">Name:<a className="font-normal"> {props?.location?.state?.name?.fullName}</a> </p>
                            <p className="font-bold text-2xl mb-7">Id:<a className="font-normal"> {props?.location?.state?.name?.code}</a> </p>
                            <p className="font-bold  text-2xl mb-7">Subject: {subjectForMentor}</p>

                        </div>
                        <Link
                            to={{
                                pathname: "/booking",
                                state: {
                                    name: props?.location?.state?.name?.name
                                }
                            }} className="my-link mt-10 col-span-2 ">
                            <button className=" bg-xanhla rounded-xl  text-white h-11 ml-72  px-6 ">Choose mentor</button>
                        </Link>

                    </div>
                    <div className="ml-48">
                        <hr className=" mb-5 border-b-2 border-xanhnhat  w-11/12 mt-10"></hr>
                        <div >
                            <h2 className=" text-center text-4xl   mt-10 mb-5 clear-both uppercase mx-auto font-bold text-xanhla ">FeedBack</h2>

                            <div >
                                <div className="border-xanhnhat border-b-2 w-5/6 mb-5">
                                    <div className="float-left  ">
                                        <img src="https://st.quantrimang.com/photos/image/072015/22/avatar.jpg"
                                            className="rounded-full h-20 w-20 flex items-center justify-center" />
                                    </div>
                                    <div className=" ml-24 font-normal mb-7">
                                        <h3 className="text-xanh text-2xl">Anh Khoa</h3>
                                        <p className="text-xl"> thầy rất tuyệt</p>
                                        <p className="text-base text-xam">29/9/2021</p>
                                    </div>
                                </div>
                                <div className="border-xanhnhat border-b-2 w-5/6 mb-5">
                                    <div className="float-left  ">
                                        <img src="https://st.quantrimang.com/photos/image/072015/22/avatar.jpg"
                                            className="rounded-full h-20 w-20 flex items-center justify-center" />
                                    </div>
                                    <div className=" ml-24 font-normal mb-7">
                                        <h3 className="text-xanh text-2xl">Anh Khoa</h3>
                                        <p className="text-xl"> thầy rất tuyệt</p>
                                        <p className="text-base text-xam">29/9/2021</p>
                                    </div>
                                </div>
                                <div className="border-xanhnhat border-b-2 w-5/6 mb-5">
                                    <div className="float-left  ">
                                        <img src="https://st.quantrimang.com/photos/image/072015/22/avatar.jpg"
                                            className="rounded-full h-20 w-20 flex items-center justify-center" />
                                    </div>
                                    <div className=" ml-24 font-normal mb-7">
                                        <h3 className="text-xanh text-2xl">Anh Khoa</h3>
                                        <p className="text-xl"> thầy rất tuyệt</p>
                                        <p className="text-base text-xam">29/9/2021</p>
                                    </div>
                                </div>
                                <div className="border-xanhnhat border-b-2 w-5/6 mb-5">
                                    <div className="float-left  ">
                                        <img src="https://st.quantrimang.com/photos/image/072015/22/avatar.jpg"
                                            className="rounded-full h-20 w-20 flex items-center justify-center" />
                                    </div>
                                    <div className=" ml-24 font-normal mb-7">
                                        <h3 className="text-xanh text-2xl">Anh Khoa</h3>
                                        <p className="text-xl"> thầy rất tuyệt</p>
                                        <p className="text-base text-xam">29/9/2021</p>
                                    </div>
                                </div>
                                <div className="border-xanhnhat border-b-2 w-5/6 mb-5">
                                    <div className="float-left  ">
                                        <img src="https://st.quantrimang.com/photos/image/072015/22/avatar.jpg"
                                            className="rounded-full h-20 w-20 flex items-center justify-center" />
                                    </div>
                                    <div className=" ml-24 font-normal mb-7">
                                        <h3 className="text-xanh text-2xl">Anh Khoa</h3>
                                        <p className="text-xl"> thầy rất tuyệt</p>
                                        <p className="text-base text-xam">29/9/2021</p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </Header>
            <Footer />
        </div>
    );
}
