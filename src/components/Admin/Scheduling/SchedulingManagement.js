import React, { Component } from "react";
import Admin from "../AdminDashboard/AdminDashboard";
import {  NavLink } from 'react-router-dom'

export default class SchedulingManagement extends Component {
    render() {
        return (
            <Admin>
                
                <div className="mt-101">
                    <div className="bg-white h-20  mx-5 grid grid-cols-10 ">
                        
                        <NavLink activeStyle={{ backgroundColor: '#4FD1C5', height: '40px',   fontWeight: "bold" }} exact to="/admindashboard/scheduling" className=" text-lg col-span-1  h-40px leading-10 m-auto rounded-lg w-28  text-700  " >
                      
                        <h2 className="text-center   ">Student</h2>
                      
                        </NavLink>
                         
                        <NavLink activeStyle={{ backgroundColor: '#4FD1C5', height: '40px', fontWeight: "bold" }} to="/admindashboard/scheduling/mentor" className="text-xl col-span-1   h-40px leading-10 rounded-lg w-28 m-auto text-700 " >
                        <h2 className="  text-center">Mentor</h2>
                        </NavLink>
                        <NavLink activeStyle={{ backgroundColor: '#4FD1C5', height: '40px',   fontWeight: "bold" }} to="/admindashboard/scheduling/subject" className="text-xl col-span-1   h- text  leading-10 rounded-lg w-28 m-auto text-700 " >
                        <h2 className=" text-center ">Subject</h2>
                        </NavLink>
                        <div className="col-span-2"></div>
                        <div className="col-span-1">
                            <select className="  border-2 border-gray-900 h-50 mt-4 w-full rounded-l-lg border-r-0 relative z-0 outline-none " placeholder="Selepizza">

                                <option> 01/09 To 15/09 </option>
                            </select>
                            </div>
                            <div className="col-span-1">
                            <select className="  border-2 border-gray-900 h-50 mt-4  w-20 rounded-r-lg relative z-0 outline-none " placeholder="Selepizza">

                                <option>2021</option>
                            </select>

                        </div>
                        <div id="form-field" className="  mt-4    mb-0  mr-52  w-450">
                            <input type="text" id="form-input" placeholder=" " className=" mb-0 h-10   border-gray-200   " />
                            <label id="form-label" className="-ml-16 text-gray-200 mb-0  ">Search list...</label>
                        </div>
                    </div>
                    <div className="mx-5 bg-white clear-none  ">
                        
                        {this.props.children}



                    </div>

                </div>
            </Admin>
        )
    }
}