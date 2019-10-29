/**
 * Page for editing a users role
 */
'use strict';

import MainAdminLayout from '../../../../components/MainAdminLayout';
import { auth } from '../../../../utils/auth';
import config from '../../../../config/config.json';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

let formData = {
    role: 3
}

let errorDisplay = {
    "titel": "",
    "message": "",
    "display": false
}

const account = props => (
    <MainAdminLayout>
        {errorDisplay.display ?
        <div className="errorCreationBox">
            <h3>{errorDisplay.titel}</h3>
            <p>{errorDisplay.message}</p>
        </div>
        : null}
        <div className='registrationForm slide-in-right'>
            <h1>Edit account {props.account.userId}</h1>

            <form onSubmit={function (e) {handleSubmit(e, props.token, props.account.user_id)}}>
                <label htmlFor='userId'>UserId:</label>

                <input type='text' id='userId' name='userId' maxLength='6' value={props.account.user_id} readOnly />

                <label htmlFor='roleChange'>Change Role To:</label>
                <input type='radio' name='roleChange' value='Admin' onChange={function (e) {
                    formData.role = 1;
                }}/>Admin
                <br />
                <input type='radio' name='roleChange' value='Teacher' onChange={function (e) {
                    formData.role = 2;
                }}/>Teacher
                <br />
                <input type='radio' name='roleChange' value='Student' onChange={function (e) {
                    formData.role = 3;
                }}/>Student
                <br />

                <input type='submit' className='submitButton' value='Confirm' />
            </form>
        </div>
    </MainAdminLayout>
)

account.getInitialProps = async ctx => {
    let data;
    const id = ctx.query.id;
    const token = await auth(ctx);

    let accountData;

    const res = await fetch(`${config.apiAddr}/register/user`, {
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: 'GET'
    }).then(async function (responce) {
        accountData = await responce.json();
    });

    data = {
        token: token,
        account: accountData.data.filter(function (account) {
            return account.user_id == id;
        })[0]
    }
    return data;
}

async function handleSubmit (e, token, userId) {
    errorDisplay.display = false;
    e.preventDefault();

    let data = {
        userId: userId,
        role: formData.role != undefined ? formData.role : 3
    };

    await fetch(`${config.apiAddr}/register/edit`, {
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: 'PUT'
    });

    Router.push('/admin/users');
}

export default account;
