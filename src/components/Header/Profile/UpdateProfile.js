import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import UploadAndDisplayImage from "./UploadImage";
import { useHistory } from 'react-router-dom';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { ENDPOINT } from "../../../config";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UpdateProfile(props) {
    console.log("la v do", props.location)
    const history = useHistory();
    const [postList, setpostList] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [specializeID, setSpecializeID] = useState("")
    const [allErrorr, setAllErrorr] = useState(false)
    const [nameErrorr, setNameErrorr] = useState(false)
    const [phoneErrorr, setPhoneErrorr] = useState(false)
    const [message, setMessage] = useState('')
    const validPhone = new RegExp(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);
    const validName = new RegExp("(?=.{5,30}$)");
    let body;


    useEffect(() => {
        featchPostList()
        setName(props?.location?.state?.name?.fullName)
        setPhone(props?.location?.state?.name?.phone)
        setAddress(props?.location?.state?.name?.address)
        setSpecializeID(props?.location?.state?.name?.specializeID)
    }, [props]);

    async function featchPostList() {
        try {
            const requestURL = ENDPOINT + `api/specialize/get_list`;

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
    const handleUpdateClick = async () => {

        if (name != undefined && name != ""
            && phone != undefined && phone != ""
            && address != undefined && address != ""
        ) {
            setAllErrorr(false)
            if (validName.test(name)) {
                setNameErrorr(false)
                if (validPhone.test(phone)) {
                    setPhoneErrorr(false)
                    body = {
                        fullName: name, phone: phone, address: address, specializeID
                    }

                    let res = await fetch(ENDPOINT + "api/user/update_profile", {
                        method: `PUT`,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                        },
                        body: JSON.stringify(body)

                    }).then(res => res.json())
                        .then(result => {
                            console.log(result)
                            if (result?.resultCode === 1) {
                                setOpen(true)
                                setMessage("update thanh công")
                                alert("update thành công")
                                //props?.location.onReload()
                                history.push("/")

                                window.location.reload()


                            }
                        }

                        )
                        .catch((error) => {
                            throw ('Invalid Token')
                        })
                    return body
                } else { setPhoneErrorr(true) }
            } else { setNameErrorr(true) }
        } else {
            setAllErrorr(true)
        }


    }


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    let dataRole;
    if (props?.location?.state?.name?.roleID == '1') {
        dataRole = (
            <tr className="h-20">
                <td className="text-right w-16"> <p className="text-xl">Specialization:</p></td>
                <td className="w-902">

                    < select onChange={e => setSpecializeID(e.target.value)} value={props?.location?.state?.name?.specializeID} className="outline-none border-gray-400   border-2 ml-2  rounded-2xl w-3/6  h-12" >
                        <option className="text-gray-300 hidden text-xl" value={0} >Select Specialize...</option>
                        <option className="text-gray-300 hidden text-xl" value={0} >Select Specialize...</option>{postList.map((post, index) => {

                            return <option value={post?.id} key={post.id}>{post.name} </option>
                        })}
                    </select >
                </td>
            </tr>)
    }


    return (
        <Profile >
            <div className="text-center col-span-2 mx-auto my-16  ">
                <UploadAndDisplayImage props={props?.location?.state?.name} />
            </div>
            <div className="font-bold my-4 col-span-2 w-full border-l-2 pl-24">
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} className="float-left w-screen">
                    <Alert onClose={handleClose} severity="success" className="float-left" sx={{ width: "200%", float: "right" }}>
                        {message}
                    </Alert>
                </Snackbar>
                <h3 className="text-5xl mb-4 b">Personal profile</h3>
                <hr className="mb-4 w-4/6"></hr>
                <div className="ml-4">
                    {allErrorr && <div className='text-red-600 ml-11 mb-5 text-xl'> Please enter your all information!</div>}
                    {phoneErrorr && <div className='text-red-600 ml-11 mb-5 text-xl' >Invalid phone number!</div>}
                    {nameErrorr && <div className='text-red-600 ml-11 mb-5 text-xl'>Name at least 5 characters!</div>}
                    <table  >
                        <tr >
                            <td className="text-right w-0"> <p className="mb-4 text-xl">Email: </p></td>
                            <td><p className=" mb-4 text-xl ml-2 ">{props?.location?.state?.name?.email}</p></td>
                        </tr>
                        <tr className="h-20" >
                            <td className="text-right w-0"> <p className="text-xl">Name:</p></td>
                            <td className="w-902"><input onChange={e => setName(e.target.value)} className="outline-none border-gray-400   border-2 ml-2  rounded-2xl w-3/6  h-12" value={name} /></td>
                        </tr>
                        {/* <tr className="h-20" >
                            <td className="text-right w-16"> <p className="text-xl">Id:</p></td>
                            <td className="w-902 "><input className=" outline-none border-gray-400   border-2 ml-2  rounded-2xl w-3/6  h-12" value="" /></td>
                        </tr> */}
                        {dataRole}
                        <tr className="h-20">
                            <td className="text-right w-16"> <p className="text-xl">Phone:</p></td>
                            <td className="w-902"><input onChange={e => setPhone(e.target.value)} className="outline-none border-gray-400   border-2 ml-2  rounded-2xl w-3/6  h-12" value={phone} /></td>
                        </tr>
                        <tr className="h-20">
                            <td className="text-right "> <p className="text-xl">Address:</p></td>
                            <td className="w-902"><input onChange={e => setAddress(e.target.value)} className="outline-none border-gray-400   border-2 ml-2  rounded-2xl w-3/6  h-12" value={address} /></td>
                        </tr>
                    </table>
                    <div>
                    </div>
                    <button className="h-8 w-32 bg-red-500 mt-4 ml-40 rounded-2xl text-white" onClick={handleUpdateClick}>Update</button>
                </div>
            </div>
        </Profile>
    )
}
export default UpdateProfile;