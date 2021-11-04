import React, { Component, useState, useEffect } from "react";
import Header from '../../Header'
import Footer from "../../Footer";
import { Link } from 'react-router-dom'
import { useLocation, useHistory } from 'react-router-dom'
import { ENDPOINT } from "../../../config";

export default function SubjectView(props) {
    console.log(123, props?.location?.state?.name);
    const [postSpecList, setPostSpecList] = useState([]);

    const [subjectDetail, setSubjectDetail] = useState([]);
    const history = useHistory();
    useEffect(() => {
        if (props?.location?.state?.name) {

            featchSpecList()
            featchSubjectDetail(props?.location?.state?.name)

        } else (
            history.push("/subject")
        )


    }, []);


    async function featchSubjectDetail(e) {
        try {
            const requestURL = ENDPOINT + `api/subject/get_list?subjectID=${e}`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();

            const { data, pagination } = responseJSON;
            console.log(2, data?.rows);
            setSubjectDetail(data?.rows);

            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    async function featchSpecList() {
        try {
            const requestURL = ENDPOINT + `api/specialize/get_list?`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();

            const { data, pagination } = responseJSON;

            setPostSpecList(data);

            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }
    console.log(3, subjectDetail);




    return (
        <div className="mt-20 ">
            <Header >
                <div className="">
                    <h2 className="text-center h-20 leading-80 my-auto le text-5xl bg-xanhla text-white  font-serif uppercase  clear-both  "> Subject Detail</h2>


                    {subjectDetail?.map((mentor, index) => {

                        return (
                            <div className=" w-2/4 mx-auto text-center" key={index}>
                                <table>
                                    <tbody >
                                        <tr className="m-20 text-xl ">
                                            <td className="float-right  py-5">Course:</td>
                                            <td className="text-left pl-10 py-5 text-xanhnhat ">{mentor.name} ({mentor.code})</td>
                                        </tr>
                                        <tr className="m-20 text-xl">
                                            <td className="float-right py-5">Specialization:</td>
                                            <td className="text-left pl-10 py-5 text-xanhnhat">{postSpecList.map(postSpec => {

                                                if (mentor.specializeID == postSpec?.id) {

                                                    return (
                                                        <p
                                                            value={postSpec?.id}
                                                            key={postSpec?.id}> {postSpec?.name}  </p>)

                                                }

                                            })}</td>
                                        </tr>
                                        <tr className="m-20 text-xl">
                                            <td className="float-right py-5">Teacher:</td>
                                            <td className="text-left pl-10 py- text-xanhnhat">
                                                {mentor.mentorList?.map((name, index) => {
                                                    return <a className="hover:text-xanh cursor-pointer " key={index}>  {name.fullName} , </a>
                                                })}
                                            </td>
                                        </tr>
                                        <tr className="m-20 text-xl">
                                            <td className="float-right py-5">Description:</td>
                                            <td className="text-left pl-10 py-5 text-xanhnhat">{mentor.description}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Link

                                    exact to={{
                                        pathname: "/booking",
                                        state: {
                                            subject: mentor
                                        }
                                    }} className="bg-xanhla mt-5 rounded-xl px-10 text-white  py-3"> Choose Subject </Link>
                            </div>
                        )
                    })}
                </div>
            </Header>
            <Footer />
        </div>
    );
}
