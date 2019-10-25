/**
 * Admin landing page/dashboard
 *
 * @author Nicklas König (niko14)
 */
'use strict';

import AdminMainLayout from '../../components/MainAdminLayout';
import { auth } from '../../utils/auth';
import config from '../../config/config.json';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const Dashboard = props => (
    <AdminMainLayout>
        <div className='DashboardLeftUp slide-in-bottom'>
            <h2>Bookings To Approve</h2>
            <table className='tableContainer'>
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Eqipment Name</th>
                        <th>Borrow Time</th>
                        <th>Booking Time</th>
                    </tr>
                </thead>

                    {props.bookings.map(booking => (
                        <Link href='booking/[id]' as={`booking/${booking.id}`}>
                                <tr>
                                    <td>{booking.user_id}</td>
                                    <td>{booking.equipment_name}</td>
                                    <td>{booking.borrow_time}</td>
                                    <td>{booking.booking_time}</td>
                                </tr>
                        </Link>
                    ))}

            </table>
        </div>
        <div className='DashboardRightUp slide-in-bottom'>
            <h2>Student Accounts To Approve</h2>
            <table className='tableContainer'>
                <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Email</th>
                        </tr>
                </thead>

                    {props.accounts.map(account => (
                        <Link href='users/[id]' as={`users/${account.user_id}`}>
                            <tr>
                            <td>{account.user_id}</td>
                            <td>{account.email}</td>
                            </tr>
                        </Link>
                    ))}

            </table>
        </div>
        {/* <div className='DashboardleftDown'></div> */}
        {/* <div className='DashboardRightDown'></div> */}
    </AdminMainLayout>
);


Dashboard.getInitialProps = async ctx => {
    let data;
    const token = await auth(ctx);

    let bookingData;
    //Get the booking data
    let res = await fetch(`${config.apiAddr}/booking/all`, {
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: 'GET'
    }).then(async function (responce) {
        bookingData = await responce.json();
    });

    let accountData;
    //Get the accounts to approve
    res = await fetch(`${config.apiAddr}/register/user`, {
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
        bookings: bookingData.filter(function (booking) {
            return booking.status == 1;
        }),
        accounts: accountData.data.filter(function (account) {
            return account.role == 4;
        })
    }
    return data;
}

export default Dashboard;
