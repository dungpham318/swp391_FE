import React, { useState, useEffect } from "react";
import { Route, NavLink, useHistory, Redirect } from 'react-router-dom';
import Footer from "../../Footer";
import Header from '../../Header';
import Logo from '../../image/logo.png';
import { ENDPOINT } from "../../../config";

function Profile(props) {
    // const history = useHistory();

    {/* <Route exact path="/profile">
  {localStorage.getItem(`user-token`) ? <Redirect to="/profile/update" /> : history.push("/login") }
</Route> */}

    const [postList, setpostList] = useState([]);

    useEffect(() => {
        featchUserProfile()

    }, []);

    async function featchUserProfile() {
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

            const { data, pagination } = responseJSON;

            setpostList(data);


            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }

    let dataRole;
    if (postList.roleID == '2') {
        dataRole = (
            <li className="mb-2"><NavLink activeStyle={{ color: '#3481C8' }} exact to={{
                pathname: "/profile/subject",
                state: {
                    name: postList
                }
            }}
                className="my-link "> My Subject</NavLink></li>)
    }
    let passRole;
    if (postList.isUpdatePassword == true) {
        passRole = (<div>Change Password </div>)
    } else {
        passRole = (<div>Update Password</div>)
    }



    return (

        <div className="mt-14 " >
            <Header>
                <h2 className="ml-36 text-5xl mt-24 font-bold  mb-6   ">    Profile</h2>

                <div className="grid grid-cols-5 ">

                    <div className="  bg-layoutforadmin col-span-1 mr-7 ml-7  rounded-t-2xl      gap-4 " >

                        <div className=" row-span-1 -ml-8 h-0 w-full p-7 ">
                            <div className="      ">
                                {/* <p className="text-lg  mt-2  ml-4 ">hello:{postList?.fullName}</p> */}
                            </div>
                        </div>
                        <ul className="mt-10 ml-10 ">
                            <li>

                                <li className="mb-2"><NavLink exact to={{
                                    pathname: "/profile/update",
                                    onDelete: () => featchUserProfile(),
                                    state: {
                                        name: postList,

                                    }
                                }} className=" font-bold mb-3 text-3xl cursor-pointer   " > Profile</NavLink></li>

                                <ul className="ml-8 text-xl block " >
                                    <li className="mb-2"><NavLink activeStyle={{ color: '#3481C8' }} exact to={{
                                        pathname: "/profile/update",
                                        onDelete: () => featchUserProfile(),
                                        state: {
                                            name: postList,

                                        }
                                    }} className="my-link "> Profile Edit</NavLink></li>
                                    <li className="mb-2"><NavLink activeStyle={{ color: '#3481C8' }} exact to={{
                                        pathname: "/profile/password",
                                        state: {
                                            name: postList
                                        }
                                    }}
                                        className="my-link ">{postList?.isUpdatePassword == false ? "Update Password" : "Changes Password"}</NavLink></li>
                                    {dataRole}
                                </ul>
                            </li>


                            <li className="mb-5"><NavLink activeStyle={{ color: '#3481C8' }} to="/scheduling" className="my-link font-bold text-2xl"> My Scheduling</NavLink></li>
                        </ul>

                    </div>

                    <div className="col-span-4  bg-layoutforadmin  grid grid-cols-4 w-11/12 pt-12 pb-12">
                        {props.children}
                    </div>
                </div>
                <Footer />
            </Header>
        </div>
    );

}

export default Profile;