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

    <div className="loginForm slide-in-bottom">
        <form onSubmit={function (e) {handleSubmit(e)}}>
            <h2>Sign In To Your Account</h2>
            <label htmlFor='userId'>User Id:</label>

            <input type='text' id='userId' name='userId' maxLength='6' onChange={function (e) {
                formData.userId = e.target.value;
                console.log(formData.userId);
            }} required></input>

            <label htmlFor='password'>Password</label>

            <input type='password' id='password' name='password' onChange={function (e) {
                formData.password = e.target.value;
                console.log(formData.password);
            }} required></input>
            <br />
            <input className='submitButton' type="submit" value='Login'></input>
        </form>
    </div>

    <div className="infoLoginBox slide-in-right">
        <h2>Welcome to the Login page for SERL-BTH Booking system</h2>
        <h3>Please login with the id you signed up for for the account</h3>
        <p>If you don't have an account you can register and apply for one <Link href="/register"><a>here</a></Link></p>
    </div>
    </MainLayout>
);

async function handleSubmit(e) {
    errorDisplay.display = false;
    e.preventDefault();
    const res = await fetch(`${config.apiAddr}/login`, {
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
