import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

import AdminMainLayout from '../../../../components/MainAdminLayout';
import { auth } from '../../../../utils/auth';
import config from '../../../../config/config.json';



const account = props => (
        <AdminMainLayout>
            <div className='accountInfo'>
                <h1>Are you sure you want to deactivate this account</h1>
                <h2>Account: {props.account.user_id}</h2>
                <h3>User Id: {props.account.user_id}</h3>
                <h3>Email: {props.account.email}</h3>
                <button onClick={function () {
                    handleSubmit('ok', props.account.user_id, props.token);
                }}>Yes, Deactivate</button>

                <button onClick={function () {
                    Router.push('/admin/users');
                }}>No, Take Me Back</button>
            </div>
        </AdminMainLayout>
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

/**
 *
 * @param {string} action either approve or deny a account
 * @param {int} id the id of the account
 * @param {string} token the admins JWT token
 */
async function handleSubmit(action, id, token) {
    const data = {
        userId: id,
    };
    const res = await fetch(`${config.apiAddr}/register`, {
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: 'DELETE'
    });
    Router.push('/admin/users');
}

export default account;
