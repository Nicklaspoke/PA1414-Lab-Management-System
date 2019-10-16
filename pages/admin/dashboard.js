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
        {console.log(props)}
        <div className='DashboardLeftUp'>
            <h2>Bookings To Approve</h2>
            <table>
                <tr>
                    <th>User Id</th>
                    <th>Eqipment Name</th>
                    <th>Booking Time</th>
                </tr>
                {props.bookings.map(booking => (
                    <Link href={`booking?id=${booking.id}`} as={`booking/${booking.id}`}>
                            <tr>
                                <td>{booking.user_id}</td>
                                <td>{booking.equipment_name}</td>
                                <td>{booking.booking_time}</td>
                            </tr>
                    </Link>
                ))}
            </table>
        </div>
        <div className='DashboardRightUp'></div>
        {/* <div className='DashboardleftDown'></div> */}
        {/* <div className='DashboardRightDown'></div> */}
    </AdminMainLayout>
);


Dashboard.getInitialProps = async ctx => {
    let data;
    const token = await auth(ctx);

    let bookingData;
    //Get the booking data
    const res = await fetch(`${config.apiAddr}/booking/all`, {
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: 'GET'
    }).then(async function (responce) {
        bookingData = await responce.json();

        console.log(bookingData);
    });

    data = {
        token: token,
        bookings: bookingData.filter(function (booking) {
            return booking.status == 1;
        })
    }
    return data;
}

export default Dashboard;
