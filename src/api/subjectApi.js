import axios from "axios";
import axiosClient from "./axiosClient";
import { ENDPOINT } from "../config";

const subjectApi = {
    featchSubjectList: async () => {
        try {
            const requestURL = ENDPOINT + `api/subject/get_list`;

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



            return data
        } catch (error) {
            console.log('Fail to fetch product list: ', error)
        }
    },

    //   return await axios.post('http://fb32-123-20-77-189.ngrok.io/api/user/login_google', body)
}


export default subjectApi;