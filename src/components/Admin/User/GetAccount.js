
import React, { Component, useState, useEffect, useContext, Fragment } from "react";
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';
import Modal from "../../Modal";
import ModalForUser from "./ModalForUser";

GetAccount.propTypes = {
    posts: PropTypes.array,
};
GetAccount.defaultProps = {
    posts: [{}],
    postss: [{}],
};
function GetAccount(props) {
    const { posts } = props;
    const { postss } = props;
    const { spec } = props;
    console.log("rolelist", postss)
    const [show, setShow] = useState(false);
    const [isClicked, setIsClicked] = useState(true);
    const [selectedUser, setselectedUser] = useState(undefined)
    const [selectedRole, setselectedRole] = useState(undefined)
    const [selectedSpec, setselectedSpec] = useState(undefined)

    function showModal(accountData, roleData, specData) {
        setselectedUser(accountData)
        setselectedRole(roleData)
        setselectedSpec(specData)
        setShow(true);
        setIsClicked(true);
    };
    function hideModal() {
        setShow(false);
        setIsClicked(true);
    };

    useEffect(() => {
        if (!show) {
            setselectedUser(undefined)
            setselectedRole(undefined)
            setselectedSpec(undefined)
        }
    }, [show])

    const callbackFunction = (childData) => {
    
        {props.parentCallback(childData)}
    };


    return (


        <tbody className="text-left h-16 ">
            {posts.map((post, index) => {
                return (

                    <tr className="h-16 border-b-2 border-gray-200 " key={post.id}>

                        <td className="pl-8">    {(index + 1) + (props.pagination.pageSize * (props.pagination.page - 1))}</td>
                        <td>{post?.fullName}</td>
                        <td className="">{post?.email}</td>
                        <td className=""></td>
                        <td className=""> {postss.map(postRole => {
                            if (postRole?.id == post?.roleID) {

                                return <option key={postRole?.id}>{postRole?.name}</option>
                            }
                        })}</td>
                        <td className="  ">

                            <button type="button" className="font-bold" onClick={() => showModal(postss, post, spec)}>
                                Edit
                            </button></td>
                        {/* <th className="  ">Delete</th> */}
                    </tr>

                )
            })}
            <Modal show={show} handleClose={hideModal} className="mb-5">
                <ModalForUser isClickedParent={selectedRole} spec={selectedSpec} role={selectedUser} parentCallback={callbackFunction} onModal={() => setShow(false)} onUpdate={() => props.onDelete()} />
            </Modal>

        </tbody>


    );

}

export default GetAccount;