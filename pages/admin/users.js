/**
 * Page to see all active bookings
 */
import AdminMainLayout from '../../components/MainAdminLayout';
import { auth } from '../../utils/auth';
import { bookingStatusToString } from '../../utils/utils';
import config from '../../config/config.json';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const Users = props => (
    <AdminMainLayout>
            <table className='tableContainer'>
                <thead>
                <tr>
                    <th>User Id</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                {props.accounts.map(account => (
                    <Link href='users/[id]' as={`users/${account.user_id}`}>
                            <tr>
                                <td>{account.user_id}</td>
                                <td>{account.email}</td>
                                <td>{account.role}</td>
                            </tr>
                    </Link>
                ))}
            </table>

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

        console.log(accountData);
    });

    data = {
        token: token,
        accounts: accountData.data
    }
    return data;
}

export default Users;
