/*import { GoogleLogin, GoogleLogout } from 'react';*/
import { default as React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import accountApi from '../../../api/accountApi';
import '../../css/loginform.css';
import { Link } from 'react-router-dom'
import { ENDPOINT } from '../../../config/index'

// const uiConfig = {
//     signInFlow: 'redirect',
//     signInSuccessUrl: '/',
//     signInOptions: [
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     ],

// };


function UpdatePassword() {
    const validPassword = new RegExp("(?=.{7,13}$)");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("")
    const [pwdError, setPwdError] = useState(false);
    const [pwcError, setPwcError] = useState(false);
    const history = useHistory();
    const body = { password };
    const [postList, setpostList] = useState([]);

    const handleSubmit = async () => {
        if (!validPassword.test(password) && password !== confirmPassword) {
            setPwdError(true);
            setPwcError(true);
        }
        else {
            if (!validPassword.test(password)) {
                setPwdError(true);
                setPwcError(false);
            } else {
                if (password !== confirmPassword) {
                    setPwcError(true);
                    setPwdError(false);
                } else {
                    setPwdError(false);
                    setPwcError(false);


                    let res = await fetch(ENDPOINT + "api/user/update_password", {
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

                                async function featchPostList() {
                                    try {


                                        const requestURL = ENDPOINT + `api/user/get_user_profile`;

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
                            } history.push("/")

                        })
                        .catch((error) => {
                            throw ('Invalid Token')
                        })
                    return body

                }
            }
        }

    }





    return (
        <div className="relative">
            < div className="w-screen h-screen pointer-events-none">
                <img className="w-full h-full relative select-none " src="https://images.unsplash.com/photo-1634092771737-644d65697039?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1899&q=80" />

            </div>

            <div className=" ml-40" id="banner">
                <div id="login" className="border-2 border-gray-900 ">
                    <h2>Welcome to login </h2>
                    <p>Please reset your password to use for the next login with account.</p>
                    {pwdError && <div className="text-xs   text-red-600 mb-5  font-bold ">Length of password should be least  7</div>}
                    <div id="form-field"  >

                        <input type="password" id={pwdError == false ? 'form-input' : 'form-input-invalid'} placeholder=" " onChange={e => setPassword(e.target.value)} />
                        <label id={pwdError == false ? 'form-label' : 'form-label-invalid'} >Password</label>
                    </div>
                    {pwcError && <div className="text-xs   text-red-600 mb-5 font-bold">Your password is not confirm</div>}
                    <div id="form-field" >
                        <input type="password" id={pwcError == false ? 'form-input' : 'form-input-invalid'} placeholder=" " onChange={e => setConfirmPassword(e.target.value)} />
                        <label id={pwcError == false ? 'form-label' : 'form-label-invalid'}>Confirm Password</label>

                    </div>


                    <input type="submit" className="cursor-pointer" id="log" value="Update" onClick={handleSubmit}
                    /><br />
                    <div className="mb-5">Back to <Link to="/" className="text-xanh ">Home</Link></div>

                </div>
            </div>
        </div>
    );


}


export default UpdatePassword;