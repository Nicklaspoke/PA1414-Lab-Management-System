/**
 * Page for the login form of the page
 */

const jwt = require('jsonwebtoken');
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

import config from '../config/config.json';



let formData = {
    userId: "",
    password: ""
}

let displayErrorMessage = false

const login = () => (
    <div className="formContainer">
        <form onSubmit={function (e) {handleSubmit(e)}}>

            <label for='userId'>User Id</label>
            <input type='text' id='userId' name='userId' onChange={function (e) {
                formData.userId = e.target.value;
                console.log(formData.userId);
            }} required></input>

            <label for='password'>Password</label>
            <input type='password' id='password' name='password' onChange={function (e) {
                formData.password = e.target.value;
                console.log(formData.password);
            }} required></input>

            <input type="submit"></input>
        </form>
    </div>
);

async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(`http://127.0.0.1:1337/login`, {
        body: JSON.stringify(formData),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST'
    });

    const data = await res.json();
    console.log(data);
    const token = data.data.token

    const decoded = jwt.decode(data.data.token)

    console.log(decoded)

    if (decoded.admin) {
        Router.push('/adminDashboard', 'admin/dashboard');
    } else {
        Router.push('/userDashboard', 'user/dashboard');
    }
}
export default login;
