/**
 * User landing page/dashboard
 *
 * @author Nicklas König (niko14)
 */
'use strict';

import MainUserLayout from '../../components/MainUserLayout';
import { auth } from '../../utils/auth';
import config from '../../config/config.json';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { bookingStatusToString } from '../../utils/utils';

const Dashboard = props => (
    <MainUserLayout>
        <div className='CurrentBookingsContainer slide-in-bottom'>
            <h2>Current Bookings</h2>
            <table className='tableContainer'>
                <thead>
                    <tr>
                        <th>Equipment Name</th>
                        <th>Borrow Time (days)</th>
                        <th>Status</th>
                        <th>Checkout Time</th>
                    </tr>
                </thead>

                    {props.bookings.map(booking => (
                        <Link href='booking/[id]' as={`booking/${booking.id}`}>
                            <tr>
                                <td>{booking.equipment_name}</td>
                                <td>{booking.borrow_time}</td>
                                <td>{bookingStatusToString(booking.status)}</td>
                                <td>{booking.checkout_time}</td>
                            </tr>
                        </Link>
                    ))}

            </table>
        </div>
    </MainUserLayout>
);

Dashboard.getInitialProps = async ctx => {
    const token = await auth(ctx);

    let bookings;

    let res = await fetch(`${config.apiAddr}/booking`, {
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: 'GET'
    }).then(async function (responce) {
        bookings = await responce.json();
    });

    let data = {
        token: token,
        bookings: bookings.filter(function (booking) {
            return booking.status < 4;
        })
    }

    return data;
}
export default Dashboard;
