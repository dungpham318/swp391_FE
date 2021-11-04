import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import logo from './image/logo.png';
import { ENDPOINT } from "../config";
function Header(props) {

  let buttons;
  let mentorButtons;
  let adminDashboardButtons;

  function handleLogoutClick() {
    localStorage.removeItem('user-token');
  }
  const [postList, setpostList] = useState([]);
  useEffect(() => {
    if (localStorage.getItem(`user-token`)) {
      featchPostList()
    }
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

      const { data, pagination } = responseJSON;

      setpostList(data);

      return data
    } catch (error) {
      console.log('Fail to fetch product list: ', error)
    }
  }



  if (localStorage.getItem(`user-token`)) {
    buttons = (
      <div className="flex mt-3  ">
        <li>
          <NavLink
            activeStyle={{ backgroundColor: 'black' }}
            to={{
              pathname: "/profile/update",
              onReload: () => featchPostList(),
              state: {

                name: postList
              }
            }} className=" " >
            <div className="border-2  hover:bg-fpt border-white rounded-5xl  mt-1 p-1   h-12 pr-3">
              <p className="float-right text-sm mt-2  ml-4 ">{postList.fullName}</p>
              <img src={postList.avatar}
                className="rounded-full ml-3000 w-8 h-8  mt-3000 mx-8 " />
            </div>
            <ul id="subnav" className=" border-2 float-left bg-white  text-center  p-1   pr-3" >
              <li className="w-full h-56 hover:bg-fpt " ><NavLink to={{
                pathname: "/profile/update",
                onReload: () => featchPostList(),
                state: {
                  name: postList
                }
              }} className=" " ><p className="leading-56">Profile</p></NavLink></li>

              <li className="w-full  h-56 hover:bg-fpt"><Link to="/scheduling" className="my-link  "><p className="leading-56">Scheduling</p></Link></li>
              <li className="w-full h-56 hover:bg-fpt "><Link to="/" className=" " onClick={handleLogoutClick}><p className="leading-56">Logout</p></Link></li>
            </ul>
          </NavLink>

        </li>
      </div>
    )


    if (postList.roleID == '3') {
      adminDashboardButtons = (
        <NavLink activeStyle={{ backgroundColor: 'white' }} to="/admindashboard/user" className="my-link leading-80 "><li><p>Admin Dashboard</p></li></NavLink>)
    }
    else if (postList.roleID == '2') {
      adminDashboardButtons = (<NavLink activeStyle={{ backgroundColor: 'white' }} to="/MentorDashboard " className="my-link leading-80"><li><p>Mentor Dashboard</p></li></NavLink>)
    }

  } else {
    buttons = (
      <Link to="/login" className=" my-auto leading-80"><li ><p>Login</p></li></Link>

    )
  }


  return (

    <div >

      <div id="nav" className="" >

        <Link to="/"><img className="h-20 w-72  absolute" src={logo} alt="logo" /></Link>

        <ul id="header-app-store" className=" mx-auto my-auto justify-center" >

          {adminDashboardButtons}
          <NavLink activeStyle={{ backgroundColor: '#F2E9E4', color: '#000000', height: "80px" }} to="/aboutus" className="my-link leading-80"><li><p>About Us</p></li></NavLink>
          <NavLink activeStyle={{ backgroundColor: '#F2E9E4', color: '#000000', height: "80px" }} to="/subject" className="my-link leading-80"><li><p>Subject</p></li></NavLink>
          <NavLink activeStyle={{ backgroundColor: '#F2E9E4', color: '#000000', height: "80px" }} to="/mentor" className="my-link leading-80"><li><p>Mentor</p></li></NavLink>

          <NavLink activeStyle={{ backgroundColor: '#F2E9E4', color: '#000000', height: "80px" }} to="/booking" className="my-link leading-80"><li><p>Booking</p></li></NavLink>

          {buttons}


        </ul>
      </div>
      <div>
        {props.children}
      </div>
    </div>
  );


}
export default Header;