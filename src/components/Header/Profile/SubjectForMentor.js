import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import CustomSelect from "../../CustomSelect";
import accountApi from "../../../api/accountApi";
import Select from "react-select";
import queryString from 'query-string';
import { ENDPOINT } from "../../../config";
function SubjectForMentor(props) {
    console.log(props);
    const [postList, setpostList] = useState([]);
    const [mentorList, setMentorList] = useState([]);
    const [mentorID, setMentorID] = useState(props?.location?.state?.name?.id)
    console.log("props cua mentor", props);
    useEffect(() => {
        featchAccountList();
        featchPostList();

    }, []);

    const featchAccountList = async () => {
        let response = await accountApi.getListUser({
        })
        if (response === undefined) {
            alert('Error')
        } else if (response?.resultCode === -1) {
            alert(response.message)
        } else {
            setMentorList(response?.rows)
        }
    }


    async function featchPostList() {
        try {

            const requestURL = ENDPOINT + `api/subject/get_list?mentorID=${mentorID}`;
            const response = await fetch(requestURL, {
                method: `GET`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
                },
            });
            const responseJSON = await response.json();
            const { data, pagination } = responseJSON;
            setpostList(data?.rows);
            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    }


    const options = postList?.map(option => {
        return { label: option.name, value: option.id }
    })


    function onChangeInput(value) {
        console.log(value);
    }

    return (
        <Profile >
            <div className="col-span-4 h-621 ">
                <h2 className=" mb-4 ml-5 text-5xl">Subject</h2>
                <div>
                    <hr className=" mx-5"></hr>
                </div>
                <div className="mt-10 mx-auto w-10/12 ">
                    <Select
                        options={options}
                        value={options}
                        isMulti={true}
                        onChange={onChangeInput} />
                </div>
            </div>
        </Profile>
    )
}
export default SubjectForMentor;