/**
 * Page for the login form of the page
 */

const jwt = require('jsonwebtoken');
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import cookies from 'next-cookies';
import MainLayout from '../components/MainLayout';

import config from '../config/config.json';



let formData = {
    userId: "",
    password: ""
}

let errorDisplay = {
    "titel": "",
    "message": "",
    "display": false
}

const login = () => (
    <MainLayout>
    {errorDisplay.display ?
    <div>
        <h2>{errorDisplay.titel}</h2>
        <p>{errorDisplay.message}</p>
    </div>
    : null}

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
    </MainLayout>
);

async function handleSubmit(e) {
    errorDisplay.display = false;
    e.preventDefault();
    const res = await fetch(`http://127.0.0.1:1337/login`, {
        body: JSON.stringify(formData),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST'
    });

    const data = await res.json();

    if (data.errors) {
        console.log(data.errors["details"]);
        errorDisplay.titel = data.errors["title"];
        errorDisplay.message = data.errors["details"];
        errorDisplay.display = true;
        console.log(errorDisplay);
        Router.push("/login");
    } else {
        const token = data.data.token
        const decoded = jwt.decode(token);
        document.cookie= `token=${token}; path=/`;

        if (decoded.admin) {
            Router.push('/adminDashboard', 'admin/dashboard');
        } else {
            Router.push('/userDashboard', 'user/dashboard');
        }
    }
}
export default login;
