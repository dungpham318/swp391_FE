import React from "react"
import Header from '../../Header'
import Footer from "../../Footer";
import { Link, NavLink, useHistory } from 'react-router-dom';
import Profile from "./Profile";

function Scheduling (){
    const history = useHistory();
    if (!localStorage.getItem(`user-token`)) {
        history.push("/login")
    }


    return (
        <Profile >
            <div className="text-center col-span-2 h-450 mx-auto my-16  ">
                        <h2 className="text-5xl "> Scheduling</h2>
               
           
            </div>
        </Profile>
    )
} 
export default Scheduling