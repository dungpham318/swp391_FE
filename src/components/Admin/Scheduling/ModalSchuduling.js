import React, { Component, useContext } from "react";
import { Link, NavLink } from 'react-router-dom'
import Modal from "../../Modal";

export default class ModalSchuduling extends Component {
    constructor(props) {
        super(props);

        this.state = {

            isClickedChild: this.props.isClickedParent,

        };


    }
    render() {

        console.log(this.props.isClickedParent)

        return (

            <div className="clear-both mb-5">
                <h2 className="text-center text-4xl font-bold text-black mb-4"> Scheduling detail</h2>
                <div className=" m- h-5/6 w-5/6 mx-14 text-black  text-3xl">
                    <p className=" font-bold pb-2">Id: <a className="font-normal">{this.props.isClickedParent?.id}</a> </p>
                    <p className=" font-bold pb-2">Name: <a className="font-normal " >{this.props.isClickedParent?.nameStudent}</a>  </p>
                    <p className=" font-bold pb-2">Specialized: <a className="font-normal " >{this.props.isClickedParent?.specializedStudent}</a>  </p>
                    <p className=" font-bold pb-2">Subject: <a className="font-normal " >{this.props.isClickedParent?.nameSubject}</a>  </p>
                    <p className=" font-bold pb-2">Date: <a className="font-normal " >{this.props.isClickedParent?.date}</a>  </p>
                    <p className=" font-bold pb-2">Time: <a className="font-normal " >{this.props.isClickedParent?.time}</a>  </p>
                    <p className=" font-bold pb-2">Mentor: <a className="font-normal " >{this.props.isClickedParent?.nameMentor}</a>  </p>
                    <p className=" font-bold pb-2">Question: <a className="font-normal " >{this.props.isClickedParent?.question}</a>  </p>
                    <p className=" font-bold pb-2">Feedback: <a className="font-normal " >{this.props.isClickedParent?.feedback}</a>  </p>
                    <p className=" font-bold pb-2">Link meet: <a className="font-normal " >{this.props.isClickedParent?.Linkmeet}</a>  </p>

                </div>
            </div>



        )
    }
}
