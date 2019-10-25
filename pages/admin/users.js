/**
 * Page to see all active bookings
 */
import AdminMainLayout from '../../components/MainAdminLayout';
import { auth } from '../../utils/auth';
import { accountRoleToString } from '../../utils/utils';
import config from '../../config/config.json';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { Router } from 'next/Router';

const Users = props => (
    <AdminMainLayout>
            <table className='accountTableContainer slide-in-bottom'>
                <thead>
                <tr>
                    <th>User Id</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
                </thead>
                {props.accounts.map(account => (
                    <Link href='users/info/[id]' as={`users/info/${account.user_id}`}>
                            <tr>
                                <td>{account.user_id}</td>
                                <td>{account.email}</td>
                                <td>{accountRoleToString(account.role)}</td>
                                <td>
                                    <Link href='users/deactivate/[id]' as={`users/deactivate/${account.user_id}`}>
                                        <a>Deactivate Account</a>
                                    </Link>
                                </td>
                            </tr>
                    </Link>
                ))}
            </table>

            <Link href='newUser'>
                <button className='leftButton submitStyle slide-in-left'>Add New Account</button>
            </Link>

    </AdminMainLayout>
);

Users.getInitialProps = async ctx => {
    let data;
    const token = await auth(ctx);

    let accountData;
    //Get the booking data
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
        accounts: accountData.data
    }
    return data;
}

export default Users;
