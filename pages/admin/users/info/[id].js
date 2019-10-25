import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

import AdminMainLayout from '../../../../components/MainAdminLayout';
import { auth } from '../../../../utils/auth';
import config from '../../../../config/config.json';



const account = props => (
        <AdminMainLayout>
            <div className='accountInfo slide-in-right'>
                <h1>Account: {props.account.user_id}</h1>
                <h2>User Id: {props.account.user_id}</h2>
                <h2>Email: {props.account.email}</h2>
                {props.account.role == 4 ?
                    <div>
                    <button onClick={function () {
                        handleSubmit('approve', props.account.user_id, props.token);
                    }}>Approve</button>

                    <button onClick={function () {
                        handleSubmit('deny', props.account.user_id, props.token);
                    }}>Deny</button>
                    </div>
                : null}
            </div>
        </AdminMainLayout>
)

account.getInitialProps = async ctx => {
    let data;
    console.log(ctx.query)
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
    console.log(data)
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
    console.log(action)
    const res = await fetch(`${config.apiAddr}/register/${action}`, {
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: 'PUT'
    });
    Router.push('/admin/dashboard');
}

export default account;
