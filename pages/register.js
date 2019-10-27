/**
 * Page for applying for a account
 *
 * @auth Nicklas König (niko14)
 */
'use strict';

import MainLayout from '../components/MainLayout';
import Modal from '../components/registerModal'
import config from '../config/config.json';
import fetch from 'isomorphic-unfetch';
import Router from 'next/Router';
import Link from 'next/link';

let formData = {
    userId: "",
    password: "",
    confirmPassword: "",
    email: ""
}

let errorDisplay = {
    "titel": "",
    "message": "",
    "display": false
}

let aggrement = {
    "textH1": 'User aggrement for account applying',
    "textP": `By applying for this account, you "the user", agrees that the provided
            password, userId and email will be stored in the booking systems database.
            This information (userId, password and email), will be used to identify you
            "the user" in the booking system and your information will not be shared with any
            3rd party memebers unless, you "the user" aggres to it.`,
    "display": false
}

const register = props => (
    <MainLayout>

        {errorDisplay.display ?
        <div className="errorCreationBox">
            <h3>{errorDisplay.titel}</h3>
            <p>{errorDisplay.message}</p>
        </div>
        : null}
        {aggrement.display ?
        <div className='modal slide-in-right'>
            <a onClick={function () {
                aggrement.display = false;
                Router.push('/register');
            }}>close</a>
            <h1>{aggrement.textH1}</h1>
            <p>{aggrement.textP}</p>
        </div>
        : null}
        <div className='registrationForm slide-in-bottom'>
        <h1>Create a new account</h1>
            <form onSubmit={function (e) {handleSubmit(e, props.token)}}>
                <label htmlFor='userId'>User Id:</label>

                <input type='text' id='userId' name='userId' maxLength='6' onChange={function (e) {
                    formData.userId = e.target.value;
                    console.log(formData.userId);
                }} required></input>

                <label htmlFor='password'>Password:</label>

                <input type='password' id='password' name='password' onChange={function (e) {
                    formData.password = e.target.value;
                    console.log(formData.password);
                }} required></input>

                <label htmlFor='confirmPassword'>Confirm Password:</label>

                <input type='password' id='confirmPassword' name='confirmPassword' onChange={function (e) {
                    formData.confirmPassword = e.target.value;
                    console.log(formData.confirmPassword);
                }} required></input>

                <label htmlFor='userId'>Email:</label>

                <input type='email' id='email' name='email' onChange={function (e) {
                    formData.email = e.target.value;
                    console.log(formData.email);
                }} required></input>
                <br />
                <input type="checkbox" name='userAggrement' required /> I have read and aggree to the <Link href='register' onClick={aggrement.display = true}><a>User aggrement</a></Link>
                <input className='submitButton' type="submit" value='Apply'></input>
            </form>
        </div>
        <div className="infoLoginBox slide-in-right">
        <h2>Welcome to the Registrationpage for applying for a student account</h2>
        <h3>For easier approval process, please use your bth mail and/or bth akcronym</h3>
        <h3>By clicking Apply you agree to the following <Link href='register' onClick={aggrement.display = true}><a>aggrement</a></Link></h3>
        </div>
    </MainLayout>
);

async function handleSubmit(e) {
    errorDisplay.display = false;
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        errorDisplay.titel = "Passwords do not match";
        errorDisplay.details = "Please make shure passwords match";
        errorDisplay.display = true;
        Router.push('/register');
    } else {
        const res = await fetch(`${config.apiAddr}/register/student`, {
            body: JSON.stringify(formData),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST'
        });

        const data = await res.json();

        if (data.errors) {
            errorDisplay.titel = data.errors['title'];
            errorDisplay.message = data.errors['details'];
            errorDisplay.display = true;
            Router.push('/register');
        } else {
            Router.push('/login');
        }
    }

}
export default register;
