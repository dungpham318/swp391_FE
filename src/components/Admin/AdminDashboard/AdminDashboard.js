import React, { Component, useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom'
import Logo from '../../image/logo.png'
import "../../css/animation.css"
import { ENDPOINT } from "../../../config";

export default function Admin(props) {

    function handleLogoutClick() {
        localStorage.removeItem('user-token');
    }
    const [postList, setpostList] = useState([]);

    useEffect(() => {
        featchPostList()

    }, []);

    async function featchPostList() {
        try {
            const requestURL = ENDPOINT + `api/user/get_user_profile`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();
            console.log({ responseJSON });
            const { data, pagination } = responseJSON;

            setpostList(data);


            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }


    return (
        <div className=" grid grid-cols-6 ">

            <div className=" h-screen bg-fpt col-span-1  grid grid-rows-6 ">

                <Link to="/"><img src={Logo} alt="logo" className="row-span-3 p-7" /></Link>

                <div className="row-span-5  ">

                    <NavLink activeStyle={{ backgroundColor: 'white', fontWeight: "bold", paddingTop: "21px", paddingBottom: "21px" }} to="/admindashboard/user" className="my-link " >
                        <div className=" h-60 leading-60  w-full " id="cool-link">
                            <p className="ml-60">User</p>
                        </div>
                    </NavLink>


                    <NavLink activeStyle={{ backgroundColor: 'white', fontWeight: "bold", paddingTop: "21px", paddingBottom: "21px" }} to="/admindashboard/subject" className="my-link"  >
                        <div className=" mt-6 h-60 leading-60 w-full" id="cool-link">
                            <p className="ml-60 ">Subject</p>
                        </div>
                    </NavLink>


                    <NavLink activeStyle={{ backgroundColor: 'white', fontWeight: "bold", paddingTop: "21px", paddingBottom: "21px" }} to="/admindashboard/scheduling" className="my-link" >
                        <div className="mt-6 h-60 leading-60 w-full " id="cool-link">
                            <p className="ml-60 ">Scheduling</p>
                        </div>
                    </NavLink>

                </div>
                <div className="bg-gray-700 h-60 leading-60 cursor-pointer  text-white ">
                    <Link to="/" className=" " onClick={handleLogoutClick}> <p className="ml-60  " >Logout</p></Link>
                </div>
            </div>



            <div className="col-span-5 bg-gray-100 ">
                <div>

                    <img src={postList?.avatar}
                        className="rounded-full w-12 h-12 mr-8 my-5 float-right" />
                    <p className="float-right clear-left mr-2 my-9"> {postList?.fullName} </p>
                </div>
                <div>
                    {props.children}

                </div>
            </div>

        </div>
    )
}