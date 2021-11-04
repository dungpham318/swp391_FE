
import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import Modal from "../../Modal";
import ModalForMentor from './ModalForMentor';
import ModalForSubject from "./ModalForSubject";
import { ENDPOINT } from '../../../config/index'

GetSubject.propTypes = {
    posts: PropTypes.array,
    postss: PropTypes.array,
};
GetSubject.defaultProps = {
    posts: [{}],
    postss: [{}],
};

function GetSubject(props) {



    const { posts } = props;
    const { postss } = props;
    const { mentor } = props;
    const [show, setShow] = useState(false);
    const [chooseModal, setChooseModal] = useState("");
    const [isClicked, setIsClicked] = useState(true);
    const [selectedSubject, setselectedSubject] = useState(undefined)
    const [selectedSpec, setselectedSpec] = useState(undefined)
    const [selectedMentor, setselectedMentor] = useState(undefined)

    function showModal(subjectData, specData) {
        setselectedSubject(subjectData)
        setselectedSpec(specData)
        setShow(true);
        setIsClicked(true);
        setChooseModal(1);
    };
    function showModalForMentor(subjectData, mentorDate) {
        setselectedSubject(subjectData)
        setselectedMentor(mentorDate)
        setShow(true);
        setIsClicked(true);
        setChooseModal(2);
    };
    function hideModal(subjectData) {
        setselectedSubject(subjectData);
        setShow(false);
        setIsClicked(true);
    };
    useEffect(() => {
        if (!show) {
            setselectedSubject(undefined)
            setselectedSpec(undefined)
            setselectedMentor(undefined)

        }
    }, [show])
    // function chooseModal ()  {
    //     setShow(true);
    //     setIsClicked(true); 
    // };


    async function DeleteSubject(post) {

        let res = await fetch(ENDPOINT + `api/subject/delete?subjectID=${post?.id}`, {
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
            },
        }).then(res => res.json())
            .then(result => {

                if (result?.resultCode === 1) {
                    props.onDelete()

                    props.parentCallback(result.message)
                    // history.push("/")
                } else {
                    alert("delete thất bại")
                    // setError(result.message)
                    // alert("tài khoản hoặc mật khẩu sai kìa")
                }
                return res

            })
            .catch((error) => {
                throw ('Invalid Token')
            })
        return res
    }

    const callbackFunction = (childData) => {

        { props.parentCallback(childData) }
    };

    return (
        <tbody className="text-left h-16 ">
            {posts.map((post, index) => {

                return (

                    <tr className="h-16 border-b-2 border-gray-200 " key={index}>
                        <td className="pl-8">  {(index + 1) + (props.pagination.pageSize * (props.pagination.page - 1))}</td>
                        <td>{post.name}</td>
                        <td className="">{post.code}</td>

                        <td className="">{postss.map(postSpec => {
                            if (postSpec?.id == post?.specializeID) {

                                return <option key={postSpec?.id}>{postSpec?.name}</option>
                            }
                        })}</td>
                        <td className=" text-xanhla ">{post.mentorList.map(name => (name.fullName)).join(", ").slice(0, 20).concat("...")}</td>
                        <td className=" font-bold cursor-pointer">

                            <button type="button" className="font-bold " onClick={() => showModalForMentor(post, mentor)}  >
                                Update Mentor
                            </button>
                        </td>
                        <td className="font-bold" >
                            <button type="button" className="font-bold" onClick={() => showModal(post, postss)}>
                                Edit
                            </button>
                        </td>

                        <td className=" font-bold cursor-pointer " onClick={() => DeleteSubject(post)}>Delete</td>

                    </tr>

                )
            })}
            <Modal show={show} handleClose={hideModal} className="mb-5">
                {chooseModal == 1 ? <ModalForSubject isClickedParent={selectedSubject} parentCallback={callbackFunction} spec={selectedSpec} onModal={() => setShow(false)} onUpdate={() => props.onDelete()} />
                    : <ModalForMentor
                        isClickedParent={selectedSubject}
                        mentor={selectedMentor} onModal={() => setShow(false)} onUpdate={() => props.onDelete()} parentCallback={callbackFunction} />}
            </Modal>
        </tbody>
    );
}

export default GetSubject;