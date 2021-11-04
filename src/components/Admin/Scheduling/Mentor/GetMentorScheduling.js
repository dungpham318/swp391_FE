
import React, { Component, useContext } from "react";
import { Link, NavLink } from 'react-router-dom'
import Modal from "../../../Modal";
import ModalSchuduling from "../ModalSchuduling";




export default class GetMentorScheduling extends Component {
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

    callbackHandlerFunction = (clickStatus) => {
        this.setState({
            isClicked: clickStatus,
        });
    }

    render() {


        console.log(this.props)

        return (

            <tbody className="text-left h-16 ">
                <tr className="h-16 border-b-2 border-gray-200 ">
                    <td className="pl-8">  {this.props.no}</td>
                    <td>{this.props.nameMentor}</td>
                    <td className="">{this.props.idMentor}</td>
                    <td className="">{this.props.nameSubject}</td>
                    <td className="">{this.props.nameStudent}</td>
                    <td className="">{this.props.status}</td>
                    < td>    <Modal  show={this.state.show} handleClose={this.hideModal} className="mb-5">
                            <ModalSchuduling isClickedParent={this.props} />
                        </Modal>
                        <button  type="button" className="font-bold" onClick={this.showModal}>
                            Edit
                        </button></td>
                    <th className="  ">Delete</th>
                </tr>




            </tbody>

        );
    }
}
