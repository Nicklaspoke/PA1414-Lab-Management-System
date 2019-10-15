/**
 * Page for the login form of the page
 *
 * @author Nicklas König (niko14)
 */
'use strict';

const jwt = require('jsonwebtoken');
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import Link from 'next/link';

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
    <div className="errorLoginBox">
        <h3>{errorDisplay.titel}</h3>
        <p>{errorDisplay.message}</p>
    </div>
    : null}

    <div className="loginForm">
        <form onSubmit={function (e) {handleSubmit(e)}}>
            <h2>Sign In To Your Account</h2>
            <label for='userId'>User Id:</label>
            <br />
            <input type='text' id='userId' name='userId' maxLength='6' onChange={function (e) {
                formData.userId = e.target.value;
                console.log(formData.userId);
            }} required></input>
            <br />
            <label for='password'>Password</label>
            <br />
            <input type='password' id='password' name='password' onChange={function (e) {
                formData.password = e.target.value;
                console.log(formData.password);
            }} required></input>
            <br />
            <input type="submit" value='Login'></input>
        </form>
    </div>

    <div className="infoLoginBox">
        <h2>Welcome to the Login page for SERL-BTH Booking system</h2>
        <h3>Please login with your BTH user Id</h3>
        <p>If you don't have an account you can register and apply for one <Link href="/register"><a>here</a></Link></p>
    </div>
    </MainLayout>
);

async function handleSubmit(e) {
    errorDisplay.display = false;
    e.preventDefault();
    const res = await fetch(`http://localhost:1337/login`, {
        body: JSON.stringify(formData),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST'
    });

    const data = await res.json();

    if (data.errors) {
        errorDisplay.titel = data.errors["title"];
        errorDisplay.message = data.errors["details"];
        errorDisplay.display = true;
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