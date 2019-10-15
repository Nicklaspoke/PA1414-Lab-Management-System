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

const Dashboard = props => (
    <AdminMainLayout>
        {console.log(props)}
        <div className='DashboardLeftUp'>
            <h2>Bookings</h2>
            <table>
                <tr>
                    <th>User Id</th>
                    <th>Eqipment Name</th>
                    <th>Status</th>
                    <th>Booking Time</th>
                    <th>Checkout Time</th>
                    <th>Return Time</th>
                </tr>
                {props.bookings.map(booking => (
                    <tr>
                        <td>{booking.user_id}</td>
                        <td>{booking.equipment_name}</td>
                        <td>{booking.status}</td>
                        <td>{booking.booking_time}</td>
                        <td>{booking.checkout_time}</td>
                        <td>{booking.return_time}</td>

                    </tr>
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
        // console.log(responce)
        bookingData = await responce.json();
        console.log(bookingData);
    });

    data = {
        token: token,
        bookings: bookingData
    }
    return data;
}

export default Dashboard;
