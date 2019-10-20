/**
 * Page for regestrating a new user
 *
 * @auth Nicklas König (niko14)
 */
'use strict';

import MainAdminLayout from '../../components/MainAdminLayout';
import { auth } from '../../utils/auth';
import config from '../../config/config.json';
import fetch from 'isomorphic-unfetch';
import Router from 'next/Router';

let formData = {
    userId: "",
    password: "",
    confirmPassword: "",
    email: "",
    role: 4
}

let errorDisplay = {
    "titel": "",
    "message": "",
    "display": false
}

const RegisterNewAccount = props => (
    <MainAdminLayout>
        {errorDisplay.display ?
        <div className="errorCreationBox">
            <h3>{errorDisplay.titel}</h3>
            <p>{errorDisplay.message}</p>
        </div>
        : null}
        <div className='registrationForm'>
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


                <label htmlFor='role'>User Role</label>

                <select id='role' name='role' onChange={function (e) {
                    formData.role = e.target.value
                }}>
                    <option value='3'>Select A role for the new account</option>
                    <option value='3'>Student</option>
                    <option value='2'>Teacher</option>
                    <option value='1'>Admin</option>
                </select>

                <input type="submit" value='Create Account'></input>

            </form>
        </div>
    </MainAdminLayout>
);

RegisterNewAccount.getInitialProps = async ctx => {
    const token = await auth(ctx);

    const data = {
        token: token,
    };

    return data;
}

async function handleSubmit(e, token) {
    errorDisplay.display = false;
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        errorDisplay.titel = "Passwords do not match";
        errorDisplay.details = "Please make shure passwords match";
        errorDisplay.display = true;
        Router.push('/admin/newUser');
    } else {
        const res = await fetch(`${config.apiAddr}/register/user`, {
            body: JSON.stringify(formData),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token
            },
            method: 'POST'
        });

        const data = await res.json();

        if (data.errors) {
            errorDisplay.titel = data.errors['title'];
            errorDisplay.message = data.errors['details'];
            errorDisplay.display = true;
            Router.push('/admin/newUser');
        } else {
            Router.push('/admin/users');
        }
    }

}
export default RegisterNewAccount;
