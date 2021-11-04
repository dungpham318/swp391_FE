import axios from "axios";
import axiosClient from "./axiosClient";
import { ENDPOINT } from '../config/index'
const accountApi = {
  loginWithGoogle: async (body) => {
    // const url = 'http://fb32-123-20-77-189.ngrok.io/api/user/login_google';
    // return axios.post(url, { body });
    // let res = await fetch(`http://fb32-123-20-77-189.ngrok.io/api/user/login_google?username=${body.username}`, {

    let res = await fetch(ENDPOINT + 'api/user/login_google', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer token',
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(result => {
        return result
      })
      .catch((error) => {
        throw ('Invalid Token')
      })

    return res

    //   return await axios.post('http://fb32-123-20-77-189.ngrok.io/api/user/login_google', body)
  },
  loginEmail: async (body) => {
    //  const url = 'http://fb32-123-20-77-189.ngrok.io/api/user/login';
    //  return axios.post(url, { body });
    //   return await axios.post('http://fb32-123-20-77-189.ngrok.io/api/user/login_google', body)


    let res = await fetch('http://34.126.186.222/swp391_backend/api/user/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(result => {
        return result
        console.log(result)
      })
      .catch((error) => {
        throw ('Invalid Token')
      })

    return res

  },
  updatePassword: async (body) => {
    //  const url = 'http://fb32-123-20-77-189.ngrok.io/api/user/login';
    //  return axios.post(url, { body });
    //   return await axios.post('http://fb32-123-20-77-189.ngrok.io/api/user/login_google', body)


    let res = await fetch('http://a5dc-14-187-45-101.ngrok.io/api/user/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(result => {
        return result
        console.log(result)
      })
      .catch((error) => {
        throw ('Invalid Token')
      })

    return res

  },
  getListUser: async () => {
    // const url = 'http://fb32-123-20-77-189.ngrok.io/api/user/login_google';
    // return axios.post(url, { body });
    // let res = await fetch(`http://fb32-123-20-77-189.ngrok.io/api/user/login_google?username=${body.username}`, {

    let res = await fetch('http://a5dc-14-187-45-101.ngrok.io/api/user/get_list', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('user-token')}`,
      },
      body: JSON.stringify()
    })
      .then(res => res.json())
      .then(result => {
        return result
      })
      .catch((error) => {
        throw ('Invalid Token')
      })

    return res

    //   return await axios.post('http://fb32-123-20-77-189.ngrok.io/api/user/login_google', body)
  },
  getListUser: async () => {
    try {
      const requestURL = ENDPOINT + `api/user/get_mentor_list`;

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
  getListStudent: async () => {
    try {
      const requestURL = ENDPOINT + `api/user/get_list?roleID=1`;

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

export default accountApi;